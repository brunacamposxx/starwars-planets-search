import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../context/MyContext';
import fetchAPI from '../services/fetchAPI';
import Sort from './Sort';

function Table() {
  // requisito 1
  const [data, setData] = useState([]);
  const [titles, setTitles] = useState([]);
  const [newData, setNewData] = useState(undefined); // requisito 2

  // requisito 2
  const { setColumnFilter,
    setComparisonFilter,
    setValueFilter,
    setButtonFilter,
    setSearch,
    columnFilter,
    comparisonFilter,
    valueFilter,
    buttonFilter,
    columnMap,
    setColumnMap,
    order,
    orderPlanets,
    filters: { filterByName: { name } } } = useContext(MyContext); // pega para consumo a função criada no provider;

  function handleChange(event) {
    setSearch(event.target.value);
    const filterName = data.filter((planet) => planet.name.includes(event.target.value)); // add toUpperCase()
    setNewData(filterName);
  }

  const filteredMap = (array) => (array.map((planet, index) => (
    <tr key={ index }>
      <td data-testid="planet-name">{planet.name}</td>
      <td>{planet.rotation_period}</td>
      <td>{planet.orbital_period}</td>
      <td>{planet.diameter}</td>
      <td>{planet.climate}</td>
      <td>{planet.gravity}</td>
      <td>{planet.terrain}</td>
      <td>{planet.surface_water}</td>
      <td>{planet.population}</td>
      <td>{planet.films}</td>
      <td>{planet.created}</td>
      <td>{planet.edited}</td>
      <td>{planet.url}</td>
    </tr>
  )));

  const filterByNumber = () => {
    if (comparisonFilter === 'maior que') {
      const comparationFilterData = data.filter(
        (param) => parseFloat(param[`${columnFilter}`]) > parseFloat(`${valueFilter}`),
      );
      setNewData(comparationFilterData);
      setButtonFilter({ ...buttonFilter,
        filter: false,
      });
    } else if (comparisonFilter === 'menor que') {
      const comparationFilterData = data.filter(
        (param) => parseFloat(param[`${columnFilter}`]) < parseFloat(`${valueFilter}`),
      );
      setNewData(comparationFilterData);
      setButtonFilter({ ...buttonFilter,
        filter: false,
      });
    } else if (comparisonFilter === 'igual a') {
      const comparationFilterData = data.filter(
        (param) => parseFloat(param[`${columnFilter}`]) === parseFloat(`${valueFilter}`),
      );
      setNewData(comparationFilterData);
      setButtonFilter({ ...buttonFilter,
        filter: false,
      });
    } else {
      setNewData([]);
      setButtonFilter({ ...buttonFilter,
        filter: false,
      });
    }
  };

  const handleClick = () => {
    const { filterNumberData } = buttonFilter;
    const newDetails = columnMap.filter((detail) => detail !== columnFilter);
    setColumnMap(newDetails);
    setButtonFilter({ ...buttonFilter,
      filter: true,
      filterNumberData: [...filterNumberData,
        { id: filterNumberData.length, columnFilter, comparisonFilter, valueFilter }] });
  };

  const clearFilter = (id) => {
    const { filterNumberData } = buttonFilter;
    const removedFilter = filterNumberData.filter((item) => item.id !== id);
    setNewData(undefined);
    setButtonFilter({ ...buttonFilter, filterNumberData: removedFilter });
  };

  const rendFilterButton = () => {
    const { filterNumberData } = buttonFilter;
    return filterNumberData.map((item) => (
      <div key={ item.id }>
        <p data-testid="filter">
          { `Filtrado por ${item
            .columnFilter} ${item.comparisonFilter} ${item.valueFilter}` }
          <button type="button" onClick={ () => clearFilter(item.id) }>X</button>
        </p>
      </div>
    ));
  };

  useEffect(() => {
    const getPlanets = async () => {
      const results = await fetchAPI();
      results.forEach((result) => {
        delete result.residents;
      });
      setData(results);
      orderPlanets(results);
      setTitles(Object.keys(results[0]));
    };
    getPlanets();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { filter } = buttonFilter;
    const { orderOn } = order;
    if (filter) { filterByNumber(); }
    if (orderOn) { orderPlanets(data); }
  });

  return (
    <>
      <header>
        <label htmlFor="filter">
          <input
            type="text"
            placeholder="Search"
            data-testid="name-filter"
            value={ name }
            onChange={ handleChange }
          />
        </label>
      </header>
      <div>
        <select
          name="select"
          onChange={ (event) => { setColumnFilter(event.target.value); } }
          data-testid="column-filter"
        >
          {columnMap.map((column) => <option key={ column }>{column}</option>)}
        </select>
        <select
          name="select"
          onChange={ (event) => { setComparisonFilter(event.target.value); } }
          data-testid="comparison-filter"
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          onChange={ (event) => { setValueFilter(event.target.value); } }
          data-testid="value-filter"
        />
        <button
          type="submit"
          onClick={ handleClick }
          data-testid="button-filter"
        >
          Filter
        </button>
        <Sort />
      </div>
      <div>
        {rendFilterButton()}
      </div>
      <table>
        <thead>
          <tr>
            {titles.map((title) => <th key={ title }>{title}</th>)}
          </tr>
        </thead>
        <tbody>
          {!newData ? filteredMap(data) : filteredMap(newData) }
        </tbody>
      </table>
    </>
  );
}

export default Table;
