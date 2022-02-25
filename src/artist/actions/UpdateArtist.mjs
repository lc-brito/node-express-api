import DataNotFoundException from '../../core/exceptions/DataNotFoundException.mjs';

class UpdateArtist {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  async execute(artistId, artistDto) {
    const artist = await this.#repository.getById(artistId);

    if (!artist) {
      throw new DataNotFoundException(`Artist not found: ${artistId}`);
    }

    artist.name = artistDto.name;
    artist.genre = artistDto.genre;

    await this.#repository.save(artist);
  }
}

export default UpdateArtist;
