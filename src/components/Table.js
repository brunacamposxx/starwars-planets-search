import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../context/MyContext';
import fetchAPI from '../services/fetchAPI';

function Table() {
  // requisito 1
  const [data, setData] = useState([]);
  const [titles, setTitles] = useState([]);
  const [newData, setNewData] = useState([]); // requisito 2

  useEffect(() => {
    const getPlanets = async () => {
      const results = await fetchAPI();
      results.forEach((result) => {
        delete result.residents;
      });
      setData(results);
      setNewData(data); // requisito 2
      setTitles(Object.keys(results[0]));
    };
    getPlanets();
  }, [data]);

  // requisito 2
  const { setColumnFilter,
    setComparisonFilter,
    setValueFilter,
    setButtonFilter,
    setSearch,
    columnFilter,
    comparisonFilter,
    valueFilter,
    // buttonFilter,
    filters: { filterByName: { name } } } = useContext(MyContext); // pega para consumo a função criada no provider;

  function handleChange(event) {
    setSearch(event.target.value);
    const filterName = data.filter((planet) => planet.name.includes(event.target.value));
    setNewData(filterName);
    // console.log(filterName);
  }

  const filteredMap = (array) => (array.map((planet, index) => (
    <tr key={ index }>
      <td>{planet.name}</td>
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

  useEffect(() => {
    if (comparisonFilter === 'maior que') {
      const dadosnovos = data.filter(
        (param) => parseFloat(param[`${columnFilter}`]) > parseFloat(`${valueFilter}`),
      );
      setNewData(dadosnovos);
    } else if (comparisonFilter === 'menor que') {
      const dadosnovos = data.filter(
        (param) => parseFloat(param[`${columnFilter}`]) < parseFloat(`${valueFilter}`),
      );
      setNewData(dadosnovos);
    } else if (comparisonFilter === 'igual a') {
      const dadosnovos = data.filter(
        (param) => parseFloat(param[`${columnFilter}`]) === parseFloat(`${valueFilter}`),
      );
      setNewData(dadosnovos);
    } else {
      setNewData([]);
    }
  }, [columnFilter, comparisonFilter, data, valueFilter]);

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
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
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
          onClick={ (event) => { setButtonFilter(event.target.value); } }
          data-testid="button-filter"
        >
          Filter
        </button>
      </div>
      <table>
        <thead>
          <tr>
            {titles.map((title) => <th key={ title }>{title}</th>)}
          </tr>
        </thead>
        <tbody>
          {newData.length > 0 ? filteredMap(newData) : filteredMap(data) }
        </tbody>
      </table>
    </>
  );
}

export default Table;
