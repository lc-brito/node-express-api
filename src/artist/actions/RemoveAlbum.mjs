import DataNotFoundException from '../../core/exceptions/DataNotFoundException.mjs';

class RemoveAlbum {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  async execute(artistId, albumId) {
    const album = await this.#repository.getById(artistId, albumId);

    if (!album) {
      throw new DataNotFoundException(`Album not found: ${albumId}`);
    }

    await this.#repository.remove(album);
  }
}

export default RemoveAlbum;
