import currenciesReducers from './currenciesReducers';
import {
  fetchCurrenciesRequest,
  fetchCurrenciesSuccess,
  fetchCurrenciesFailure
} from '../actions/currenciesActions';

describe('currenciesReducers', () => {
  const state = {
    loading: false,
    data: [],
    hasMore: true,
    lastPage: null
  };

  it('sets loading flag on FETCH_CURRENCIES_REQUEST', () => {
    const action = fetchCurrenciesRequest(1, 10);
    expect(currenciesReducers(state, action))
      .toEqual({
        loading: true,
        data: [],
        hasMore: true,
        lastPage: null
      });
  });

  it('merges results on FETCH_CURRENCIES_SUCCESS', () => {
    const successResponse = {
      data: [
        { id: 1, name: 'Serbian dinar', iso_code: 'RSD' },
        { id: 2, name: 'Euro', iso_code: 'EUR' }
      ],
      page_number: 1,
      page_size: 10,
      total_entries: 2,
      total_pages: 1
    };
    const action = fetchCurrenciesSuccess(successResponse);
    const currentState = { ...state, data: [
      { id: 1, name: 'Serbian dinar', isoCode: 'RSD' }
    ] };
    expect(currenciesReducers(currentState, action))
      .toEqual({
        loading: false,
        data: [
          { id: 1, name: 'Serbian dinar', isoCode: 'RSD' },
          { id: 2, name: 'Euro', isoCode: 'EUR' }
        ],
        hasMore: false,
        lastPage: 1
      });
  });

  it('returns state on FETCH_CURRENCIES_FAILURE', () => {
    const action = fetchCurrenciesFailure({});
    const currentState = { ...state, loading: true, data: [
      { id: 1, name: 'Serbian dinar', isoCode: 'RSD' }
    ] };
    expect(currenciesReducers(currentState, action))
      .toEqual({
        loading: false,
        data: [
          { id: 1, name: 'Serbian dinar', isoCode: 'RSD' }
        ],
        hasMore: false,
        lastPage: null
      })
  });

  it('returns state unless action type has been recognized', () => {
    const action = { type: undefined };
    expect(currenciesReducers(state, action))
      .toEqual({
        loading: false,
        data: [],
        hasMore: true,
        lastPage: null
      });
  });
});
