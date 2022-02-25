import Artist from '../entities/Artist.mjs';
import { dispatch as EventDispatcher } from '../../core/event/index.mjs';
import ArtistCreatedEvent from '../events/ArtistCeatedEvent.mjs';

class CreateArtist {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  async execute(artistDto) {
    const artist = new Artist(
      artistDto.name,
      artistDto.genre,
    );

    await this.#repository.save(artist);

    EventDispatcher(
      new ArtistCreatedEvent(artist),
    );

    return artist.id;
  }
}

export default CreateArtist;
