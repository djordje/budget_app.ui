import { takeEvery } from 'redux-saga/effects';
import * as incomesSagas from './incomesSagas';
import { CREATE_INCOME_REQUEST, FETCH_INCOMES_REQUEST } from '../actions/incomesActions';

describe('incomesSagas', () => {
  describe('watchFetchIncomesRequest', () => {
    const gn = incomesSagas.watchFetchIncomesRequest();

    it('takes every FETCH_INCOMES_REQUEST', () => {
      expect(gn.next().value).toEqual(
        takeEvery(FETCH_INCOMES_REQUEST, incomesSagas.fetchIncomes)
      );
    });
  });

  describe('watchCreateIncomeRequest', () => {
    const gn = incomesSagas.watchCreateIncomeRequest();

    it('takes every CREATE_INCOME_REQUEST', () => {
      expect(gn.next().value).toEqual(
        takeEvery(CREATE_INCOME_REQUEST, incomesSagas.createIncome)
      );
    });
  });
});
