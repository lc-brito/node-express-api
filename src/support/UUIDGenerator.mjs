import {
  v4, stringify, parse, validate,
} from 'uuid';

class UUIDGenerator {
  static generate() {
    return v4();
  }

  static parse(uuid) {
    return parse(uuid);
  }

  static stringify(uuid) {
    return stringify(uuid);
  }

  static isValid(uuid) {
    return validate(uuid);
  }
}

export default UUIDGenerator;
