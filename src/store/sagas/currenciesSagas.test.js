import { takeEvery } from 'redux-saga/effects';
import * as currenciesSagas from './currenciesSagas';
import { FETCH_CURRENCIES_REQUEST } from '../actions/currenciesActions';

describe('currenciesSagas', () => {
  describe('watchFetchCurrenciesRequest', () => {
    const generator = currenciesSagas.watchFetchCurrenciesRequest();

    it('is generator fn', () => {
      expect(generator.value).toBeUndefined();
      expect(generator.done).toBeFalsy();
    });

    it('takes every FETCH_CURRENCIES_REQUEST', () => {
      expect(generator.next().value).toEqual(
        takeEvery(FETCH_CURRENCIES_REQUEST, currenciesSagas.fetchCurrencies)
      );
    });
  });
});
