class ListArtists {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  execute() {
    return this.#repository.getAll();
  }
}

export default ListArtists;
