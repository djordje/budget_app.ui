import expensesReducer from './expensesReducers';
import {
  fetchExpensesSuccess,
  fetchExpensesFailure,
  fetchExpensesRequest
} from '../actions/expensesActions';

describe('expensesReducer', () => {
  const currencyRequest = { id: 1, name: 'Serbian dinar', iso_code: 'RSD' };
  const currencyResponse = { id: 1, name: 'Serbian dinar', isoCode: 'RSD' };
  const state = {
    loading: false,
    data: [],
    pageNumber: null,
    pageSize: null,
    totalEntries: null,
    totalPages: null
  };

  it('sets loading flag on FETCH_EXPENSE_REQUEST', () => {
    const action = fetchExpensesRequest(1, 10);
    expect(expensesReducer(state, action))
      .toEqual({ ...state, loading: true });
  });

  it('merges results on FETCH_EXPENSES_SUCCESS', () => {
    const action = fetchExpensesSuccess({
      data: [
        { id: 1, amount: 10.0, on_date: '2018-03-15T12:00:00:00.000Z', desc: 'example 1', currency: currencyRequest },
        { id: 2, amount: 10.0, on_date: '2018-03-17T12:00:00:00.000Z', desc: 'example 2', currency: currencyRequest }
      ],
      page_number: 1,
      page_size: 10,
      total_entries: 2,
      total_pages: 1
    });
    expect(expensesReducer(state, action))
      .toEqual({
        loading: false,
        data: [
          { id: 1, amount: 10.0, onDate: '2018-03-15T12:00:00:00.000Z', desc: 'example 1', currency: currencyResponse },
          { id: 2, amount: 10.0, onDate: '2018-03-17T12:00:00:00.000Z', desc: 'example 2', currency: currencyResponse }
        ],
        pageNumber: 1,
        pageSize: 10,
        totalEntries: 2,
        totalPages: 1,
      });
  });

  it('returns state on FETCH_EXPENSES_FAILURE', () => {
    const action = fetchExpensesFailure({});
    const currentState = { ...state, loading: true };
    expect(expensesReducer(currentState, action))
      .toEqual({ ...currentState, loading: false });
  });

  it('returns state unless action type has been recognized', () => {
    const action = { type: undefined };
    expect(expensesReducer(state, action)).toEqual(state);
  });
});
