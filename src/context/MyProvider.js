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

  const initialOrder = { orderOn: false, columnFilter: 'name', sort: 'ASC' };
  const [order, setOrder] = useState(initialOrder);

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

  const setOrdenation = (planetA, planetB) => {
    const { sort } = order;
    const ONE = 1;
    const LESS_ONE = -1;
    if (sort === 'ASC') {
      return (planetA > planetB) ? ONE : LESS_ONE;
    }
    if (sort === 'DESC') {
      return (planetB > planetA) ? ONE : LESS_ONE;
    }
    return 0;
  };

  const orderPlanets = (planets) => {
    const { columnFilter: column } = order;
    planets.sort((planetA, planetB) => {
      const a = (column === 'name') ? planetA[column] : parseInt(planetA[column], 10);
      console.log(a);
      const b = (column === 'name') ? planetB[column] : parseInt(planetB[column], 10);
      console.log(b);
      return setOrdenation(a, b);
    });
    setOrder({ ...order, orderOn: false });
  };

  return (
    <MyContext.Provider
      value={ {
        setColumnFilter,
        setComparisonFilter,
        setValueFilter,
        setButtonFilter,
        setSearch,
        setOrder,
        setColumnMap,
        columnFilter,
        comparisonFilter,
        valueFilter,
        buttonFilter,
        search,
        filters,
        columnMap,
        filteredByNumbers,
        order,
        orderPlanets,
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
