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

export const CREATE_EXPENSE_REQUEST = 'CREATE_EXPENSE_REQUEST';
export const CREATE_EXPENSE_SUCCESS = 'CREATE_EXPENSE_SUCCESS';
export const CREATE_EXPENSE_FAILURE = 'CREATE_EXPENSE_FAILURE';

export function createExpenseRequest(requestBody) {
  return {
    type: CREATE_EXPENSE_REQUEST,
    body: requestBody
  };
}

export function createExpenseSuccess(body) {
  return {
    type: CREATE_EXPENSE_SUCCESS,
    body
  };
}

export function createExpenseFailure(body) {
  return {
    type: CREATE_EXPENSE_FAILURE,
    body
  };
}
