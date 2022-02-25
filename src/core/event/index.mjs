import EventManager from './EventManager.mjs';

const eventManagerInstance = new EventManager();

function dispatch(event) {
  if (eventManagerInstance) {
    eventManagerInstance.dispatch(event);
  }
}

function subscribe(listener) {
  if (eventManagerInstance) {
    eventManagerInstance.subscribe(listener);
  }
}

export {
  subscribe,
  dispatch,
};
