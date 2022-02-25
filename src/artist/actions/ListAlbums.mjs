class ListAlbums {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  execute(artistId) {
    return this.#repository.getByArtist(artistId);
  }
}

export default ListAlbums;
