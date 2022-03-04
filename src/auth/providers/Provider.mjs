import { subscribe } from '../../core/event/index.mjs';
import ChangePasswordRequestedListener from '../events/ChangePasswordRequestedListener.mjs';

const LISTENERS = [
  ChangePasswordRequestedListener,
];

function registerEventListeners() {
  LISTENERS.forEach((listener) => {
    subscribe(listener);
  });
}

export default {
  boot: () => {
    registerEventListeners();
  },
};
