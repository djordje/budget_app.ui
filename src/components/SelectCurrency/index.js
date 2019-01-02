import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchCurrenciesRequest } from '../../store/actions/currenciesActions';
import SelectCurrency from './SelectCurrency';

const SelectCurrencyConnected = connect(
  state => ({
    currencies: state.currencies
  }),
  dispatch => bindActionCreators({
    fetchCurrenciesRequest
  }, dispatch)
)(SelectCurrency);

export default SelectCurrencyConnected;
