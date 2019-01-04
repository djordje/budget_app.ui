import { call, put, select, take } from 'redux-saga/effects';
import { getApiToken } from '../selectors/apiTokenSelector';
import {
  OBTAIN_API_TOKEN_SUCCESS,
  REFRESH_API_TOKEN_SUCCESS,
  refreshApiTokenRequest
} from '../actions/apiTokenActions';

/**
 * Creates saga generator function that will handle:
 *   - Selecting apiToken from the store and using access and refresh tokens
 *   - Waiting for apiToken to be loaded
 *   - Executing `apiCallFn` function and passing params returned by `extractParamsFromActionFn`
 *   - Calling `successActionFn` with response.data
 *   - In case of error with status 401 this saga handles token refreshing and retrying call, unless retry has been disabled
 *   - Calling `failureActionFn` with `e.response.data`
 *
 * @param {Function} apiCallFn - function that wraps async call to the API
 * @param {Function} extractParamsFromActionFn - receives action and must return array which will be passed to apiCallFn
 * @param {Function} successActionFn - store action creator function
 * @param {Function} failureActionFn - store action creator function
 * @param {Boolean} retry
 * @return {GeneratorFunction}
 */
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
