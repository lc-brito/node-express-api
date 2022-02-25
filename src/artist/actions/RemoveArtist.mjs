import DataNotFoundException from '../../core/exceptions/DataNotFoundException.mjs';

class RemoveArtist {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  async execute(artistId) {
    const artist = await this.#repository.getById(artistId);

    if (!artist) {
      throw new DataNotFoundException(`Artist not found: ${artistId}`);
    }

    await this.#repository.remove(artist);
  }
}

export default RemoveArtist;
