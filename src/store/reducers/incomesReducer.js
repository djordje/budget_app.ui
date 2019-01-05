import { FETCH_INCOMES_FAILURE, FETCH_INCOMES_REQUEST, FETCH_INCOMES_SUCCESS } from '../actions/incomesActions';

export const initialState = {
  loading: false,
  data: [],
  pageNumber: null,
  pageSize: null,
  totalEntries: null,
  totalPages: null
};

function parseDate(date) {
  if (!date) return null;
  return date.split('T')[0];
}

function incomeItem(income) {
  return {
    id: income.id,
    amount: income.amount,
    forDate: parseDate(income.for_date),
    onDate: parseDate(income.on_date),
    desc: income.desc,
    currency: {
      id: income.currency.id,
      isoCode: income.currency.iso_code,
      name: income.currency.name
    }
  };
}

export default function incomesReducer(state = initialState, action) {
  switch (action.type) {
  case FETCH_INCOMES_REQUEST:
    return { ...state, loading: true };
  case FETCH_INCOMES_SUCCESS:
    let { body } = action;
    let data = body.data.map(incomeItem);
    return {
      loading: false,
      data,
      pageNumber: body.page_number,
      pageSize: body.page_size,
      totalEntries: body.total_entries,
      totalPages: body.total_pages
    };
  case FETCH_INCOMES_FAILURE:
    return { ...state, loading: false };
  default:
    return state;
  }
}
