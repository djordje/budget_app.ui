import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createIncomeRequest, fetchIncomesRequest } from '../../store/actions/incomesActions';
import Incomes from './Incomes';

const IncomesConnected = connect(
  state => ({
    incomes: state.incomes
  }),
  dispatch => bindActionCreators({
    fetchIncomesRequest,
    createIncomeRequest
  }, dispatch)
)(Incomes);

export default IncomesConnected;
