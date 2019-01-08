import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import moment from 'moment';

import SelectCurrency from '../SelectCurrency'

const DATE_FORMAT = 'YYYY-MM-DD';

class AddIncomeForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  };

  state = {
    amount: 0,
    currencyId: null,
    desc: '',
    onDate: moment().format(DATE_FORMAT),
    forDate: moment().format(DATE_FORMAT)
  };

  handleAmountChange = (e, { value }) => {
    this.setState(state => ({ ...state, amount: value }));
  };

  handleCurrencyChange = (e, { value }) => {
    this.setState(state => ({ ...state, currencyId: value }));
  };

  handleOnDateChange = (e, { value }) => {
    this.setState(state => ({ ...state, onDate: value }));
  };

  handleForDateChange = (e, { value }) => {
    this.setState(state => ({ ...state, forDate: value }));
  };

  handleDescChange = (e, { value }) => {
    this.setState(state => ({ ...state, desc: value }));
  };

  handleSubmit = (e) => {
    this.props.onSubmit(this.state);
    e.preventDefault();
  };

  render() {
    return (
      <div className="addExpense">
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <Form.Input label="Amount" type="number" value={this.state.amount} onChange={this.handleAmountChange}/>
          </Form.Field>
          <Form.Field>
            <SelectCurrency onChange={this.handleCurrencyChange}/>
          </Form.Field>
          <Form.Field>
            <DateInput
              label="On date"
              placeholder="Date"
              dateFormat={DATE_FORMAT}
              value={this.state.onDate}
              iconPosition="left"
              onChange={this.handleOnDateChange}
            />
          </Form.Field>
          <Form.Field>
            <DateInput
              label="For date"
              placeholder="Date"
              dateFormat={DATE_FORMAT}
              value={this.state.forDate}
              iconPosition="left"
              onChange={this.handleForDateChange}
            />
          </Form.Field>
          <Form.Field>
            <Form.TextArea label="Description" onChange={this.handleDescChange}/>
          </Form.Field>
          <Form.Field>
            <Form.Button primary>Save</Form.Button>
          </Form.Field>
        </Form>
      </div>
    );
  }
}

export default AddIncomeForm;
