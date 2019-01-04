import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchExpensesRequest, createExpenseRequest } from '../../store/actions/expensesActions';
import Expenses from './Expenses';

export default connect(
  state => ({
    expenses: state.expenses
  }),
  dispatch => bindActionCreators({
    fetchExpensesRequest,
    createExpenseRequest
  }, dispatch)
)(Expenses);
