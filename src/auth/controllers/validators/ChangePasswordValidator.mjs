import { validateAll } from 'indicative/validator.js';

const rules = {
  token: 'required|min:20|max:20',
  password: 'required|min:8|max:60',
};

async function validate(data) {
  return validateAll(data, rules);
}

export default {
  validate,
};
