import Application from '../config/app.mjs';

import AppProvider from './providers/AppProvider.mjs';
import ExceptionHandler from './exception/ExceptionHandler.mjs';
import ScheduleProvider from './providers/ScheduleProvider.mjs';
import CoreProvider from '../src/core/providers/Provider.mjs';
import AuthProvider from '../src/auth/providers/Provider.mjs';
import ArtistProvider from '../src/artist/providers/Provider.mjs';

async function registerProviders(app) {
  AppProvider.boot(app);
  CoreProvider.boot(app);
  ScheduleProvider.boot(app);
  ArtistProvider.boot(app);
  AuthProvider.boot(app);
  ExceptionHandler.boot(app);
}

function boot(app) {
  return app.listen(
    Application.cron.port,
    () => {
      console.log(`Application ${Application.cron.name} up and listening on port ${Application.cron.port}.`);
    },
  );
}

export default async (app) => {
  await registerProviders(app);

  const server = boot(app);
  ExceptionHandler.handleServerErrors(server);

  process.send && process.send('ready');
};
