import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchExpensesRequest } from '../../store/actions/expensesActions';
import Expenses from './Expenses';

export default connect(
  state => ({
    expenses: state.expenses
  }),
  dispatch => bindActionCreators({
    fetchExpensesRequest
  }, dispatch)
)(Expenses);
