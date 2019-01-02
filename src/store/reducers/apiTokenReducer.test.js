import {
  obtainApiTokenRequest,
  obtainApiTokenSuccess,
  obtainApiTokenFailure,
  refreshApiTokenRequest,
  refreshApiTokenFailure,
  refreshApiTokenSuccess
} from '../actions/apiTokenActions';
import apiTokenReducer from './apiTokenReducer';

describe('apiTokenReducer', () => {
  const successResponse = {
    data: {
      access_token: 'access-token',
      refresh_token: 'refresh-token',
      expires_at: '2018-03-15T12:00:00.000Z'
    }
  };
  const state = {
    loading: false,
    loaded: true,
    accessToken: 'access-token-0',
    refreshToken: 'refresh-token-0',
    expiresAt: '2018-03-15T12:00:00.000Z'
  };

  it('updates loading flag on OBTAIN_API_TOKEN_REQUEST', () => {
    const action = obtainApiTokenRequest('test@example.com', 's3cr3t');
    expect(apiTokenReducer(undefined, action))
      .toEqual({
        loading: true,
        loaded: false,
        accessToken: null,
        refreshToken: null,
        expiresAt: null
      });
  });

  it('updates loading flag on REFRESH_API_TOKEN_REQUEST', () => {
    const action = refreshApiTokenRequest(state.accessToken, state.refreshToken);
    expect(apiTokenReducer(state, action))
      .toEqual({
        loading: true,
        loaded: true,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        expiresAt: state.expiresAt
      });
  });

  it('updates on OBTAIN_API_TOKEN_SUCCESS', () => {
    const action = obtainApiTokenSuccess(successResponse);
    expect(apiTokenReducer(undefined, action))
      .toEqual({
        loaded: true,
        loading: false,
        accessToken: successResponse.data.access_token,
        refreshToken: successResponse.data.refresh_token,
        expiresAt: successResponse.data.expires_at,
      });
  });

  it('returns updated state on REFRESH_API_TOKEN_SUCCESS', () => {
    const action = refreshApiTokenSuccess(successResponse);
    expect(apiTokenReducer(state, action))
      .toEqual({
        loaded: true,
        loading: false,
        accessToken: successResponse.data.access_token,
        refreshToken: successResponse.data.refresh_token,
        expiresAt: successResponse.data.expires_at,
      });
  });

  it('returns initial state on OBTAIN_API_TOKEN_FAILURE', () => {
    const action = obtainApiTokenFailure({});
    expect(apiTokenReducer(state, action))
      .toEqual({
        loading: false,
        loaded: false,
        accessToken: null,
        refreshToken: null,
        expiresAt: null
      });
  });

  it('returns initial state on REFRESH_API_TOKEN_FAILURE', () => {
    const action = refreshApiTokenFailure({});
    expect(apiTokenReducer(state, action))
      .toEqual({
        loading: false,
        loaded: false,
        accessToken: null,
        refreshToken: null,
        expiresAt: null
      });
  });

  it('returns state unless action type recognized', () => {
    const action = { type: undefined };
    expect(apiTokenReducer(undefined, action))
      .toEqual({
        loading: false,
        loaded: false,
        accessToken: null,
        refreshToken: null,
        expiresAt: null
      });
  });
});
