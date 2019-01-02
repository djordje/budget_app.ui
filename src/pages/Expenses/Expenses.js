import React from 'react';
import { Table } from 'semantic-ui-react';

class Expenses extends React.Component {
  componentDidMount() {
    this.props.fetchExpensesRequest();
  }

  renderExpense(expense) {
    return (
      <Table.Row key={expense.id}>
        <Table.Cell content={expense.desc}/>
        <Table.Cell content={expense.amount}/>
      </Table.Row>
    );
  }

  render() {
    const rows = this.props.expenses.data.map(this.renderExpense);
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell content="Desc"/>
            <Table.HeaderCell content="Amount"/>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          { rows }
        </Table.Body>
      </Table>
    );
  }
}

export default Expenses;
