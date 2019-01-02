import { call, put, select, takeEvery } from 'redux-saga/effects';
import {
  FETCH_EXPENSES_REQUEST,
  fetchExpensesSuccess,
  fetchExpensesFailure
} from '../actions/expensesActions';
import { getPaginatedExpenses } from '../../services/http/budgetAppAPI/requests/expenses';
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
