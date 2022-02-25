import { assert } from 'chai';
import { faker } from '@faker-js/faker';
import Song from '../../../../src/artist/entities/Song.mjs';
import Album from '../../../../src/artist/entities/Album.mjs';

const range = (min, max) => parseInt(Math.random() * (max - min) + min, 10);

const makeAlbum = () => new Album(
  range(1, 100),
  faker.lorem.words(3),
  new Date().getFullYear(),
  [],
);

describe('Album', () => {
  it('create and instance', () => {
    const album = makeAlbum();

    assert.instanceOf(album, Album);
  });

  it('instances with same #id must be equals', () => {
    const albumInstanceA = makeAlbum();

    const albumInstanceB = Album.from(
      albumInstanceA.id,
      albumInstanceA.artist,
      albumInstanceA.name,
      albumInstanceA.year,
      albumInstanceA.songs,
      albumInstanceA.createdAt,
      albumInstanceA.updatedAt,
    );

    assert.isTrue(albumInstanceA.isEqual(albumInstanceB));
  });

  it('add song to album', () => {
    const album = makeAlbum();

    const time = (min, max) => (Math.random() * max) + min;

    const song = new Song(
      faker.lorem.words(3),
      1,
      time(120, 300),
    );

    album.addSong(song);

    assert.equal(album.songsCount(), 1);
  });

  it('remove song from album', () => {
    const album = makeAlbum();

    const time = (min, max) => (Math.random() * max) + min;

    const song = new Song(
      faker.lorem.words(3),
      1,
      time(120, 300),
    );

    album.addSong(song);

    assert.equal(album.songsCount(), 1);

    album.removeSong(song);

    assert.equal(album.songsCount(), 0);
  });
});
