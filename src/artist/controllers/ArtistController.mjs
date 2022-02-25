import RepositoryImpl from '../../../adapters/repository/index.mjs';
import ArtistRepository from '../repositories/ArtistRepository.mjs';

import Paginator from '../../support/Paginator.mjs';
import PaginationCriteria from '../../support/PaginationCriteria.mjs';

import ListArtists from '../actions/ListArtists.mjs';
import CreateArtist from '../actions/CreateArtist.mjs';
import UpdateArtist from '../actions/UpdateArtist.mjs';
import FindArtist from '../actions/FindArtist.mjs';
import SearchArtist from '../actions/SearchArtist.mjs';
import RemoveArtist from '../actions/RemoveArtist.mjs';

import ArtistValidator from './validators/ArtistValidator.mjs';
import ArtistPresenter from '../presenters/ArtistPresenter.mjs';

const Repository = new ArtistRepository(RepositoryImpl);

export async function index(request, response, next) {
  const availableFilters = ['page', 'limit'];

  const enabledFilters = {};
  for (const [key, value] of Object.entries(request.query)) {
    if (availableFilters.includes(key)) {
      enabledFilters[key] = value.toString();
    }
  }

  const queryCriteria = PaginationCriteria.from(enabledFilters);

  const listArtistsAction = new ListArtists(Repository);
  let artistsCollection;

  try {
    artistsCollection = await listArtistsAction.execute();
  } catch (error) {
    return next(error);
  }

  const paginator = new Paginator(
    artistsCollection.map(ArtistPresenter.present),
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
  const availableFilters = ['page', 'limit', 'q'];

  const enabledFilters = {};
  for (const [key, value] of Object.entries(request.query)) {
    if (availableFilters.includes(key)) {
      enabledFilters[key] = value.toString();
    }
  }

  const queryCriteria = PaginationCriteria.from(enabledFilters);

  const searchArtistAction = new SearchArtist(Repository);

  let artistsCollection;
  try {
    artistsCollection = await searchArtistAction.execute(enabledFilters.q);
  } catch (error) {
    return next(error);
  }

  const paginator = new Paginator(
    artistsCollection.map(ArtistPresenter.present),
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
  const artistDto = request.body;

  try {
    await ArtistValidator.validate(artistDto);
  } catch (error) {
    return response
      .status(400)
      .json(error);
  }

  const createArtistAction = new CreateArtist(Repository);
  let artistId;

  try {
    artistId = await createArtistAction.execute(artistDto);
  } catch (error) {
    return next(error);
  }

  const findArtistAction = new FindArtist(Repository);
  let artist;
  try {
    artist = await findArtistAction.execute(artistId);
  } catch (error) {
    return next(error);
  }

  return response
    .status(201)
    .json(
      ArtistPresenter.present(artist),
    );
}

export async function show(request, response, next) {
  const artistId = request.params.id;

  const findArtistAction = new FindArtist(Repository);

  let artist;
  try {
    artist = await findArtistAction.execute(artistId);
  } catch (error) {
    return next(error);
  }

  return response
    .status(200)
    .json(
      ArtistPresenter.present(artist),
    );
}

export async function update(request, response, next) {
  const artistId = request.params.id;
  const artistDto = request.body;

  try {
    await ArtistValidator.validate(artistDto);
  } catch (error) {
    return response
      .status(400)
      .json(error);
  }

  const updateArtistAction = new UpdateArtist(Repository);

  try {
    await updateArtistAction.execute(artistId, artistDto);
  } catch (error) {
    return next(error);
  }

  const findArtistAction = new FindArtist(Repository);

  let artist;
  try {
    artist = await findArtistAction.execute(artistId, artistDto);
  } catch (error) {
    return next(error);
  }

  return response
    .status(200)
    .json(
      ArtistPresenter.present(artist),
    );
}

export async function remove(request, response, next) {
  const artistId = request.params.id;

  const removeArtistAction = new RemoveArtist(Repository);

  try {
    await removeArtistAction.execute(artistId);
  } catch (error) {
    return next(error);
  }

  return response
    .status(204)
    .json(null);
}
