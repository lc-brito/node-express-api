import { publish } from '../../core/notification/index.mjs';
import { render } from '../../core/view/index.mjs';

class NotifyFansAboutNewAlbum {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  async execute({ artist, album }) {
    console.log('Notifying all fans about the new album released: ', album.name);
    const topic = this.#artistNewsTopic(artist.id);
    const message = this.#renderMessage(artist, album);

    publish(topic, message);
  }

  #renderMessage(artist, album) {
    let message = '';

    render(
      'notifications/album_released',
      { artist, album },
      (error, view) => {
        if (error) {
          throw new Error(`Error at rendering view: ${error.message}`);
        }
        message = view;
      },
    );

    return message;
  }

  #artistNewsTopic(artistId) {
    return 'message_queue_topic_that_fans_are_subscribed_to_to_get_news';
  }
}

export default NotifyFansAboutNewAlbum;
