import {
  FETCH_INCOMES_FAILURE,
  FETCH_INCOMES_REQUEST,
  FETCH_INCOMES_SUCCESS,
  fetchIncomesFailure,
  fetchIncomesRequest,
  fetchIncomesSuccess,

  CREATE_INCOME_REQUEST,
  CREATE_INCOME_SUCCESS,
  CREATE_INCOME_FAILURE,
  createIncomeRequest,
  createIncomeSuccess,
  createIncomeFailure
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


describe('createIncomeRequest', () => {
  it('returns type, page and perPage', () => {
    expect(createIncomeRequest({ key: 'value' })).toStrictEqual({
      type: CREATE_INCOME_REQUEST,
      body: {
        key: 'value'
      }
    });
  });
});

describe('createIncomeSuccess', () => {
  it('returns type and body', () => {
    expect(createIncomeSuccess('test body')).toStrictEqual({
      type: CREATE_INCOME_SUCCESS,
      body: 'test body'
    })
  });
});

describe('createIncomeFailure', () => {
  it('returns type and body', () => {
    expect(createIncomeFailure('test body')).toStrictEqual({
      type: CREATE_INCOME_FAILURE,
      body: 'test body'
    })
  });
});
