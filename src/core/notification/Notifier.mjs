class Notifier {
  #courier;

  constructor(courier) {
    this.#courier = courier;
  }

  publish(topic, message) {
    this.#courier.publish(topic, message);
  }

  sendEmail(email) {
    this.#courier.sendEmail(email);
  }

  sendSms(sms) {
    this.#courier.sendSms(sms);
  }
}

export default Notifier;
