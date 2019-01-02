export const FETCH_EXPENSES_REQUEST = 'FETCH_EXPENSES_REQUEST';
export const FETCH_EXPENSES_SUCCESS = 'FETCH_EXPENSES_SUCCESS';
export const FETCH_EXPENSES_FAILURE = 'FETCH_EXPENSES_FAILURE';

export function fetchExpensesRequest(page = 1, perPage = 10) {
  return {
    type: FETCH_EXPENSES_REQUEST,
    page,
    perPage
  };
}

export function fetchExpensesSuccess(body) {
  return {
    type: FETCH_EXPENSES_SUCCESS,
    body
  };
}

export function fetchExpensesFailure(body) {
  return {
    type: FETCH_EXPENSES_FAILURE,
    body
  };
}