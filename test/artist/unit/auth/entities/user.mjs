import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { faker } from '@faker-js/faker';
import User from '../../../../../src/auth/entities/User.mjs';

chai.use(chaiAsPromised);
const { assert } = chai;

const range = (min, max) => parseInt(Math.random() * (max - min) + min, 10);

const makeRandomPassword = () => {
  const specialCharacters = '!@#$%&*(),.;:/?';

  const passwordBase = faker.internet.password(6);
  const twoNumbers = range(10, 99);
  const specialCharacter = specialCharacters.charAt(range(0, specialCharacters.length - 1));

  return `${passwordBase}${twoNumbers}${specialCharacter}`;
};

describe('User', () => {
  it('create an instance', async () => {
    const userInstance = await User.makeFrom(
      faker.internet.email(),
      makeRandomPassword(),
    );

    assert.instanceOf(userInstance, User);
  });

  it('throw exception when password password length < 8', async () => {
    const createUser = async () => User.makeFrom(
      faker.internet.email(),
      faker.internet.password(6),
    );
    assert.isRejected(createUser(), Error);
  });

  it('throw exception when password hasn`t min 02 numbers', async () => {
    const createUser = async () => User.makeFrom(
      faker.internet.email(),
      faker.internet.password(8),
    );
    assert.isRejected(createUser(), Error);
  });

  it('throw exception when password hasn`t special characters', async () => {
    const passwordBase = faker.internet.password(6);
    const twoNumbers = range(10, 99);

    const password = `${passwordBase}${twoNumbers}`;

    const createUser = async () => new User(
      faker.internet.email(),
      password,
    );
    assert.isRejected(createUser(), Error);
  });

  it('check invalid password', async () => {
    const userInstance = await User.makeFrom(
      faker.internet.email(),
      makeRandomPassword(),
    );

    const passwordIsEqual = await userInstance.checkPassword('invalid');
    assert.isFalse(passwordIsEqual);
  });

  it('check valid password', async () => {
    const password = makeRandomPassword();

    const userInstance = await User.makeFrom(
      faker.internet.email(),
      password,
    );

    const passwordIsEqual = await userInstance.checkPassword(password);
    assert.isTrue(passwordIsEqual);
  });

  it('change password', async () => {
    const password = makeRandomPassword();
    const newPassword = makeRandomPassword();

    const userInstance = await User.makeFrom(
      faker.internet.email(),
      password,
    );
    await userInstance.changePassword(newPassword);

    const passwordIsEqual = await userInstance.checkPassword(newPassword);
    assert.isTrue(passwordIsEqual);
  });
});
