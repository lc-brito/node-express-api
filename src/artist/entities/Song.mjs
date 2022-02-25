import UUIDGenerator from '../../support/UUIDGenerator.mjs';
import InvalidArgumentException from '../../core/exceptions/InvalidArgumentException.mjs';

class Song {
  #id;

  #name;

  #track;

  #time;

  #createdAt;

  #updatedAt;

  constructor(name, track, time) {
    Song.#validateOrFail(name, track, time);

    const nowAsEpoch = Date.parse(new Date().toISOString());

    this.#id = UUIDGenerator.generate();
    this.#name = name;
    this.#track = track;
    this.#time = time;
    this.#createdAt = nowAsEpoch;
    this.#updatedAt = nowAsEpoch;
  }

  static #validateOrFail(name, track, time) {
    const MIN_LENGTH = 1;
    const hasMinLength = (str) => !!str && str.length >= MIN_LENGTH;

    if (!hasMinLength(name)) {
      throw new InvalidArgumentException(`Song name must have at least ${MIN_LENGTH} character`);
    }

    const trackIsNotANumber = !track || Number.isNaN(Number(track));
    if (trackIsNotANumber) {
      throw new InvalidArgumentException('Song track must be a number, starting from 1');
    }

    const trackIsGreaterThanZero = parseInt(track, 10) > 0;
    if (!trackIsGreaterThanZero) {
      throw new InvalidArgumentException('Song track must be greater than zero');
    }

    const timeIsNotANumber = !time || Number.isNaN(Number(time));
    if (timeIsNotANumber) {
      throw new InvalidArgumentException('Song time duration must be a number, starting from 1');
    }

    const timeIsGreaterThanZero = parseInt(time, 10) > 0;
    if (!timeIsGreaterThanZero) {
      throw new InvalidArgumentException('Song time must be greater than zero');
    }
  }

  static from(id, name, track, time, createdAt, updatedAt) {
    const song = new Song(name, track, time);

    song.#setId = id;
    song.#setCreatedAt = createdAt;
    song.#setUpdatedAt = updatedAt;

    return song;
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
    this.#name = name;
  }

  get track() {
    return this.#track;
  }

  set track(track) {
    this.#track = track;
  }

  get time() {
    return this.#time;
  }

  set time(time) {
    this.#time = time;
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

  isEqual(song) {
    return this.#id === song.id;
  }
}

export default Song;
