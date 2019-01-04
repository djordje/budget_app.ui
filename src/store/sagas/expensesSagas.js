import { takeEvery } from 'redux-saga/effects';
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
import { generateProtectedApiCallSaga } from '../utils/protectedApiCallSaga';

export const fetchExpenses = generateProtectedApiCallSaga(
  getPaginatedExpenses,
  action => ([action.page, action.perPage]),
  fetchExpensesSuccess,
  fetchExpensesFailure
);

export function* watchFetchExpensesRequest() {
  yield takeEvery(FETCH_EXPENSES_REQUEST, fetchExpenses);
}

export const createExpense = generateProtectedApiCallSaga(
  createExpenseAPI,
  action => ([
    {
      expense: {
        on_date: new Date(action.body.onDate || null),
        currency_id: action.body.currencyId || null,
        amount: action.body.amount || null,
        desc: action.body.desc || null
      }
    }
  ]),
  createExpenseSuccess,
  createExpenseFailure
);

export function* watchCreateExpenseRequest() {
  yield takeEvery(CREATE_EXPENSE_REQUEST, createExpense);
}
