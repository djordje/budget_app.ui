import React from 'react';
import PropTypes from 'prop-types';
import { Dimmer, Loader, Segment, Select } from 'semantic-ui-react'

const LoadingCurrencies = () => {
  return (
    <Segment>
      <Dimmer active inverted>
        <Loader size="medium"/>
      </Dimmer>
    </Segment>
  );
};

const SelectCurrency = (props) => {
  const { loading, data } = props.currencies;

  if (!loading && data.length === 0) {
    props.fetchCurrenciesRequest();
    return <LoadingCurrencies/>;
  }

  if (loading && data.length === 0) {
    return <LoadingCurrencies/>;
  }

  const currencies = data.map(currency => ({
    key: currency.isoCode,
    value: currency.id,
    text: currency.name
  }));

  return <Select placeholder="Select currency" options={currencies} onChange={props.onChange}/>;
};

SelectCurrency.propTypes = {
  currencies: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    data: PropTypes.array.isRequired
  }).isRequired,
  fetchCurrenciesRequest: PropTypes.func.isRequired
};

export default SelectCurrency;
