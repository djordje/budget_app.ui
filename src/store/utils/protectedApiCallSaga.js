import { call, put, select, take } from 'redux-saga/effects';
import { getApiToken } from '../selectors/apiTokenSelector';
import {
  OBTAIN_API_TOKEN_SUCCESS,
  REFRESH_API_TOKEN_SUCCESS,
  refreshApiTokenRequest
} from '../actions/apiTokenActions';

export function generateProtectedApiCallSaga(apiCallFn, extractParamsFromActionFn, successActionFn, failureActionFn, retry = true) {
  return function* protectedApiCallSaga(action, r = retry) {
    let apiToken;
    try {
      apiToken = yield select(getApiToken);

      if (apiToken.loading) {
        yield take([
          OBTAIN_API_TOKEN_SUCCESS,
          REFRESH_API_TOKEN_SUCCESS
        ]);
        apiToken = yield select(getApiToken);
      }

      const apiCallParams = yield call(extractParamsFromActionFn, action);
      const response = yield call(apiCallFn, apiToken.accessToken, ...apiCallParams);
      yield put(successActionFn(response.data));
    } catch (e) {
      if (r && e.response.status === 401 && apiToken.loaded) {
        apiToken = yield select(getApiToken);
        if (!apiToken.loading) {
          yield put(refreshApiTokenRequest(apiToken.accessToken, apiToken.refreshToken));
        }
        yield call(protectedApiCallSaga, action, false)
      }
      else {
        yield put(failureActionFn(e.response.data));
      }
    }
  }
}
