export const FETCH_INCOMES_REQUEST = 'FETCH_INCOMES_REQUEST';
export const FETCH_INCOMES_SUCCESS = 'FETCH_INCOMES_SUCCESS';
export const FETCH_INCOMES_FAILURE = 'FETCH_INCOMES_FAILURE';

export function fetchIncomesRequest(page = 1, perPage = 10) {
  return {
    type: FETCH_INCOMES_REQUEST,
    page,
    perPage
  };
}

export function fetchIncomesSuccess(body) {
  return {
    type: FETCH_INCOMES_SUCCESS,
    body
  };
}

export function fetchIncomesFailure(body) {
  return {
    type: FETCH_INCOMES_FAILURE,
    body
  };
}

export const CREATE_INCOME_REQUEST = 'CREATE_INCOME_REQUEST';
export const CREATE_INCOME_SUCCESS = 'CREATE_INCOME_SUCCESS';
export const CREATE_INCOME_FAILURE = 'CREATE_INCOME_FAILURE';

export function createIncomeRequest(requestBody) {
  return {
    type: CREATE_INCOME_REQUEST,
    body: requestBody
  };
}

export function createIncomeSuccess(body) {
  return {
    type: CREATE_INCOME_SUCCESS,
    body
  };
}

export function createIncomeFailure(body) {
  return {
    type: CREATE_INCOME_FAILURE,
    body
  };
}
