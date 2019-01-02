export const FETCH_CURRENCIES_REQUEST = 'FETCH_CURRENCIES_REQUEST';
export const FETCH_CURRENCIES_SUCCESS = 'FETCH_CURRENCIES_SUCCESS';
export const FETCH_CURRENCIES_FAILURE = 'FETCH_CURRENCIES_FAILURE';

export function fetchCurrenciesRequest(page = 1, perPage = 10) {
  return {
    type: FETCH_CURRENCIES_REQUEST,
    page,
    perPage
  };
}

export function fetchCurrenciesSuccess(body) {
  return {
    type: FETCH_CURRENCIES_SUCCESS,
    body
  };
}

export function fetchCurrenciesFailure(body) {
  return {
    type: FETCH_CURRENCIES_FAILURE,
    body
  };
}
