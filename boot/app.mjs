import Application from '../config/app.mjs';

import AppProvider from './providers/AppProvider.mjs';
import ExceptionHandler from './exception/ExceptionHandler.mjs';
import CoreProvider from '../src/core/providers/Provider.mjs';
import RouteProvider from './providers/RouteProvider.mjs';
import ArtistProvider from '../src/artist/providers/Provider.mjs';

import Compression from './middlewares/Compression.mjs';
import Cors from './middlewares/Cors.mjs';
import QueryString from './middlewares/QueryString.mjs';

async function registerProviders(app) {
  AppProvider.boot(app);
  RouteProvider.boot(app);
  CoreProvider.boot(app);
  ArtistProvider.boot(app);
}

function boot(app) {
  return app.listen(
    Application.port,
    () => {
      console.log(`Application up and listening on port ${Application.port}.`);
    },
  );
}

export default async (app) => {
  app.use(Compression());
  app.use(Cors);
  app.use(QueryString);

  await registerProviders(app);

  const server = boot(app);
  ExceptionHandler.handle(app, server);
};
