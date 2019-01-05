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
