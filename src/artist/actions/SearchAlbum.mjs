class SearchAlbum {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  async execute(artistId, albumName) {
    return this.#repository.searchByName(artistId, albumName);
  }
}

export default SearchAlbum;
