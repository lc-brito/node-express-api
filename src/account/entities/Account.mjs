import UUIDGenerator from '../../support/UUIDGenerator.mjs';
import InvalidArgumentException from '../../core/exceptions/InvalidArgumentException.mjs';

class Account {
  #id;

  #name;

  #email;

  #birthDate;

  #active;

  #createdAt;

  #updatedAt;

  constructor(name, email, birthDate) {
    Account.#validateOrFail(name, email, birthDate);

    const nowAsEpoch = Date.parse(new Date().toISOString());

    this.#id = UUIDGenerator.generate();
    this.#name = name;
    this.#email = email;
    this.#birthDate = new Date(Date.parse(birthDate));
    this.#active = true;
    this.#createdAt = nowAsEpoch;
    this.#updatedAt = nowAsEpoch;
  }

  static #validateOrFail(name, email, birthDate) {
    Account.#validateNameOrFail(name);
    Account.#validateEmailOrFail(email);
    Account.#validateBirthDateOrFail(birthDate);
  }

  static #validateNameOrFail(name) {
    const MIN_LENGTH = 2;
    const hasMinLength = (str) => !!str && str.length >= MIN_LENGTH;

    if (!hasMinLength(name)) {
      throw new InvalidArgumentException(`Account name must have at least ${MIN_LENGTH} characters`);
    }
  }

  static #validateEmailOrFail(email) {
    const isEmail = email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

    if (!isEmail) {
      throw new InvalidArgumentException('E-mail is invalid');
    }
  }

  static #validateBirthDateOrFail(birthDate) {
    const isNotDate = Number.isNaN(
      Date.parse(birthDate),
    );

    if (isNotDate) {
      throw new InvalidArgumentException('Birth date must be a date');
    }

    const nowTimeStamp = new Date().getTime();
    const birthDateTimestamp = Date.parse(birthDate);
    const isBirthDateGreaterThanNow = birthDateTimestamp >= nowTimeStamp;

    if (isBirthDateGreaterThanNow) {
      throw new InvalidArgumentException('Birth date can`t be greater than now');
    }

    const aHundredAndFiftyYearsAgo = new Date();
    aHundredAndFiftyYearsAgo.setFullYear(aHundredAndFiftyYearsAgo.getFullYear() - 150);

    const isBirthDateLowerThanAHundredAndFiftyYears = new Date(birthDateTimestamp) < new Date(aHundredAndFiftyYearsAgo);

    if (isBirthDateLowerThanAHundredAndFiftyYears) {
      throw new InvalidArgumentException('Birth date can`t be lower than 150 years ago');
    }
  }

  static from(id, name, email, birthDate, active, createdAt, updatedAt) {
    const account = new Account(name, email, birthDate);

    account.#setId = id;
    account.#setCreatedAt = createdAt;
    account.#setUpdatedAt = updatedAt;

    if (!active) {
      account.deactivate();
    }

    return account;
  }

  get id() {
    return this.#id;
  }

  set #setId(id) {
    this.#id = id;
  }

  get name() {
    return this.#name;
  }

  get email() {
    return this.#email;
  }

  get birthDate() {
    return this.#birthDate;
  }

  get createdAt() {
    return this.#createdAt;
  }

  get updatedAt() {
    return this.#updatedAt;
  }

  set #setCreatedAt(date) {
    this.#createdAt = date;
  }

  set #setUpdatedAt(date) {
    this.#updatedAt = date;
  }

  deactivate() {
    this.#active = false;
  }
}

export default Account;
