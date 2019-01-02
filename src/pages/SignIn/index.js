import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { obtainApiTokenRequest } from '../../store/actions/apiTokenActions';
import SignIn from './SignIn';

export default connect(
  undefined,
  dispatch => bindActionCreators({ obtainApiTokenRequest }, dispatch)
)(SignIn);
