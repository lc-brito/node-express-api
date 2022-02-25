import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { faker } from '@faker-js/faker';

import RepositoryImpl from '../../../../adapters/repository/index.mjs';
import ArtistRepository from '../../../../src/artist/repositories/ArtistRepository.mjs';
import Artist from '../../../../src/artist/entities/Artist.mjs';
import UUIDGenerator from '../../../../src/support/UUIDGenerator.mjs';
import AlbumRepository from '../../../../src/artist/repositories/AlbumRepository.mjs';
import Album from '../../../../src/artist/entities/Album.mjs';
import CreateAlbum from '../../../../src/artist/actions/CreateAlbum.mjs';
import Song from '../../../../src/artist/entities/Song.mjs';
import UpdateAlbum from '../../../../src/artist/actions/UpdateAlbum.mjs';
import FindAlbum from '../../../../src/artist/actions/FindAlbum.mjs';
import SearchAlbum from '../../../../src/artist/actions/SearchAlbum.mjs';
import RemoveAlbum from '../../../../src/artist/actions/RemoveAlbum.mjs';

chai.use(chaiAsPromised);
const { assert } = chai;

const range = (min, max) => parseInt(Math.random() * (max - min) + min, 10);

const makeSongDto = () => ({
  name: faker.lorem.words(3),
  track: 1,
  time: range(120, 300),
});

const makeSong = () => new Song(
  faker.lorem.words(3),
  1,
  range(120, 300),
);

const makeAlbumDto = () => ({
  name: faker.lorem.words(3),
  year: new Date().getFullYear(),
  songs: [
    makeSongDto(),
    makeSongDto(),
    makeSongDto(),
  ],
});

const makeAlbum = (artistId) => new Album(
  artistId,
  faker.lorem.words(3),
  new Date().getFullYear(),
  [
    makeSong(),
    makeSong(),
    makeSong(),
  ],
);

const makeArtist = () => new Artist(
  faker.lorem.word(),
  faker.music.genre(),
);

describe('Album actions', () => {
  let artistRepository = null;
  let albumRepository = null;

  beforeEach(() => {
    artistRepository = new ArtistRepository(RepositoryImpl);
    albumRepository = new AlbumRepository(RepositoryImpl);
  });

  it('create', async () => {
    const artist = makeArtist();
    await artistRepository.save(artist);

    const albumDto = makeAlbumDto();

    const createAction = new CreateAlbum(artistRepository, albumRepository);
    const albumId = await createAction.execute(artist.id, albumDto);

    const albumFound = await albumRepository.getById(artist.id, albumId);

    assert.equal(albumId, albumFound.id);
    assert.equal(albumDto.name, albumFound.name);
    assert.equal(albumDto.year, albumFound.year);
  });

  it('update', async () => {
    const artist = makeArtist();
    await artistRepository.save(artist);

    const album = makeAlbum(artist.id);
    await albumRepository.save(album);

    const albumNewName = faker.lorem.word(3);
    const albumNewYear = range(2000, new Date().getFullYear());

    const updateAction = new UpdateAlbum(albumRepository);
    await updateAction.execute(
      artist.id,
      album.id,
      { artist: artist.id, name: albumNewName, year: albumNewYear },
    );

    const albumFound = await albumRepository.getById(artist.id, album.id);

    assert.equal(album.id, albumFound.id);
    assert.equal(albumFound.name, albumNewName);
    assert.equal(albumFound.year, albumNewYear);
  });

  it('find', async () => {
    const artist = makeArtist();
    await artistRepository.save(artist);

    const album = makeAlbum(artist.id);
    await albumRepository.save(album);

    const findAction = new FindAlbum(albumRepository);
    const albumFound = await findAction.execute(artist.id, album.id);

    assert.equal(album.id, albumFound.id);
    assert.equal(album.name, albumFound.name);
    assert.equal(album.year, albumFound.year);
  });

  it('search', async () => {
    const artist = makeArtist();
    await artistRepository.save(artist);

    const album = makeAlbum(artist.id);
    await albumRepository.save(album);

    const searchAction = new SearchAlbum(albumRepository);
    const albumsFound = await searchAction.execute(artist.id, album.name);

    assert.isTrue(albumsFound.length === 1);
    assert.equal(album.id, albumsFound[0].id);
  });

  it('remove', async () => {
    const artist = makeArtist();
    await artistRepository.save(artist);

    const album = makeAlbum(artist.id);
    await albumRepository.save(album);

    const findAction = new FindAlbum(albumRepository);
    const albumFound = await findAction.execute(artist.id, album.id);

    assert.equal(album.id, albumFound.id);

    const removeAction = new RemoveAlbum(albumRepository);
    await removeAction.execute(artist.id, album.id);

    const findCall = async (albumId) => findAction.execute(albumId);
    assert.isRejected(findCall());
  });

  it('throw exception when removing an album that doesnt exist', async () => {
    const artistId = UUIDGenerator.generate();
    const albumId = UUIDGenerator.generate();

    const removeAction = new RemoveAlbum(albumRepository);

    const removeCall = async () => removeAction.execute(artistId, albumId);
    assert.isRejected(removeCall());
  });

  it('throw exception when updating an album that doesnt exist', async () => {
    const artistId = UUIDGenerator.generate();
    const albumId = UUIDGenerator.generate();

    const updateAction = new UpdateAlbum(albumRepository);

    const updateCall = async () => updateAction.execute(
      artistId,
      albumId,
      { artist: artistId, name: null, year: null },
    );
    assert.isRejected(updateCall());
  });

  it('throw exception when finding an album that doesnt exist', async () => {
    const artistId = UUIDGenerator.generate();
    const albumId = UUIDGenerator.generate();

    const findAction = new FindAlbum(albumRepository);

    const findCall = async () => findAction.execute(artistId, albumId);

    assert.isRejected(findCall());
  });
});
