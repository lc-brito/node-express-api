import AbstractListener from '../../core/event/AbstractListener.mjs';
import { sendEmail } from '../../core/notification/index.mjs';
import Application from '../../support/Application.mjs';
import Email from '../../core/notification/Email.mjs';

class ChangePasswordRequestedListener extends AbstractListener {
  constructor() {
    super('CHANGE_PASSWORD_REQUEST_CREATED');
  }

  async notify(changePasswordRequest) {
    console.log(`Notification ${this.event} received`);

    const hostname = Application.baseUrl();
    const message = `Hello,
     you requested to change your password. 
     Click <a href="${hostname}/change-password?token=${changePasswordRequest.token}">HERE</a> to redefine it.`;

    await sendEmail(
      new Email(
        changePasswordRequest.email,
        'Change password',
        message,
      ),
    );
  }
}

export default new ChangePasswordRequestedListener();
