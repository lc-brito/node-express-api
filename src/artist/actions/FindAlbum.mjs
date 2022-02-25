import DataNotFoundException from '../../core/exceptions/DataNotFoundException.mjs';

class FindAlbum {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  async execute(artistId, albumId) {
    const album = await this.#repository.getById(artistId, albumId);

    if (!album) {
      throw new DataNotFoundException(`Album not found: ${albumId}`);
    }

    return album;
  }
}

export default FindAlbum;
