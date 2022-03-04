import Account from '../../entities/Account.mjs';

const mapFromDatabase = (accountRaw) => Account.from(
  accountRaw.id,
  accountRaw.name,
  accountRaw.email,
  new Date(accountRaw.birth_date).toISOString().split('T').shift(),
  accountRaw.active,
  accountRaw.created_at,
  accountRaw.updated_at,
);

const mapToDatabase = (account) => ({
  id: account.id,
  name: account.name,
  email: account.email,
  birth_date: account.birthDate.toISOString().split('T').shift(),
  active: account.active,
  created_at: account.createdAt,
  updated_at: account.updatedAt,
});

export default {
  mapFromDatabase,
  mapToDatabase,
};
