import { assert } from 'chai';
import { faker } from '@faker-js/faker';
import Artist from '../../../../../src/artist/entities/Artist.mjs';

describe('Artist', () => {
  it('create an instance', () => {
    const artist = new Artist(faker.lorem.word(), faker.music.genre());
    assert.instanceOf(artist, Artist);
  });

  it('throw exception when invalid name', () => {
    const createArtist = () => new Artist(null, faker.music.genre());
    assert.throws(createArtist, Error);
  });

  it('throw exception when invalid genre', () => {
    const createArtist = () => new Artist(faker.lorem.word(), null);
    assert.throws(createArtist, Error);
  });
});
