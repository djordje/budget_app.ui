import { call, put, takeEvery } from 'redux-saga/effects';

import * as apiTokenSagas from './apiTokenSagas';
import {
  obtainApiToken,
  refreshApiToken
} from '../../services/http/budgetAppAPI/requests/apiToken'
import {
  obtainApiTokenSuccess,
  obtainApiTokenFailure,
  refreshApiTokenSuccess,
  refreshApiTokenFailure,
  OBTAIN_API_TOKEN_REQUEST,
  REFRESH_API_TOKEN_REQUEST
} from '../actions/apiTokenActions';
import { writeApiTokenToLocalStorage } from '../../services/localStorage';

describe('apiTokenSagas', () => {
  describe('obtainApiToken', () => {
    const action = {
      email: 'test@example.com',
      password: '1234'
    };
    const generator = apiTokenSagas.obtainApiToken(action);

    it('is generator fn', () => {
      expect(generator.value).toBeUndefined();
      expect(generator.done).toBeFalsy();
    });

    it('prepares API call', () => {
      const { email, password } = action;
      expect(generator.next().value).toEqual(call(obtainApiToken, email, password));
    });

    it('prepares call to write to local storage', () => {
      const response = { status: 201, data: {} };
      expect(generator.next(response).value).toEqual(call(writeApiTokenToLocalStorage, response.data));
    });

    it('puts obtain api token success action', () => {
      const response = { status: 201, data: {} };
      expect(generator.next(response).value).toEqual(put(obtainApiTokenSuccess(response.data)));
    });

    it('puts obtain api token failure action', () => {
      const e = new Error('error');
      expect(generator.throw(e).value).toEqual(put(obtainApiTokenFailure(e.message)));
    });
  });

  describe('watchObtainApiTokenRequest', () => {
    const generator = apiTokenSagas.watchObtainApiTokenRequest();

    it('is generator fn', () => {
      expect(generator.value).toBeUndefined();
      expect(generator.done).toBeFalsy();
    });

    it('takes every OBTAIN_API_TOKEN_REQUEST', () => {
      expect(generator.next().value).toEqual(
        takeEvery(OBTAIN_API_TOKEN_REQUEST, apiTokenSagas.obtainApiToken)
      );
    });
  });

  describe('refreshApiToken', () => {
    const action = {
      accessToken: 'access-token-1',
      refreshToken: 'refresh-token-1'
    };
    const generator = apiTokenSagas.refreshApiToken(action);

    it('is generator fn', () => {
      expect(generator.value).toBeUndefined();
      expect(generator.done).toBeFalsy();
    });

    it('prepares API call', () => {
      const { accessToken, refreshToken } = action;
      expect(generator.next().value).toEqual(call(refreshApiToken, accessToken, refreshToken));
    });

    it('prepares call to write to local storage', () => {
      const response = { status: 201, data: {} };
      expect(generator.next(response).value).toEqual(call(writeApiTokenToLocalStorage, response.data));
    });

    it('puts obtain api token success action', () => {
      const response = { status: 201, data: {} };
      expect(generator.next(response).value).toEqual(put(refreshApiTokenSuccess(response.data)));
    });

    it('puts obtain api token failure action', () => {
      const e = new Error('error');
      expect(generator.throw(e).value).toEqual(put(refreshApiTokenFailure(e.message)));
    });
  });

  describe('watchRefreshApiTokenRequest', () => {
    const generator = apiTokenSagas.watchRefreshApiTokenRequest();

    it('is generator fn', () => {
      expect(generator.value).toBeUndefined();
      expect(generator.done).toBeFalsy();
    });

    it('takes every REFRESH_API_TOKEN_REQUEST', () => {
      expect(generator.next().value).toEqual(
        takeEvery(REFRESH_API_TOKEN_REQUEST, apiTokenSagas.refreshApiToken)
      );
    });
  });
});
