import connection from '../requestConnection';

export function obtainApiToken(email, password) {
  return connection.post('/v1/api_token/obtain', {
    email,
    password
  });
}

export function refreshApiToken(accessToken, refreshToken) {
  return connection.post('/v1/api_token/refresh', {
    access_token: accessToken,
    refresh_token: refreshToken
  });
}