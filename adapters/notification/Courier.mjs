class Courier {
  static publish(topic, message) {
    console.info('Publishing message to topic: ', topic);
    console.info(message);
  }

  static sendEmail(email) {
    console.info('Sending email to: ', email.to);
    console.info(email.message);
  }

  static sendSms(sms) {
    console.info('Sending SMS to: ', sms.to);
    console.info(sms.message);
  }
}

export default Courier;
