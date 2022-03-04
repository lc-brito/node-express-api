import account from '../../src/account/routes.mjs';
import auth from '../../src/auth/routes.mjs';
import artist from '../../src/artist/routes.mjs';
import maintenance from '../../src/maintenance/routes.mjs';

function registerRoutes(app) {
  app.use(account);
  app.use(auth);
  app.use(artist);
  app.use(maintenance);
}

export default {
  boot: (app) => {
    registerRoutes(app);
  },
};
