import React from 'react';
import { Button, Table } from 'semantic-ui-react';
import AddExpenseFormModal from '../../components/AddExpenseForm/Modal';

class Expenses extends React.Component {
  componentDidMount() {
    this.props.fetchExpensesRequest();
  }

  renderExpense(expense) {
    return (
      <Table.Row key={expense.id}>
        <Table.Cell content={expense.onDate}/>
        <Table.Cell content={expense.amount}/>
        <Table.Cell content={expense.currency.name}/>
        <Table.Cell content={expense.desc}/>
        <Table.Cell content={<Button content="Edit"/>}/>
      </Table.Row>
    );
  }

  render() {
    const rows = this.props.expenses.data.map(this.renderExpense);
    return (
      <div>
        <AddExpenseFormModal onSubmit={this.props.createExpenseRequest}/>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell content="On date"/>
              <Table.HeaderCell content="Amount"/>
              <Table.HeaderCell content="Currency"/>
              <Table.HeaderCell content="Desc"/>
              <Table.HeaderCell/>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            { rows }
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default Expenses;
