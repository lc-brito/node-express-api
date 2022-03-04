import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { faker } from '@faker-js/faker';
import Account from '../../../../../src/account/entities/Account.mjs';

chai.use(chaiAsPromised);
const { assert } = chai;

describe('Account', () => {
  it('create an instance', async () => {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const accountInstance = new Account(
      faker.name.firstName(),
      faker.internet.email(),
      oneYearAgo,
    );

    assert.instanceOf(accountInstance, Account);
  });

  it('throw exception when name is invalid', async () => {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const createAccount = async () => new Account(
      '',
      faker.internet.email(),
      oneYearAgo,
    );

    assert.isRejected(createAccount(), Error);
  });

  it('throw exception when email is invalid', async () => {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const createAccount = async () => new Account(
      faker.name.firstName(),
      'invalid@email',
      oneYearAgo,
    );

    assert.isRejected(createAccount(), Error);
  });

  it('throw exception when birth date is in future', async () => {
    const oneYearInFuture = new Date();
    oneYearInFuture.setFullYear(oneYearInFuture.getFullYear() + 1);

    const createAccount = async () => new Account(
      faker.name.firstName(),
      faker.internet.email(),
      oneYearInFuture,
    );

    assert.isRejected(createAccount(), Error);
  });

  it('throw exception when birth date is older than 150 years', async () => {
    const oneYearInFuture = new Date();
    oneYearInFuture.setFullYear(oneYearInFuture.getFullYear() - 151);

    const createAccount = async () => new Account(
      faker.name.firstName(),
      faker.internet.email(),
      oneYearInFuture,
    );

    assert.isRejected(createAccount(), Error);
  });
});
