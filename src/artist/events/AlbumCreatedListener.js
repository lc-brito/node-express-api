import AbstractListener from '../../core/event/AbstractListener.mjs';
import NotifyFansAboutNewAlbum from '../application_services/NotifyFansAboutNewAlbum.js';
import ArtistRepository from '../repositories/ArtistRepository.mjs';

class ArtistCreatedListener extends AbstractListener {
  constructor() {
    super('ALBUM_CREATED');
  }

  async notify(albumCreated) {
    console.log(`Notification ${this.event} received`);
    const fansNotifier = new NotifyFansAboutNewAlbum(ArtistRepository);
    await fansNotifier.execute(albumCreated);
  }
}

export default new ArtistCreatedListener();
