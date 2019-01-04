import {
  FETCH_EXPENSES_REQUEST,
  FETCH_EXPENSES_SUCCESS,
  FETCH_EXPENSES_FAILURE,

  CREATE_EXPENSE_SUCCESS
} from '../actions/expensesActions';

const initialState = {
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

function expenseItem(expense) {
  return {
    id: expense.id,
    amount: expense.amount,
    onDate: parseDate(expense.on_date),
    desc: expense.desc,
    currency: {
      id: expense.currency.id,
      name: expense.currency.name,
      isoCode: expense.currency.iso_code
    }
  };
}

export default function expensesReducers(state = initialState, action) {
  switch (action.type) {
  case FETCH_EXPENSES_REQUEST:
    return { ...state, loading: true };
  case FETCH_EXPENSES_SUCCESS:
    let { body } = action;
    let data = body.data.map(expenseItem);
    return {
      loading: false,
      data,
      pageNumber: body.page_number,
      pageSize: body.page_size,
      totalEntries: body.total_entries,
      totalPages: body.total_pages
    };
  case FETCH_EXPENSES_FAILURE:
    return { ...state, loading: false };
  case CREATE_EXPENSE_SUCCESS:
    let expense = expenseItem(action.body.data);
    return { ...state, data: [expense, ...state.data] };
  default:
    return state;
  }
}
