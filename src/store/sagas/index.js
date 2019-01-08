import { all, call } from 'redux-saga/effects';

import {
  watchObtainApiTokenRequest,
  watchRefreshApiTokenRequest
} from './apiTokenSagas';
import { watchFetchCurrenciesRequest } from './currenciesSagas';
import { watchCreateExpenseRequest, watchFetchExpensesRequest } from './expensesSagas';
import { watchCreateIncomeRequest, watchFetchIncomesRequest } from './incomesSagas';

export default function* rootSage() {
  yield all([
    call(watchObtainApiTokenRequest),
    call(watchRefreshApiTokenRequest),
    call(watchFetchCurrenciesRequest),
    call(watchFetchExpensesRequest),
    call(watchCreateExpenseRequest),
    call(watchFetchIncomesRequest),
    call(watchCreateIncomeRequest)
  ]);
}
