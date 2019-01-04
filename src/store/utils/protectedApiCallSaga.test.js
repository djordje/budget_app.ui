import { call, put, select, take } from 'redux-saga/effects';

import { generateProtectedApiCallSaga } from './protectedApiCallSaga';
import { getApiToken } from '../selectors/apiTokenSelector';
import {
  OBTAIN_API_TOKEN_SUCCESS,
  REFRESH_API_TOKEN_SUCCESS,
  refreshApiTokenRequest
} from '../actions/apiTokenActions';

describe('protectedApiCallSaga', () => {
  function execApiCall(token, page, perPage) {}
  function extractParamsFromAction(action) {
    return [action.page, action.perPage];
  }
  function createSuccessAction(data) {
    return {
      type: 'TEST_API_SUCCESS',
      data
    };
  }
  function createFailureAction(data) {
    return {
      type: 'TEST_API_FAILURE',
      data
    };
  }
  const action = {
    type: 'TEST_API_REQUEST',
    page: 1,
    perPage: 10
  };
  const protectedApiCallSaga = generateProtectedApiCallSaga(
    execApiCall,
    extractParamsFromAction,
    createSuccessAction,
    createFailureAction
  );

  describe('scenario when api token is loaded and API responds with success', () => {
    const gn = protectedApiCallSaga(action);
    const apiToken = {
      loading: false,
      loaded: true,
      accessToken: 'access-token-1'
    };

    it('selects apiToken from the store', () => {
      expect(gn.next().value).toEqual(select(getApiToken));
    });

    it('extracts params from action using given function', () => {
      expect(gn.next(apiToken).value).toEqual(call(extractParamsFromAction, action));
    });

    it('execs API call', () => {
      const apiCallParams = [action.page, action.perPage];
      expect(gn.next(apiCallParams).value).toEqual(
        call(execApiCall, apiToken.accessToken, action.page, action.perPage)
      );
    });

    it('calls success action creator on success', () => {
      const res = {
        data: {}
      };
      expect(gn.next(res).value).toEqual(put(createSuccessAction(res.data)))
    });
  });

  describe('scenario when api token is loading and API responds with success', () => {
    const gn = protectedApiCallSaga(action);
    const apiToken = {
      loading: true,
      loaded: true,
      accessToken: 'access-token-1'
    };

    it('selects apiToken from the store', () => {
      expect(gn.next().value).toEqual(select(getApiToken));
    });

    it('waits for successful obtain or refresh event', () => {
      expect(gn.next(apiToken).value).toEqual(
        take([
          OBTAIN_API_TOKEN_SUCCESS,
          REFRESH_API_TOKEN_SUCCESS
        ])
      );
    });

    it('reloads apiToken from the store', () => {
      expect(gn.next().value).toEqual(select(getApiToken));
    });


    it('extracts params from action using given function', () => {
      expect(gn.next(apiToken).value).toEqual(call(extractParamsFromAction, action));
    });

    it('execs API call', () => {
      const apiCallParams = [action.page, action.perPage];
      expect(gn.next(apiCallParams).value).toEqual(
        call(execApiCall, apiToken.accessToken, action.page, action.perPage)
      );
    });

    it('calls success action creator', () => {
      const res = {
        data: {}
      };
      expect(gn.next(res).value).toEqual(put(createSuccessAction(res.data)))
    });
  });

  describe('scenario when retry is enabled and API responds with error 401 and token has been loaded but refresh is not in progress', () => {
    const gn = protectedApiCallSaga(action);
    const e = { response: { data: {}, status: 401 } };
    const apiToken = {
      loading: false,
      loaded: true,
      accessToken: 'access-token-1',
      refreshToken: 'refresh-token-1'
    };

    // enter try catch block
    gn.next();
    gn.next(apiToken);

    it('selects apiToken from the store', () => {
      expect(gn.throw(e).value).toEqual(select(getApiToken));
    });

    it('requests token refresh', () => {
      expect(gn.next(apiToken).value).toEqual(
        put(refreshApiTokenRequest(apiToken.accessToken, apiToken.refreshToken))
      );
    });

    it('calls saga again and disables further retries', () => {
      expect(gn.next().value).toEqual(call(protectedApiCallSaga, action, false))
    });
  });

  describe('scenario when retry is enabled and API responds with error 401 and token has been loaded but refreshing is in progress', () => {
    const gn = protectedApiCallSaga(action);
    const e = { response: { data: {}, status: 401 } };
    const apiToken = {
      loading: true,
      loaded: true,
      accessToken: 'access-token-1',
      refreshToken: 'refresh-token-1'
    };

    // enter try catch block
    gn.next();
    gn.next(apiToken);

    it('selects apiToken from the store', () => {
      expect(gn.throw(e).value).toEqual(select(getApiToken));
    });

    it('calls saga again and disables further retries', () => {
      expect(gn.next(apiToken).value).toEqual(call(protectedApiCallSaga, action, false))
    });
  });

  describe('scenario when retry is disables and API responds with error 401', () => {
    const gn = protectedApiCallSaga(action, false);
    const e = { response: { data: {}, status: 401 } };
    const apiToken = {
      loading: false,
      loaded: true,
      accessToken: 'access-token-1',
      refreshToken: 'refresh-token-1'
    };

    // enter try catch block
    gn.next();
    gn.next(apiToken);

    it('calls failure action creator', () => {
      expect(gn.throw(e).value).toEqual(put(createFailureAction(e.response.data)));
    });
  });

  describe('scenario when API responds with any error except 401', () => {
    const gn = protectedApiCallSaga(action);
    const e = { response: { data: {}, status: 403 } };
    const apiToken = {
      loading: false,
      loaded: true,
      accessToken: 'access-token-1',
      refreshToken: 'refresh-token-1'
    };

    // enter try catch block
    gn.next();
    gn.next(apiToken);

    it('calls failure action creator', () => {
      expect(gn.throw(e).value).toEqual(put(createFailureAction(e.response.data)));
    });
  });
});
