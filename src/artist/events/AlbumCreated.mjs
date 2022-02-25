class AlbumCreated {
  #artist;

  #album;

  constructor(artist, album) {
    this.#artist = artist;
    this.#album = album;
  }

  get artist() {
    return this.#artist;
  }

  get album() {
    return this.#album;
  }
}

export default AlbumCreated;
