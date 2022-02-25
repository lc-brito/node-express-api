import AbstractListener from '../../core/event/AbstractListener.mjs';

class ArtistCreatedListener extends AbstractListener {
  constructor() {
    super('ARTIST_CREATED');
  }

  notify(artist) {
    console.log(`Notification ${this.event} received: `, artist.id);
    console.info(`New artist on the platform: ${artist.name}, notifying fans of that genre...`);
  }
}

export default new ArtistCreatedListener();
