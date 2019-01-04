import { takeEvery } from 'redux-saga/effects';
import * as expensesSagas from './expensesSagas';
import {
  FETCH_EXPENSES_REQUEST,
  CREATE_EXPENSE_REQUEST
} from '../actions/expensesActions';

describe('expensesSagas', () => {
  describe('watchFetchExpensesRequest', () => {
    const generator = expensesSagas.watchFetchExpensesRequest();

    it('is generator fn', () => {
      expect(generator.value).toBeUndefined();
      expect(generator.done).toBeFalsy();
    });


    it('takes every FETCH_EXPENSES_REQUEST', () => {
      expect(generator.next().value).toEqual(
        takeEvery(FETCH_EXPENSES_REQUEST, expensesSagas.fetchExpenses)
      );
    });
  });

  describe('watchCreateExpenseRequest', () => {
    const generator = expensesSagas.watchCreateExpenseRequest();

    it('is generator fn', () => {
      expect(generator.value).toBeUndefined();
      expect(generator.done).toBeFalsy();
    });

    it('takes every CREATE_EXPENSE_REQUEST', () => {
      expect(generator.next().value).toEqual(
        takeEvery(CREATE_EXPENSE_REQUEST, expensesSagas.createExpense)
      );
    });
  });
});
