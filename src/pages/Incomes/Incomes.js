import React from 'react';
import PropTypes from 'prop-types';
import { Button, Table } from 'semantic-ui-react';

class Incomes extends React.Component {
  static propTypes = {
    incomes: PropTypes.shape({
      data: PropTypes.array.isRequired
    }).isRequired,
    fetchIncomesRequest: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.fetchIncomesRequest();
  }

  renderIncome(income) {
    return (
      <Table.Row key={income.id}>
        <Table.Cell content={income.onDate}/>
        <Table.Cell content={income.forDate}/>
        <Table.Cell content={income.amount}/>
        <Table.Cell content={income.currency.name}/>
        <Table.Cell content={income.desc}/>
        <Table.Cell content={<Button content="Edit"/>}/>
      </Table.Row>
    );
  }

  render() {
    const rows = this.props.incomes.data.map(this.renderIncome);
    return (
      <div>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell content="On date"/>
              <Table.HeaderCell content="For date"/>
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

export default Incomes;
