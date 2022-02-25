class SearchArtist {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  async execute(artistName) {
    return this.#repository.searchByName(artistName);
  }
}

export default SearchArtist;
