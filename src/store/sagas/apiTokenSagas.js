import { call, put, takeEvery } from 'redux-saga/effects';
import {
  obtainApiToken as getApiToken,
  refreshApiToken as updateApiToken
} from '../../services/http/budgetAppAPI/requests/apiToken';
import {
  obtainApiTokenFailure,
  obtainApiTokenSuccess,
  refreshApiTokenSuccess,
  refreshApiTokenFailure,
  OBTAIN_API_TOKEN_REQUEST,
  REFRESH_API_TOKEN_REQUEST
} from '../actions/apiTokenActions';
import { writeApiTokenToLocalStorage } from '../../services/localStorage';

export function* obtainApiToken(action) {
  const { email, password } = action;

  try {
    const response = yield call(getApiToken, email, password);
    yield call(writeApiTokenToLocalStorage, response.data);
    yield put(obtainApiTokenSuccess(response.data));
  } catch(e) {
    yield put(obtainApiTokenFailure(e.message));
  }
}

export function* watchObtainApiTokenRequest() {
  yield takeEvery(OBTAIN_API_TOKEN_REQUEST, obtainApiToken);
}

export function* refreshApiToken(action) {
  const { accessToken, refreshToken } = action;

  try {
    const response = yield call(updateApiToken, accessToken, refreshToken);
    yield call(writeApiTokenToLocalStorage, response.data);
    yield put(refreshApiTokenSuccess(response.data));
  } catch(e) {
    yield put(refreshApiTokenFailure(e.message));
  }
}

export function* watchRefreshApiTokenRequest() {
  yield takeEvery(REFRESH_API_TOKEN_REQUEST, refreshApiToken);
}
