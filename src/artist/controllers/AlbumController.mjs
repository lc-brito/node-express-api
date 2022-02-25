import RepositoryImpl from '../../../adapters/repository/index.mjs';
import AlbumRepository from '../repositories/AlbumRepository.mjs';
import ArtistRepository from '../repositories/ArtistRepository.mjs';

import Paginator from '../../support/Paginator.mjs';
import PaginationCriteria from '../../support/PaginationCriteria.mjs';

import ListAlbums from '../actions/ListAlbums.mjs';
import CreateAlbum from '../actions/CreateAlbum.mjs';
import UpdateAlbum from '../actions/UpdateAlbum.mjs';
import FindAlbum from '../actions/FindAlbum.mjs';
import SearchAlbum from '../actions/SearchAlbum.mjs';
import RemoveAlbum from '../actions/RemoveAlbum.mjs';

import CreateAlbumValidator from './validators/CreateAlbumValidator.mjs';
import UpdateAlbumValidator from './validators/UpdateAlbumValidator.mjs';
import AlbumPresenter from '../presenters/AlbumPresenter.mjs';

const albumRepository = new AlbumRepository(RepositoryImpl);
const artistRepository = new ArtistRepository(RepositoryImpl);

export async function index(request, response, next) {
  const artistId = request.params.artist;

  const availableFilters = ['page', 'limit'];

  const enabledFilters = {};
  for (const [key, value] of Object.entries(request.query)) {
    if (availableFilters.includes(key)) {
      enabledFilters[key] = value.toString();
    }
  }

  const queryCriteria = PaginationCriteria.from(enabledFilters);

  const listAlbumsAction = new ListAlbums(albumRepository);
  let albumsCollection;

  try {
    albumsCollection = await listAlbumsAction.execute(artistId);
  } catch (error) {
    return next(error);
  }

  const paginator = new Paginator(
    albumsCollection.map(AlbumPresenter.present),
  );

  return response
    .status(200)
    .json(
      paginator.paginate(
        queryCriteria.page,
        queryCriteria.limit,
      ),
    );
}

export async function search(request, response, next) {
  const artistId = request.params.artist;

  const availableFilters = ['page', 'limit', 'q'];

  const enabledFilters = {};
  for (const [key, value] of Object.entries(request.query)) {
    if (availableFilters.includes(key)) {
      enabledFilters[key] = value.toString();
    }
  }

  const queryCriteria = PaginationCriteria.from(enabledFilters);

  const searchAlbumsAction = new SearchAlbum(albumRepository);

  let albumsCollection;
  try {
    albumsCollection = await searchAlbumsAction.execute(artistId, enabledFilters.q);
  } catch (error) {
    return next(error);
  }

  const paginator = new Paginator(
    albumsCollection.map(AlbumPresenter.present),
  );

  return response
    .status(200)
    .json(
      paginator.paginate(
        queryCriteria.page,
        queryCriteria.limit,
      ),
    );
}

export async function store(request, response, next) {
  const artistId = request.params.artist;

  const albumDto = {
    ...request.body,
    artist: artistId,
  };

  try {
    await CreateAlbumValidator.validate(albumDto);
  } catch (error) {
    return response
      .status(400)
      .json(error);
  }

  const createAlbumAction = new CreateAlbum(artistRepository, albumRepository);
  let albumId;

  try {
    albumId = await createAlbumAction.execute(artistId, albumDto);
  } catch (error) {
    return next(error);
  }

  const findAlbumAction = new FindAlbum(albumRepository);
  let album;
  try {
    album = await findAlbumAction.execute(artistId, albumId);
  } catch (error) {
    return next(error);
  }

  return response
    .status(201)
    .json(
      AlbumPresenter.present(album),
    );
}

export async function show(request, response, next) {
  const artistId = request.params.artist;
  const albumId = request.params.id;

  const findAlbumAction = new FindAlbum(albumRepository);

  let album;
  try {
    album = await findAlbumAction.execute(artistId, albumId);
  } catch (error) {
    return next(error);
  }

  return response
    .status(200)
    .json(
      AlbumPresenter.present(album),
    );
}

export async function update(request, response, next) {
  const artistId = request.params.artist;
  const albumId = request.params.id;

  const albumDto = {
    ...request.body,
  };

  try {
    await UpdateAlbumValidator.validate(albumDto);
  } catch (error) {
    return response
      .status(400)
      .json(error);
  }

  const updateAlbumAction = new UpdateAlbum(albumRepository);

  try {
    await updateAlbumAction.execute(artistId, albumId, albumDto);
  } catch (error) {
    return next(error);
  }

  const findAlbumAction = new FindAlbum(albumRepository);

  let album;
  try {
    album = await findAlbumAction.execute(artistId, albumId);
  } catch (error) {
    return next(error);
  }

  return response
    .status(200)
    .json(
      AlbumPresenter.present(album),
    );
}

export async function remove(request, response, next) {
  const artistId = request.params.artist;
  const albumId = request.params.id;

  const removeAlbumAction = new RemoveAlbum(albumRepository);

  try {
    await removeAlbumAction.execute(artistId, albumId);
  } catch (error) {
    return next(error);
  }

  return response
    .status(204)
    .json(null);
}
