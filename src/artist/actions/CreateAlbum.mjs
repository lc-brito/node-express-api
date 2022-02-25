import { dispatch as EventDispatcher } from '../../core/event/index.mjs';
import AlbumCreatedEvent from '../events/AlbumCreatedEvent.mjs';
import Album from '../entities/Album.mjs';
import Song from '../entities/Song.mjs';
import DataNotFoundException from '../../core/exceptions/DataNotFoundException.mjs';
import InvalidArgumentException from '../../core/exceptions/InvalidArgumentException.mjs';
import AlbumCreated from '../events/AlbumCreated.mjs';

class CreateAlbum {
  #albumRepository;

  #artistRepository;

  constructor(artistRepository, albumRepository) {
    this.#albumRepository = albumRepository;
    this.#artistRepository = artistRepository;
  }

  async execute(artistId, albumDto) {
    this.#validateSongsOrFail(albumDto);

    const artist = await this.#artistRepository.getById(artistId);

    if (!artist) {
      throw new DataNotFoundException(`Artist not found: ${artistId}`);
    }

    const songsCollection = this.#makeSongs(albumDto);

    const album = new Album(
      artistId,
      albumDto.name,
      albumDto.year,
      songsCollection,
    );

    await this.#albumRepository.save(album);

    EventDispatcher(
      new AlbumCreatedEvent(
        new AlbumCreated(artist, album),
      ),
    );

    return album.id;
  }

  #makeSongs(albumDto) {
    return albumDto.songs.reduce(
      (collection, song) => {
        collection.push(new Song(song.name, song.track, song.time));
        return collection;
      },
      [],
    );
  }

  #validateSongsOrFail(albumDto) {
    const hasSongs = albumDto.songs.length > 0;

    if (!hasSongs) {
      throw new InvalidArgumentException('The album requires at least 01 song');
    }
  }
}

export default CreateAlbum;
