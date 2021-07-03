import React, { useEffect, useState } from 'react';
import fetchAPI from '../services/fetchAPI';

function Table() {
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

  return (
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
  );
}

export default Table;

// outra forma de map https://github.com/tryber/sd-010-b-project-trybewallet/blob/bruna-campos-project-trybe-wallet/src/component/Table.js
