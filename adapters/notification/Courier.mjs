class Courier {
  static publish(topic, message) {
    console.info('Publishing message to topic ', topic);
  }

  static sendEmail(email) {
    console.info('Sending sendEmail to ', email.to);
  }

  static sendSms(sms) {
    console.info('Sending SMS to ', sms.to);
  }
}

export default Courier;
