import path from 'path';
import { fileURLToPath } from 'url';

import { subscribe } from '../../core/event/index.mjs';
import ArtistCreatedListener from '../events/ArtistCreatedListener.js';
import AlbumCreatedListener from '../events/AlbumCreatedListener.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LISTENERS = [
  ArtistCreatedListener,
  AlbumCreatedListener,
];

function registerEventListeners() {
  LISTENERS.forEach((listener) => {
    subscribe(listener);
  });
}

function registerViews(app) {
  const currentViewPaths = app.get('views');
  const viewPath = path.join(__dirname, '/../views');

  app.set('views', [].concat(currentViewPaths, [viewPath]));
}

export default {
  boot: (app) => {
    registerViews(app);
    registerEventListeners();
  },
};
