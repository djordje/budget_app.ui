import {
  FETCH_EXPENSES_REQUEST,
  FETCH_EXPENSES_SUCCESS,
  FETCH_EXPENSES_FAILURE,
  fetchExpensesRequest,
  fetchExpensesSuccess,
  fetchExpensesFailure
} from './expensesActions';

describe('fetchExpensesRequest', () => {
  it('returns type, page and perPage', () => {
    const action = fetchExpensesRequest(1, 10);
    expect(action).toEqual({
      type: FETCH_EXPENSES_REQUEST,
      page: 1,
      perPage: 10
    });
  });
});

describe('fetchExpensesSuccess', () => {
  it('returns type and response body', () => {
    const response = {};
    const action = fetchExpensesSuccess(response);
    expect(action).toEqual({
      type: FETCH_EXPENSES_SUCCESS,
      body: response
    })
  });
});

describe('fetchExpensesFailure', () => {
  it('returns type and response body', () => {
    const response = {};
    const action = fetchExpensesFailure(response);
    expect(action).toEqual({
      type: FETCH_EXPENSES_FAILURE,
      body: response
    })
  });
});
