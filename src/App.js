import 'semantic-ui-css/semantic.min.css';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import { obtainApiTokenSuccess } from './store/actions/apiTokenActions';
import { readApiTokenFromLocalStorage } from './services/localStorage';

// Pages
import SignIn from './pages/SignIn';
import Expenses from './pages/Expenses'

class App extends Component {
  componentWillMount() {
    let apiToken = readApiTokenFromLocalStorage();
    if (apiToken) {
      this.props.obtainApiTokenSuccess(apiToken);
    }
  }

  renderAppRouter() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/expenses" component={Expenses} />
          <Route path="/incomes" component={Expenses}/>
          <Route path="/exchange-rates" component={Expenses}/>
          <Redirect to="/expenses"/>
        </Switch>
      </BrowserRouter>
    );
  }

  render() {
    const { loggedIn } = this.props;
    return (
      <Container>
        { loggedIn ? this.renderAppRouter() : <SignIn /> }
      </Container>
    );
  }
}

export default connect(
  state => ({
    loggedIn: state.apiToken && state.apiToken.loaded
  }),
  dispatch => bindActionCreators({
    obtainApiTokenSuccess
  }, dispatch)
)(App);
