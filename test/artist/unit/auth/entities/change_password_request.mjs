import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { faker } from '@faker-js/faker';
import sinon from 'sinon/pkg/sinon-esm.js';
import ChangePasswordRequest from '../../../../../src/auth/entities/ChangePasswordRequest.mjs';

chai.use(chaiAsPromised);
const { assert } = chai;

describe('Change Password Request', () => {
  it('create an instance', async () => {
    const changePasswordRequestInstance = new ChangePasswordRequest(
      faker.internet.email(),
    );

    assert.instanceOf(changePasswordRequestInstance, ChangePasswordRequest);
  });

  it('check not expired token', async () => {
    const changePasswordRequestInstance = new ChangePasswordRequest(
      faker.internet.email(),
    );
    assert.isFalse(changePasswordRequestInstance.isExpired());
  });

  it('check expired token', async () => {
    const twentyFiveHoursInMilliseconds = 1000 * 60 * 60 * 25;
    const clock = sinon.useFakeTimers(new Date());

    const changePasswordRequestInstance = new ChangePasswordRequest(
      faker.internet.email(),
    );
    clock.tick(twentyFiveHoursInMilliseconds);

    assert.isTrue(changePasswordRequestInstance.isExpired());

    clock.restore();
  });
});
