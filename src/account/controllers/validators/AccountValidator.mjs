import { validateAll } from 'indicative/validator.js';

const rules = {
  name: 'required|min:2|max:200',
  email: 'required|email',
  birth_date: 'required|date',
  password: 'required|min:8|max:60',
};

async function validate(data) {
  return validateAll(data, rules);
}

export default {
  validate,
};
