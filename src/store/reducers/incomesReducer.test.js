import incomesReducer from './incomesReducer';
import {
  createIncomeSuccess,
  fetchIncomesFailure,
  fetchIncomesRequest,
  fetchIncomesSuccess
} from '../actions/incomesActions';

describe('incomesReducer', () => {
  describe('FETCH_INCOMES_REQUEST', () => {
    it('returns state with loading flag set to true', () => {
      const state = {
        loading: false
      };
      const action = fetchIncomesRequest();
      expect(incomesReducer(state, action)).toEqual({
        loading: true
      });
    });
  });

  describe('FETCH_INCOMES_SUCCESS', () => {
    it('returns state with loading flag set to false, updated data and pagination', () => {
      const responseBody = {
        data: [
          {
            id: 1,
            amount: 10.0,
            for_date: (new Date('2019-01-05')).toISOString(),
            on_date: (new Date('2019-01-05')).toISOString(),
            desc: 'Test desc',
            currency: {
              id: 1,
              iso_code: 'RSD',
              name: 'Serbian dinar'
            }
          }
        ],
        page_number: 1,
        page_size: 10,
        total_entries: 1,
        total_pages: 1
      };
      const state = {
        loading: true,
        data: [],
        pageNumber: null,
        pageSize: null,
        totalEntries: null,
        totalPages: null
      };
      const action = fetchIncomesSuccess(responseBody);
      expect(incomesReducer(state, action)).toEqual({
        loading: false,
        data: [
          {
            id: 1,
            amount: 10.0,
            forDate: '2019-01-05',
            onDate: '2019-01-05',
            desc: 'Test desc',
            currency: {
              id: 1,
              isoCode: 'RSD',
              name: 'Serbian dinar'
            }
          }
        ],
        pageNumber: 1,
        pageSize: 10,
        totalEntries: 1,
        totalPages: 1
      });
    });
  });

  describe('FETCH_INCOMES_FAILURE', () => {
    it('returns state with loading flag set to false', () => {
      const state = {
        loading: true
      };
      const action = fetchIncomesFailure({});
      expect(incomesReducer(state, action)).toEqual({
        loading: false
      });
    });
  });

  describe('CREATE_INCOME_SUCCESS', () => {
    it('adds item at the beginning of the list', () => {
      const existingItem = {
        id: 1,
        amount: 10.0,
        forDate: '2019-01-05',
        onDate: '2019-01-05',
        desc: 'Test desc',
        currency: {
          id: 1,
          isoCode: 'RSD',
          name: 'Serbian dinar'
        }
      };
      const state = {
        loading: false,
        data: [existingItem],
        pageNumber: 1,
        pageSize: 10,
        totalEntries: 1,
        totalPages: 1
      };
      const newItemRaw = {
        id: 2,
        amount: 12.0,
        for_date: '2019-01-06',
        on_date: '2019-01-06',
        desc: 'Test desc',
        currency: {
          id: 1,
          iso_code: 'RSD',
          name: 'Serbian dinar'
        }
      };
      const newItemCamelCase = {
        id: 2,
        amount: 12.0,
        forDate: '2019-01-06',
        onDate: '2019-01-06',
        desc: 'Test desc',
        currency: {
          id: 1,
          isoCode: 'RSD',
          name: 'Serbian dinar'
        }
      };
      const action = createIncomeSuccess({ data: newItemRaw });
      expect(incomesReducer(state, action)).toEqual({
        loading: false,
        data: [newItemCamelCase, existingItem],
        pageNumber: 1,
        pageSize: 10,
        totalEntries: 1,
        totalPages: 1
      });
    });
  });

  describe('default', () => {
    it('returns unchanged state', () => {
      const state = { key: 'value' };
      const action = { type: 'TEST_INVALID_ACTION' };
      expect(incomesReducer(state, action)).toStrictEqual(state);
    });
  });
});
