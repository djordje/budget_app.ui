import 'semantic-ui-css/semantic.min.css';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  BrowserRouter,
  NavLink,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';

import { obtainApiTokenSuccess } from './store/actions/apiTokenActions';
import { readApiTokenFromLocalStorage } from './services/localStorage';

// Pages
import SignIn from './pages/SignIn';
import Expenses from './pages/Expenses';
import Incomes from './pages/Incomes';

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
        <div style={ { marginTop: '10px' } }>
          <Menu>
            <Menu.Item as={NavLink} to="/expenses" name="Expenses"/>
            <Menu.Item as={NavLink} to="/incomes" name="Incomes"/>
            <Menu.Item as={NavLink} to="/exchange-rates" name="Exchange rates"/>
          </Menu>
          <Switch>
            <Route path="/expenses" component={Expenses} />
            <Route path="/incomes" component={Incomes}/>
            <Route path="/exchange-rates" component={Expenses}/>
            <Redirect to="/expenses"/>
          </Switch>
        </div>
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
