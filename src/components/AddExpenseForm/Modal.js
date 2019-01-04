import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import AddExpenseForm from './AddExpenseForm';

const AddExpenseFormModal = (props) => (
  <Modal trigger={<Button primary>Add expense</Button>} closeIcon>
    <Modal.Header>Add expense</Modal.Header>
    <Modal.Content>
      <AddExpenseForm onSubmit={props.onSubmit}/>
    </Modal.Content>
  </Modal>
);

AddExpenseFormModal.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default AddExpenseFormModal;
