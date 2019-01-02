import {
  OBTAIN_API_TOKEN_REQUEST,
  REFRESH_API_TOKEN_REQUEST,
  OBTAIN_API_TOKEN_SUCCESS,
  REFRESH_API_TOKEN_SUCCESS,
  OBTAIN_API_TOKEN_FAILURE,
  REFRESH_API_TOKEN_FAILURE
} from '../actions/apiTokenActions';

const initialState = {
  loading: false,
  loaded: false,
  accessToken: null,
  refreshToken: null,
  expiresAt: null
};

export default function apiTokenReducer(state = initialState, action) {
  switch (action.type) {
  case OBTAIN_API_TOKEN_REQUEST:
  case REFRESH_API_TOKEN_REQUEST:
    return { ...state, loading: true };
  case OBTAIN_API_TOKEN_SUCCESS:
  case REFRESH_API_TOKEN_SUCCESS:
    let { data } = action.body;
    return {
      loading: false,
      loaded: true,
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresAt: data.expires_at
    };
  case OBTAIN_API_TOKEN_FAILURE:
  case REFRESH_API_TOKEN_FAILURE:
    return initialState;
  default:
    return state;
  }
}
