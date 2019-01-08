import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import AddIncomeForm from './AddIncomeForm';

const AddIncomeFormModal = (props) => (
  <Modal trigger={<Button primary>Add income</Button>} closeIcon>
    <Modal.Header>Add income</Modal.Header>
    <Modal.Content>
      <AddIncomeForm onSubmit={props.onSubmit}/>
    </Modal.Content>
  </Modal>
);

AddIncomeFormModal.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default AddIncomeFormModal;
