import { all, call } from 'redux-saga/effects';

import {
  watchObtainApiTokenRequest,
  watchRefreshApiTokenRequest
} from './apiTokenSagas';
import { watchFetchCurrenciesRequest } from './currenciesSagas';
import { watchFetchExpensesRequest } from './expensesSagas';

export default function* rootSage() {
  yield all([
    call(watchObtainApiTokenRequest),
    call(watchRefreshApiTokenRequest),
    call(watchFetchCurrenciesRequest),
    call(watchFetchExpensesRequest),
  ]);
}
