export const OBTAIN_API_TOKEN_REQUEST = 'OBTAIN_API_TOKEN_REQUEST';
export const OBTAIN_API_TOKEN_SUCCESS = 'OBTAIN_API_TOKEN_SUCCESS';
export const OBTAIN_API_TOKEN_FAILURE = 'OBTAIN_API_TOKEN_FAILURE';

export const REFRESH_API_TOKEN_REQUEST = 'REFRESH_API_TOKEN_REQUEST';
export const REFRESH_API_TOKEN_SUCCESS = 'REFRESH_API_TOKEN_SUCCESS';
export const REFRESH_API_TOKEN_FAILURE = 'REFRESH_API_TOKEN_FAILURE';

export function obtainApiTokenRequest(email, password) {
  return {
    type: OBTAIN_API_TOKEN_REQUEST,
    email,
    password
  };
}

export function obtainApiTokenSuccess(body) {
  return {
    type: OBTAIN_API_TOKEN_SUCCESS,
    body
  };
}

export function obtainApiTokenFailure(body) {
  return {
    type: OBTAIN_API_TOKEN_FAILURE,
    body
  };
}

export function refreshApiTokenRequest(accessToken, refreshToken) {
  return {
    type: REFRESH_API_TOKEN_REQUEST,
    accessToken,
    refreshToken
  };
}

export function refreshApiTokenSuccess(body) {
  return {
    type: REFRESH_API_TOKEN_SUCCESS,
    body
  };
}

export function refreshApiTokenFailure(body) {
  return {
    type: REFRESH_API_TOKEN_FAILURE,
    body
  };
}