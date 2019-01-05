import { combineReducers } from 'redux';
import apiTokenReducer from './apiTokenReducer';
import currenciesReducers from './currenciesReducers';
import expensesReducers from './expensesReducers';
import incomesReducer from './incomesReducer';

const rootReducer = combineReducers({
  apiToken: apiTokenReducer,
  currencies: currenciesReducers,
  expenses: expensesReducers,
  incomes: incomesReducer
});

export default rootReducer;
