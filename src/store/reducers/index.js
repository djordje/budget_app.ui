import { combineReducers } from 'redux';
import apiTokenReducer from './apiTokenReducer';
import currenciesReducers from './currenciesReducers';
import expensesReducers from './expensesReducers';

const rootReducer = combineReducers({
  apiToken: apiTokenReducer,
  currencies: currenciesReducers,
  expenses: expensesReducers
});

export default rootReducer;
