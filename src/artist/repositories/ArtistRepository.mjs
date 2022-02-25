import ArtistMapper from './mappers/Artist.mjs';

class ArtistRepository {
  #storage;

  #collection = 'artist';

  constructor(storageImpl) {
    this.#storage = storageImpl;
    this.#storage.createCollection(this.#collection);
  }

  async save(artist) {
    return this
      .#storage
      .save(this.#collection, ArtistMapper.mapToDatabase(artist));
  }

  async remove(artist) {
    return this
      .#storage
      .remove(this.#collection, artist.id);
  }

  async getById(id) {
    const artistRaw = await this
      .#storage
      .get(this.#collection, id);

    if (!artistRaw) {
      return null;
    }

    return ArtistMapper.mapFromDatabase(artistRaw);
  }

  async searchByName(name) {
    const data = await this.getAll();

    const regex = new RegExp(name, 'gi');
    return data.filter((artist) => regex.test(artist.name));
  }

  async getAll() {
    const artists = await this
      .#storage
      .getAll(this.#collection);

    return artists.map((artistRaw) => ArtistMapper.mapFromDatabase(artistRaw));
  }
}

export default ArtistRepository;
