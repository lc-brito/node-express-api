import AlbumMapper from './mappers/Album.mjs';

class AlbumRepository {
  #storage;

  #collection = 'album';

  constructor(storageImpl) {
    this.#storage = storageImpl;
    this.#storage.createCollection(this.#collection);
  }

  async save(album) {
    return this
      .#storage
      .save(this.#collection, AlbumMapper.mapToDatabase(album));
  }

  async remove(album) {
    return this
      .#storage
      .remove(this.#collection, album.id);
  }

  async getById(artistId, id) {
    const albumRaw = await this
      .#storage
      .get(this.#collection, id);

    if (!albumRaw) {
      return null;
    }

    const album = AlbumMapper.mapFromDatabase(albumRaw);

    if (album.artist === artistId) {
      return album;
    }

    return null;
  }

  async getByArtist(artistId) {
    const albums = await this.getAll();

    return albums.filter((album) => album.artist === artistId);
  }

  async searchByName(artistId, name) {
    const albums = await this.getByArtist(artistId);

    const regex = new RegExp(name, 'gi');
    return albums.filter((album) => regex.test(album.name));
  }

  async getAll() {
    const albums = await this
      .#storage
      .getAll(this.#collection);

    return albums.map((artistRaw) => AlbumMapper.mapFromDatabase(artistRaw));
  }
}

export default AlbumRepository;
