import UUIDGenerator from '../../support/UUIDGenerator.mjs';
import InvalidArgumentException from '../../core/exceptions/InvalidArgumentException.mjs';

class Artist {
  #id;

  #name;

  #genre;

  #createdAt;

  #updatedAt;

  constructor(name, genre) {
    Artist.#validateOrFail(name, genre);

    const nowAsEpoch = Date.parse(new Date().toISOString());

    this.#id = UUIDGenerator.generate();
    this.#name = name;
    this.#genre = genre;
    this.#createdAt = nowAsEpoch;
    this.#updatedAt = nowAsEpoch;
  }

  static #validateOrFail(name, genre) {
    Artist.#validateNameOrFail(name);
    Artist.#validateGenreOrFail(genre);
  }

  static #validateNameOrFail(name) {
    const MIN_LENGTH = 2;
    const hasMinLength = (str) => !!str && str.length >= MIN_LENGTH;

    if (!hasMinLength(name)) {
      throw new InvalidArgumentException(`Artist name must have at least ${MIN_LENGTH} characters`);
    }
  }

  static #validateGenreOrFail(genre) {
    const MIN_LENGTH = 1;
    const hasMinLength = (str) => !!str && str.length >= MIN_LENGTH;

    if (!hasMinLength(genre)) {
      throw new InvalidArgumentException(`Artist genre must have at least ${MIN_LENGTH} character`);
    }
  }

  static from(id, name, genre, createdAt, updatedAt) {
    const artist = new Artist(name, genre);

    artist.#setId = id;
    artist.#setCreatedAt = createdAt;
    artist.#setUpdatedAt = updatedAt;

    return artist;
  }

  get id() {
    return this.#id;
  }

  set #setId(id) {
    this.#id = id;
  }

  get name() {
    return this.#name;
  }

  set name(name) {
    Artist.#validateNameOrFail(name);
    this.#name = name;
    this.#updateTimestamp();
  }

  get genre() {
    return this.#genre;
  }

  set genre(genre) {
    Artist.#validateGenreOrFail(genre);
    this.#genre = genre;
    this.#updateTimestamp();
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
}

export default Artist;
