import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function MyProvider({ children }) {
  const [search, setSearch] = useState('');
  const filters = {
    filterByName: {
      name: search,
    },
  };

  return (
    <MyContext.Provider value={ { search, setSearch, filters } }>
      {children}
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MyProvider;
