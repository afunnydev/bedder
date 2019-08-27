import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const currencies = ['ARS','AUD','BAM','BDT','BOB','BRL','BZD','CAD','CLP','CNY','COP','CRC','CUP','CZK','DOP','EGP','EUR','FJD','GBP','GTQ','HNL','HRK','HUF','IDR','INR','ISK','JMD','JPY','KHR','LAK','LBP','LKR','MAD','MGA','MMK','MNT','MVR','MXN','MYR','NIO','NPR','NZD','PAB','PEN','PHP','PYG','SGD','SRD','THB','TND','TRY','TWD','USD','UYU','VEF','VND','XCD','YER',];

const CurrencySelector = ({ currency, onChange }) => {
  // This was added because the component didn't rerender after the store was updated, so we couldn't see the new currency. If you can implement another way, and the currency reflects the store, go for it.
  const [newCurrency, setNewCurrency] = useState(null);
  const adjustedOnChange = (e) => {
    setNewCurrency(e.target.value);
    onChange(e.target.value);
  };

  return (
    <Select value={newCurrency || currency} onChange={adjustedOnChange} name="currency">
      {currencies.map(currency => (
        <MenuItem key={currency} value={currency}>{currency}</MenuItem>
      ))}
    </Select>
  );
};

CurrencySelector.propTypes = {
  currency: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
};

export default CurrencySelector;