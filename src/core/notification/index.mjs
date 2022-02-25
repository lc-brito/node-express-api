import Notifier from './Notifier.mjs';

let notifier;

function boot(courier) {
  notifier = new Notifier(courier);
}

function publish(...args) {
  return notifier.publish(...args);
}

function sendEmail(...args) {
  return notifier.sendEmail(...args);
}

function sendSms(...args) {
  return notifier.sendSms(...args);
}

export {
  boot,
  publish,
  sendEmail,
  sendSms,
};
