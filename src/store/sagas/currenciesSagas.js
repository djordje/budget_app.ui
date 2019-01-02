import { call, select, put, takeEvery } from 'redux-saga/effects';
import {
  FETCH_CURRENCIES_REQUEST,
  fetchCurrenciesSuccess,
  fetchCurrenciesFailure
} from '../actions/currenciesActions';
import { getPaginatedCurrencies } from '../../services/http/budgetAppAPI/requests/currencies';
import { getApiToken } from '../selectors/apiTokenSelector';

export function* fetchCurrencies(action) {
  const { page = 1, perPage = 10 } = action;
  const { accessToken } = yield select(getApiToken);
  try {
    const response = yield call(getPaginatedCurrencies, accessToken, page, perPage);
    yield put(fetchCurrenciesSuccess(response.data))
  } catch (e) {
    yield put(fetchCurrenciesFailure(e.message))
  }
}

export function* watchFetchCurrenciesRequest() {
  yield takeEvery(FETCH_CURRENCIES_REQUEST, fetchCurrencies);
}
