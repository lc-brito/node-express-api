import { validateAll, validations } from 'indicative/validator.js';

const nextYear = new Date().getFullYear() + 1;
const uuidv4RegEx = '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$';

const rules = {
  artist: [
    validations.required(),
    validations.regex([uuidv4RegEx]),
  ],
  name: 'required|min:1|max:200',
  year: `required|integer|above:1900|under:${nextYear}`,
  songs: 'required|array|min:1',
  'songs.*.name': 'required|min:1|max:200',
  'songs.*.track': 'required|integer|above:0',
  'songs.*.time': 'required|integer|above:0',
};

async function validate(data) {
  return validateAll(data, rules);
}

export default {
  validate,
};
