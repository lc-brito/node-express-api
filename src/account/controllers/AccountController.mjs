import RepositoryImpl from '../../core/repository/index.mjs';
import AccountRepository from '../repositories/AccountRepository.mjs';

import Paginator from '../../support/Paginator.mjs';
import PaginationCriteria from '../../support/PaginationCriteria.mjs';

import ListAccounts from '../actions/ListAccounts.mjs';
import CreateAccount from '../actions/CreateAccount.mjs';
import FindAccount from '../actions/FindAccount.mjs';
import RemoveAccount from '../actions/RemoveAccount.mjs';

import AccountValidator from './validators/AccountValidator.mjs';
import AccountPresenter from '../presenters/AccountPresenter.mjs';

const accountRepository = new AccountRepository(RepositoryImpl);

export async function index(request, response, next) {
  const availableFilters = ['page', 'limit'];

  const enabledFilters = {};
  for (const [key, value] of Object.entries(request.query)) {
    if (availableFilters.includes(key)) {
      enabledFilters[key] = value.toString();
    }
  }

  const queryCriteria = PaginationCriteria.from(enabledFilters);

  const listAccountsAction = new ListAccounts(accountRepository);
  let accountsCollection;

  try {
    accountsCollection = await listAccountsAction.execute();
  } catch (error) {
    return next(error);
  }

  const paginator = new Paginator(
    accountsCollection.map(AccountPresenter.present),
  );

  return response
    .status(200)
    .json(
      paginator.paginate(
        queryCriteria.page,
        queryCriteria.limit,
      ),
    );
}

export async function store(request, response, next) {
  const accountDto = { ...request.body };

  try {
    await AccountValidator.validate(accountDto);
  } catch (error) {
    return response
      .status(400)
      .json(error);
  }

  const createAccountAction = new CreateAccount(accountRepository);
  let accountId;

  try {
    accountId = await createAccountAction.execute({ ...request.body });
  } catch (error) {
    return next(error);
  }

  const findAccountAction = new FindAccount(accountRepository);

  let account;
  try {
    account = await findAccountAction.execute(accountId);
  } catch (error) {
    return next(error);
  }

  return response
    .status(201)
    .json(
      AccountPresenter.present(account),
    );
}

export async function show(request, response, next) {
  const accountId = request.params.id;

  const findAccountAction = new FindAccount(accountRepository);

  let account;
  try {
    account = await findAccountAction.execute(accountId);
  } catch (error) {
    return next(error);
  }

  return response
    .status(200)
    .json(
      AccountPresenter.present(account),
    );
}

export async function remove(request, response, next) {
  const accountId = request.params.id;

  const removeAccountAction = new RemoveAccount(accountRepository);

  try {
    await removeAccountAction.execute(accountId);
  } catch (error) {
    return next(error);
  }

  return response
    .status(204)
    .json(null);
}
