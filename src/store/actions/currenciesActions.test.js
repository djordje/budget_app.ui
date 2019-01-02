import {
  FETCH_CURRENCIES_REQUEST,
  FETCH_CURRENCIES_SUCCESS,
  FETCH_CURRENCIES_FAILURE,
  fetchCurrenciesRequest,
  fetchCurrenciesSuccess,
  fetchCurrenciesFailure
} from './currenciesActions';

describe('fetchCurrenciesRequest', () => {
  it('returns type, page and perPage', () => {
    const action = fetchCurrenciesRequest(1, 10);
    expect(action).toEqual({
      type: FETCH_CURRENCIES_REQUEST,
      page: 1,
      perPage: 10
    })
  });
});

describe('fetchCurrenciesSuccess', () => {
  it('returns type and response body', () => {
    const response = {};
    const action = fetchCurrenciesSuccess(response);
    expect(action).toEqual({
      type: FETCH_CURRENCIES_SUCCESS,
      body: response
    })
  });
});

describe('fetchCurrenciesFailure', () => {
  it('returns type and response body', () => {
    const response = {};
    const action = fetchCurrenciesFailure(response);
    expect(action).toEqual({
      type: FETCH_CURRENCIES_FAILURE,
      body: response
    })
  });
});
