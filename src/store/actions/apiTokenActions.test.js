import {
  OBTAIN_API_TOKEN_REQUEST,
  OBTAIN_API_TOKEN_SUCCESS,
  OBTAIN_API_TOKEN_FAILURE,
  REFRESH_API_TOKEN_REQUEST,
  REFRESH_API_TOKEN_SUCCESS,
  REFRESH_API_TOKEN_FAILURE,
  obtainApiTokenRequest,
  obtainApiTokenSuccess,
  obtainApiTokenFailure,
  refreshApiTokenRequest,
  refreshApiTokenSuccess,
  refreshApiTokenFailure
} from './apiTokenActions';

describe('obtainApiTokenRequest', () => {
  it('returns type, email and password', () => {
    const email = 'test@example.com';
    const password = 'password';
    const action = obtainApiTokenRequest(email, password);
    expect(action).toEqual({
      type: OBTAIN_API_TOKEN_REQUEST,
      email,
      password
    });
  });
});

describe('obtainApiTokenSuccess', () => {
  it('returns type and body', () => {
    const body = {};
    const action = obtainApiTokenSuccess(body);
    expect(action).toEqual({
      type: OBTAIN_API_TOKEN_SUCCESS,
      body
    });
  });
});

describe('obtainApiTokenFailure', () => {
  it('returns type and body', () => {
    const body = {};
    const action = obtainApiTokenFailure(body);
    expect(action).toEqual({
      type: OBTAIN_API_TOKEN_FAILURE,
      body
    });
  });
});

describe('refreshApiTokenRequest', () => {
  it('returns type, acccess and refresah tokens', () => {
    const accessToken = 'access-token';
    const refreshToken = 'refresh-token';
    const action = refreshApiTokenRequest(accessToken, refreshToken);
    expect(action).toEqual({
      type: REFRESH_API_TOKEN_REQUEST,
      accessToken,
      refreshToken
    });
  });
});

describe('refreshApiTokenSuccess', () => {
  it('returns type and body', () => {
    const body = {};
    const action = refreshApiTokenSuccess(body);
    expect(action).toEqual({
      type: REFRESH_API_TOKEN_SUCCESS,
      body
    });
  });
});

describe('refreshApiTokenFailure', () => {
  it('returns type and body', () => {
    const body = {};
    const action = refreshApiTokenFailure(body);
    expect(action).toEqual({
      type: REFRESH_API_TOKEN_FAILURE,
      body
    });
  });
});
