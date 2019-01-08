import { takeEvery } from 'redux-saga/effects';
import { generateProtectedApiCallSaga } from '../utils/protectedApiCallSaga';
import {
  getPaginatedIncomes,
  createIncome as createIncomeAPI
} from '../../services/http/budgetAppAPI/requests/incomes';
import {
  FETCH_INCOMES_REQUEST,
  fetchIncomesFailure,
  fetchIncomesSuccess,
  CREATE_INCOME_REQUEST,
  createIncomeSuccess,
  createIncomeFailure
} from '../actions/incomesActions';

export const fetchIncomes = generateProtectedApiCallSaga(
  getPaginatedIncomes,
  action => ([action.page, action.perPage]),
  fetchIncomesSuccess,
  fetchIncomesFailure
);

export function* watchFetchIncomesRequest() {
  yield takeEvery(FETCH_INCOMES_REQUEST, fetchIncomes);
}

export const createIncome = generateProtectedApiCallSaga(
  createIncomeAPI,
  action => ([
    {
      income: {
        on_date: new Date(action.body.onDate || null),
        for_date: new Date(action.body.forDate || null),
        currency_id: action.body.currencyId || null,
        amount: action.body.amount || null,
        desc: action.body.desc || null
      }
    }
  ]),
  createIncomeSuccess,
  createIncomeFailure
);

export function* watchCreateIncomeRequest() {
  yield takeEvery(CREATE_INCOME_REQUEST, createIncome);
}
