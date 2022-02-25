import { boot as NotifierBoot } from '../notification/index.mjs';
import { boot as ViewBoot } from '../view/index.mjs';
import Courier from '../../../adapters/notification/Courier.mjs';

export default {
  boot: (app) => {
    NotifierBoot(Courier);
    ViewBoot(app);
  },
};
