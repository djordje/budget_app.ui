import {
  FETCH_CURRENCIES_REQUEST,
  FETCH_CURRENCIES_SUCCESS,
  FETCH_CURRENCIES_FAILURE
} from '../actions/currenciesActions';


function currencyItem(currency) {
  return {
    id: currency.id,
    name: currency.name,
    isoCode: currency.iso_code
  };
}

function uniqueData(currentData, newData) {
  const existingIds = currentData.map((currency) => { return currency.id });
  const distinctNewData = newData.filter((currency) => {
    return !existingIds.includes(currency.id);
  });
  return currentData.concat(distinctNewData);
}

const initialState = {
  loading: false,
  data: [],
  hasMore: true,
  lastPage: null
};

export default function currenciesReducers(state = initialState, action) {
  switch (action.type) {
  case FETCH_CURRENCIES_REQUEST:
    return { ...state, loading: true };
  case FETCH_CURRENCIES_SUCCESS:
    let { body } = action;
    let hasMore = body.page_number < body.total_pages;
    let data = body.data.map(currencyItem);
    data = uniqueData(state.data, data);
    return { loading: false, data, hasMore, lastPage: body.page_number };
  case FETCH_CURRENCIES_FAILURE:
    return { ...state, loading: false, hasMore: false };
  default:
    return state;
  }
}
