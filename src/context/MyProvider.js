import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function MyProvider({ children }) {
  const [search, setSearch] = useState('');
  const [columnFilter, setColumnFilter] = useState([]); // requisito 3
  const [comparisonFilter, setComparisonFilter] = useState([]); // requisito 3
  const [valueFilter, setValueFilter] = useState([]); // requisito 3
  const [buttonFilter, setButtonFilter] = useState([]); // requisito 3

  const filters = {
    filterByName: {
      name: search,
    },
    filterByNumericValues: [
      {
        column: columnFilter,
        comparison: comparisonFilter,
        value: valueFilter,
      },
    ],
  };

  return (
    <MyContext.Provider
      value={ {
        setColumnFilter,
        setComparisonFilter,
        setValueFilter,
        setButtonFilter,
        setSearch,
        columnFilter,
        comparisonFilter,
        valueFilter,
        buttonFilter,
        search,
        filters,
      } }
    >
      {children}
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MyProvider;
