import DataNotFoundException from '../../core/exceptions/DataNotFoundException.mjs';

class UpdateAlbum {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  async execute(artistId, albumId, albumDto) {
    const album = await this.#repository.getById(artistId, albumId);

    if (!album) {
      throw new DataNotFoundException(`Album not found: ${albumId}`);
    }

    album.artist = albumDto.artist;
    album.name = albumDto.name;
    album.year = albumDto.year;

    await this.#repository.save(album);
  }
}

export default UpdateAlbum;
