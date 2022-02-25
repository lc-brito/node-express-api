import artist from '../../src/artist/routes.mjs';
import maintenance from '../../src/maintenance/routes.mjs';

function registerRoutes(app) {
  app.use(artist);
  app.use(maintenance);
}

export default {
  boot: (app) => {
    registerRoutes(app);
  },
};
