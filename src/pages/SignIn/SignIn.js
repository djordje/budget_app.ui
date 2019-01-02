import React from 'react';
import { Form } from 'semantic-ui-react';

class SignIn extends React.Component {
  state = {
    email: '',
    password: ''
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleEmailChange(_e, { value }) {
    this.setState((state) => {
      return { ...state, email: value };
    });
  }

  handlePasswordChange(_e, { value }) {
    this.setState((state) => {
      return { ...state, password: value };
    });
  }

  handleSubmit(e) {
    const { email, password } = this.state;
    this.props.obtainApiTokenRequest(email, password);
    e.preventDefault();
  }

  render() {
    return (
      <div className="SignIn">
        <Form onSubmit={ this.handleSubmit }>
          <Form.Field>
            <Form.Input label="Email" onChange={ this.handleEmailChange } />
          </Form.Field>
          <Form.Field>
            <Form.Input label="Password" type="password" onChange={ this.handlePasswordChange }  />
          </Form.Field>
          <Form.Field>
            <Form.Button>Submit</Form.Button>
          </Form.Field>
        </Form>
      </div>
    );
  }
}

export default SignIn;
