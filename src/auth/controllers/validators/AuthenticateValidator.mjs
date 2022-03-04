import { validateAll } from 'indicative/validator.js';

const rules = {
  email: 'required|email',
  password: 'required|min:8|max:60',
};

async function validate(data) {
  return validateAll(data, rules);
}

export default {
  validate,
};
