import UUIDGenerator from '../../support/UUIDGenerator.mjs';
import InvalidArgumentException from '../../core/exceptions/InvalidArgumentException.mjs';

class Album {
  #id;

  #artist;

  #name;

  #year;

  #songs;

  #createdAt;

  #updatedAt;

  constructor(artist, name, year, songsCollection) {
    Album.#validateOrFail(name, year);

    const nowAsEpoch = Date.parse(new Date().toISOString());

    this.#id = UUIDGenerator.generate();
    this.#artist = artist;
    this.#name = name;
    this.#year = year;
    this.#songs = songsCollection;
    this.#createdAt = nowAsEpoch;
    this.#updatedAt = nowAsEpoch;
  }

  static #validateOrFail(name, year) {
    const MIN_LENGTH = 1;
    const hasMinLength = (str) => !!str && str.length >= MIN_LENGTH;

    if (!hasMinLength(name)) {
      throw new InvalidArgumentException(`Album name must have at least ${MIN_LENGTH} character`);
    }

    const yearIsNotANumber = !year || Number.isNaN(Number(year));
    if (yearIsNotANumber) {
      throw new InvalidArgumentException('Album year duration must be a number, starting from 1900');
    }

    const nextYear = new Date().getFullYear() + 1;
    const yearIsLowerThanOrEqualNextYear = parseInt(year, 10) <= nextYear;
    if (!yearIsLowerThanOrEqualNextYear) {
      throw new InvalidArgumentException(`Album year must be lower than ${nextYear}`);
    }
  }

  static from(id, artist, name, year, songsCollection, createdAt, updatedAt) {
    const album = new Album(artist, name, year, songsCollection);

    album.#setId = id;
    album.#setCreatedAt = createdAt;
    album.#setUpdatedAt = updatedAt;

    return album;
  }

  get id() {
    return this.#id;
  }

  set #setId(id) {
    this.#id = id;
  }

  get artist() {
    return this.#artist;
  }

  set artist(artist) {
    this.#artist = artist;
  }

  get name() {
    return this.#name;
  }

  set name(name) {
    this.#name = name;
  }

  get year() {
    return this.#year;
  }

  set year(year) {
    this.#year = year;
  }

  get songs() {
    return [].concat(this.#songs);
  }

  get createdAt() {
    return this.#createdAt;
  }

  get updatedAt() {
    return this.#updatedAt;
  }

  set #setCreatedAt(date) {
    this.#createdAt = date;
  }

  set #setUpdatedAt(date) {
    this.#updatedAt = date;
  }

  #updateTimestamp() {
    this.#setUpdatedAt = Date.parse(new Date().toISOString());
  }

  addSong(song) {
    this.#songs.push(song);
    this.#updateTimestamp();
  }

  removeSong(song) {
    this.#songs = this.#songs.filter((currentSong) => !currentSong.isEqual(song));
    this.#updateTimestamp();
  }

  songsCount() {
    return this.#songs.length;
  }

  isEqual(album) {
    return this.#id === album.id;
  }
}

export default Album;
