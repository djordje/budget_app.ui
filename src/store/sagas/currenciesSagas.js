import { takeEvery } from 'redux-saga/effects';
import {
  FETCH_CURRENCIES_REQUEST,
  fetchCurrenciesSuccess,
  fetchCurrenciesFailure
} from '../actions/currenciesActions';
import { getPaginatedCurrencies } from '../../services/http/budgetAppAPI/requests/currencies';
import { generateProtectedApiCallSaga } from '../utils/protectedApiCallSaga';

export const fetchCurrencies = generateProtectedApiCallSaga(
  getPaginatedCurrencies,
  action => ([
    action.page,
    action.perPage
  ]),
  fetchCurrenciesSuccess,
  fetchCurrenciesFailure
);

export function* watchFetchCurrenciesRequest() {
  yield takeEvery(FETCH_CURRENCIES_REQUEST, fetchCurrencies);
}
