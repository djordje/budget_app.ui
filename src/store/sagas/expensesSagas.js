import { call, put, select, takeEvery } from 'redux-saga/effects';
import {
  FETCH_EXPENSES_REQUEST,
  fetchExpensesSuccess,
  fetchExpensesFailure,

  CREATE_EXPENSE_REQUEST,
  createExpenseSuccess,
  createExpenseFailure
} from '../actions/expensesActions';
import {
  getPaginatedExpenses,
  createExpense as createExpenseAPI
} from '../../services/http/budgetAppAPI/requests/expenses';
import { getApiToken } from '../selectors/apiTokenSelector';

export function* fetchExpenses(action) {
  const { page = 1, perPage = 10 } = action;
  const { accessToken } = yield select(getApiToken);
  try {
    const response = yield call(getPaginatedExpenses, accessToken, page, perPage);
    yield put(fetchExpensesSuccess(response.data));
  } catch(e) {
    yield put(fetchExpensesFailure(e.response.data));
  }
}

export function* watchFetchExpensesRequest() {
  yield takeEvery(FETCH_EXPENSES_REQUEST, fetchExpenses);
}

export function* createExpense(action) {
  const { body } = action;
  const requestBody = {
    expense: {
      on_date: new Date(body.onDate || null),
      currency_id: body.currencyId || null,
      amount: body.amount || null,
      desc: body.desc || null
    }
  };
  const { accessToken } = yield select(getApiToken);
  try {
    const response = yield call(createExpenseAPI, accessToken, requestBody);
    yield put(createExpenseSuccess(response.data.data));
  } catch (e) {
    yield put(createExpenseFailure(e.response.data));
  }
}

export function* watchCreateExpenseRequest() {
  yield takeEvery(CREATE_EXPENSE_REQUEST, createExpense);
}
