import DataNotFoundException from '../../core/exceptions/DataNotFoundException.mjs';

class FindArtist {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  async execute(artistId) {
    const artist = await this.#repository.getById(artistId);

    if (!artist) {
      throw new DataNotFoundException(`Artist not found: ${artistId}`);
    }

    return artist;
  }
}

export default FindArtist;
