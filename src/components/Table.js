import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../context/MyContext';
import fetchAPI from '../services/fetchAPI';

function Table() {
  // requisito 1
  const [data, setData] = useState([]);
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      const results = await fetchAPI();
      results.forEach((result) => {
        delete result.residents;
      });
      setData(results);
      setTitles(Object.keys(results[0]));
    };
    getPlanets();
  }, []);

  // requisito 2
  const { setSearch, filters: { filterByName: { name } } } = useContext(MyContext); // pega para consumo a função criada no provider;

  function handleChange(event) {
    setSearch(event.target.value);
  }

  const [searchResults, setSearchFilter] = useState([]);

  const searchFilter = ({ value }) => {
  const filtered = results.filter(({ name }) => (
    name.toLowerCase().includes(search)));
  setSearchFilter(searchFilter);
}, [searchResults]);

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
      <table>
        <thead>
          <tr>
            {titles.map((title) => <th key={ title }>{title}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((planet, index) => (
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
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
