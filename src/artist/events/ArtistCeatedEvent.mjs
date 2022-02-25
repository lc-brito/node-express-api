class ArtistCreatedEvent {
  #name;

  #payload;

  constructor(artist) {
    this.#name = 'ARTIST_CREATED';
    this.#payload = artist;
  }

  static from(artist) {
    return new this(artist);
  }

  get name() {
    return this.#name;
  }

  get payload() {
    return this.#payload;
  }
}

export default ArtistCreatedEvent;
