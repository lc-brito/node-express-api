class AlbumCreatedEvent {
  #name;

  #payload;

  constructor(album) {
    this.#name = 'ALBUM_CREATED';
    this.#payload = album;
  }

  static from(album) {
    return new this(album);
  }

  get name() {
    return this.#name;
  }

  get payload() {
    return this.#payload;
  }
}

export default AlbumCreatedEvent;
