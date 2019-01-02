import { call, put, select, takeEvery } from 'redux-saga/effects';
import * as currenciesSagas from './currenciesSagas';
import { getPaginatedCurrencies } from '../../services/http/budgetAppAPI/requests/currencies';
import {
  FETCH_CURRENCIES_REQUEST,
  fetchCurrenciesSuccess,
  fetchCurrenciesFailure
} from '../actions/currenciesActions';
import { getApiToken } from '../selectors/apiTokenSelector';

describe('currenciesSagas', () => {
  describe('fetchCurrencies', () => {
    const generator = currenciesSagas.fetchCurrencies({});
    const token = 'access-token-1';

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
      expect(generator.next(apiToken).value).toEqual(call(getPaginatedCurrencies, token, 1, 10));
    });

    it('puts fetch currencies success action', () => {
      const response = { status: 200, data: {} };
      expect(generator.next(response).value).toEqual(put(fetchCurrenciesSuccess(response.data)));
    });

    it('puts fetch currencies failure action', () => {
      const e = new Error('error');
      expect(generator.throw(e).value).toEqual(put(fetchCurrenciesFailure(e.message)));
    });
  });

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
