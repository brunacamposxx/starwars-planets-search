import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function MyProvider({ children }) {
  const [search, setSearch] = useState('');
  const [columnFilter, setColumnFilter] = useState('population'); // requisito 3
  const [comparisonFilter, setComparisonFilter] = useState('maior que'); // requisito 3
  const [valueFilter, setValueFilter] = useState([]); // requisito 3

  const filteredByNumbers = {
    filter: false,
    filterNumberData: [],
  };

  const [buttonFilter, setButtonFilter] = useState(filteredByNumbers); // requisito 3

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
  const details = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];
  const [columnMap, setColumnMap] = useState(details);

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
        columnMap,
        setColumnMap,
        filteredByNumbers,
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
