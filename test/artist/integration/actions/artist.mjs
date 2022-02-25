import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { faker } from '@faker-js/faker';

import RepositoryImpl from '../../../../adapters/repository/index.mjs';
import ArtistRepository from '../../../../src/artist/repositories/ArtistRepository.mjs';
import Artist from '../../../../src/artist/entities/Artist.mjs';
import CreateArtist from '../../../../src/artist/actions/CreateArtist.mjs';
import FindArtist from '../../../../src/artist/actions/FindArtist.mjs';
import UpdateArtist from '../../../../src/artist/actions/UpdateArtist.mjs';
import UUIDGenerator from '../../../../src/support/UUIDGenerator.mjs';
import SearchArtist from '../../../../src/artist/actions/SearchArtist.mjs';
import RemoveArtist from '../../../../src/artist/actions/RemoveArtist.mjs';

chai.use(chaiAsPromised);
const { assert } = chai;

describe('Artist actions', () => {
  let repository = null;

  beforeEach(() => {
    repository = new ArtistRepository(RepositoryImpl);
  });

  it('create', async () => {
    const artistDto = {
      name: faker.lorem.word(),
      genre: faker.music.genre(),
    };

    const createAction = new CreateArtist(repository);
    const artistId = await createAction.execute(artistDto);

    const artistFound = await repository.getById(artistId);

    assert.equal(artistId, artistFound.id);
    assert.equal(artistDto.name, artistFound.name);
    assert.equal(artistDto.genre, artistFound.genre);
  });

  it('update', async () => {
    const artist = new Artist(faker.lorem.word(), faker.music.genre());
    repository.save(artist);

    const artistNewName = faker.lorem.word();
    const artistNewGenre = faker.music.genre();

    const updateAction = new UpdateArtist(repository);
    await updateAction.execute(artist.id, { name: artistNewName, genre: artistNewGenre });

    const artistFound = await repository.getById(artist.id);

    assert.equal(artist.id, artistFound.id);
    assert.equal(artistFound.name, artistNewName);
    assert.equal(artistFound.genre, artistNewGenre);
  });

  it('find', async () => {
    const artist = new Artist(faker.lorem.word(), faker.music.genre());
    repository.save(artist);

    const findAction = new FindArtist(repository);
    const artistFound = await findAction.execute(artist.id);

    assert.equal(artist.id, artistFound.id);
    assert.equal(artist.name, artistFound.name);
    assert.equal(artist.genre, artistFound.genre);
  });

  it('search', async () => {
    const artist = new Artist(faker.lorem.word(), faker.music.genre());
    repository.save(artist);

    const searchAction = new SearchArtist(repository);
    const artistsFound = await searchAction.execute(artist.name);

    assert.isTrue(artistsFound.length === 1);
    assert.equal(artist.id, artistsFound[0].id);
  });

  it('remove', async () => {
    const artist = new Artist(faker.lorem.word(), faker.music.genre());
    repository.save(artist);

    const findAction = new FindArtist(repository);
    const artistFound = await findAction.execute(artist.id);

    assert.equal(artist.id, artistFound.id);

    const removeAction = new RemoveArtist(repository);
    await removeAction.execute(artist.id);

    const findCall = async (artistId) => findAction.execute(artistId);
    assert.isRejected(findCall());
  });

  it('throw exception when updating an artist that doesnt exist', async () => {
    const id = UUIDGenerator.generate();
    const artistNewName = faker.lorem.word();
    const artistNewGenre = faker.music.genre();

    const updateAction = new UpdateArtist(repository);

    const updateCall = async () => updateAction.execute(
      id,
      { name: artistNewName, genre: artistNewGenre },
    );
    assert.isRejected(updateCall());
  });

  it('throw exception when finding an artist that doesnt exist', async () => {
    const id = UUIDGenerator.generate();

    const findAction = new FindArtist(repository);

    const updateCall = async () => findAction.execute(id);
    assert.isRejected(updateCall());
  });
});
