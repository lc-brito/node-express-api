const presenter = (account) => ({
  id: account.id,
  name: account.name,
  email: account.email,
  birth_date: account.birthDate.toISOString().split('T').shift(),
  created_at: account.createdAt,
});

export default {
  present: presenter,
};
