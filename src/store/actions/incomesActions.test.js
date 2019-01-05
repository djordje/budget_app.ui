import {
  FETCH_INCOMES_FAILURE,
  FETCH_INCOMES_REQUEST,
  FETCH_INCOMES_SUCCESS,
  fetchIncomesFailure,
  fetchIncomesRequest,
  fetchIncomesSuccess
} from './incomesActions';

describe('fetchIncomesRequest', () => {
  it('returns type, page and perPage', () => {
    expect(fetchIncomesRequest()).toStrictEqual({
      type: FETCH_INCOMES_REQUEST,
      page: 1,
      perPage: 10
    });
  });
});

describe('fetchIncomesSuccess', () => {
  it('returns type and body', () => {
    expect(fetchIncomesSuccess('test body')).toStrictEqual({
      type: FETCH_INCOMES_SUCCESS,
      body: 'test body'
    })
  });
});

describe('fetchIncomesFailure', () => {
  it('returns type and body', () => {
    expect(fetchIncomesFailure('test body')).toStrictEqual({
      type: FETCH_INCOMES_FAILURE,
      body: 'test body'
    })
  });
});
