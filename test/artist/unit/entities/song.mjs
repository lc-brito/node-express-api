import { assert } from 'chai';
import { faker } from '@faker-js/faker';
import Song from '../../../../src/artist/entities/Song.mjs';

const range = (min, max) => parseInt(Math.random() * (max - min) + min, 10);

describe('Song', () => {
  it('create and instance', () => {
    const songInstance = new Song(
      faker.lorem.words(3),
      1,
      range(120, 300),
    );

    assert.instanceOf(songInstance, Song);
  });

  it('instances with same #id must be equals', () => {
    const songInstanceA = new Song(
      faker.lorem.words(3),
      1,
      range(120, 300),
    );

    const songInstanceB = Song.from(
      songInstanceA.id,
      songInstanceA.name,
      songInstanceA.track,
      songInstanceA.time,
      songInstanceA.createdAt,
      songInstanceA.updatedAt,
    );

    assert.isTrue(songInstanceA.isEqual(songInstanceB));
  });

  it('throw exception when invalid name', () => {
    const createSong = () => new Song(
      null,
      1,
      range(120, 300),
    );
    assert.throws(createSong, Error);
  });

  it('throw exception when invalid track', () => {
    const createSong = () => new Song(
      faker.lorem.words(3),
      null,
      range(120, 300),
    );
    assert.throws(createSong, Error);
  });

  it('throw exception when invalid time', () => {
    const createSong = () => new Song(
      faker.lorem.words(3),
      1,
      null,
    );
    assert.throws(createSong, Error);
  });
});
