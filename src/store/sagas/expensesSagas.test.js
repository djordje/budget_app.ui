import { call, put, select, takeEvery } from 'redux-saga/effects';
import * as expensesSagas from './expensesSagas';
import {
  getPaginatedExpenses,
  createExpense
} from '../../services/http/budgetAppAPI/requests/expenses';
import {
  fetchExpensesSuccess,
  fetchExpensesFailure,
  FETCH_EXPENSES_REQUEST,
  CREATE_EXPENSE_REQUEST, createExpenseFailure, createExpenseSuccess
} from '../actions/expensesActions';
import { getApiToken } from '../selectors/apiTokenSelector';

describe('expensesSagas', () => {
  describe('fetchExpenses', () => {
    const token = 'access-token-1';
    const action = { page: 1, perPage: 10 };
    const generator = expensesSagas.fetchExpenses(action);

    it('is generator fn', () => {
      expect(generator.value).toBeUndefined();
      expect(generator.done).toBeFalsy();
    });

    it('selects apiToken.accessToken from the store', () => {
      expect(generator.next().value).toEqual(
        select(getApiToken)
      );
    });

    it('calls api request', () => {
      const apiToken = { accessToken: token };
      expect(generator.next(apiToken).value).toEqual(
        call(getPaginatedExpenses, token, action.page, action.perPage)
      );
    });

    it('puts fetch expenses success action', () => {
      const response = { status: 200, data: {} };
      expect(generator.next(response).value).toEqual(
        put(fetchExpensesSuccess(response.data))
      );
    });

    it('puts fetch expenses failure action', () => {
      const e = { response: { data: {} } };
      expect(generator.throw(e).value).toEqual(
        put(fetchExpensesFailure(e.response.data))
      );
    });
  });

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


  describe('createExpense', () => {
    const token = 'access-token-1';
    const action = {
      body: {
        expense: {
          onDate: '2019-01-03',
          currencyId: 1,
          amount: 10,
          desc: 'Test'
        }
      }
    };
    const generator = expensesSagas.createExpense(action);

    it('is generator fn', () => {
      expect(generator.value).toBeUndefined();
      expect(generator.done).toBeFalsy();
    });

    it('selects apiToken.accessToken from the store', () => {
      expect(generator.next().value).toEqual(
        select(getApiToken)
      );
    });

    it('calls api request', () => {
      const apiToken = { accessToken: token };
      expect(generator.next(apiToken).value).toEqual(
        call(createExpense, token, {
          expense: {
            on_date: new Date('1970-01-01'),
            currency_id: null,
            amount: null,
            desc: null
          }
        })
      );
    });

    it('puts fetch expenses success action', () => {
      const response = { status: 200, data: {} };
      expect(generator.next(response).value).toEqual(
        put(createExpenseSuccess(undefined))
      );
    });

    it('puts fetch expenses failure action', () => {
      const e = { response: { data: {} } };
      expect(generator.throw(e).value).toEqual(
        put(createExpenseFailure(e.response.data))
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
