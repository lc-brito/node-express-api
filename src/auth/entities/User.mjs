import * as bcrypt from 'bcrypt';
import InvalidArgumentException from '../../core/exceptions/InvalidArgumentException.mjs';

class User {
  #email;

  #hash;

  #createdAt;

  #updatedAt;

  constructor(email, hash) {
    const nowAsEpoch = Date.parse(new Date().toISOString());

    this.#email = email;
    this.#hash = hash;
    this.#createdAt = nowAsEpoch;
    this.#updatedAt = nowAsEpoch;
  }

  static async makeFrom(email, password) {
    User.#validateEmailOrFail(email);
    User.#validatePasswordOrFail(password);

    const hash = await User.#encryptPassword(password);

    return new User(email, hash);
  }

  static #validateEmailOrFail(email) {
    const isEmail = email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

    if (!isEmail) {
      throw new InvalidArgumentException('E-mail is invalid');
    }
  }

  static #validatePasswordOrFail(password) {
    const PASSWORD_RULES = [
      {
        regex: new RegExp('.{8,}', 'gi'),
        message: 'Password must have at least 08 characters',
      },
      {
        regex: new RegExp('[\\d]{1,}', 'gi'),
        message: 'Password must have at least 01 number',
      },
      {
        regex: new RegExp('[!@#$%&*(),.;:\\/?]{1,}', 'gi'),
        message: 'Password must have at least 01 special character',
      },
    ];

    PASSWORD_RULES.forEach((rule) => {
      if (!rule.regex.test(password)) {
        throw new Error(rule.message);
      }
    });
  }

  static async #encryptPassword(password) {
    const rounds = await bcrypt.genSalt();
    return bcrypt.hash(password, rounds);
  }

  async checkPassword(password) {
    return bcrypt.compare(password, this.#hash);
  }

  get email() {
    return this.#email;
  }

  set #setCreatedAt(createdAt) {
    this.#createdAt = createdAt;
  }

  set #setUpdatedAt(updatedAt) {
    this.#updatedAt = updatedAt;
  }

  async changePassword(password) {
    this.#hash = await User.#encryptPassword(password);
  }

  asObject() {
    return {
      id: this.#email,
      email: this.#email,
      password: this.#hash,
      created_at: this.#createdAt,
      updated_at: this.#updatedAt,
    };
  }

  static async from(email, hash, createdAt, updatedAt) {
    const user = new User(email, hash);

    user.#setCreatedAt = createdAt;
    user.#setUpdatedAt = updatedAt;

    return user;
  }
}

export default User;
