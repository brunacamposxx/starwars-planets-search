import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

export default function Sort() {
  const { order, setOrder, columnMap } = useContext(MyContext);

  const handleChange = ({ target: { name, value } }) => {
    setOrder({ ...order, [name]: value });
  };

  const handleClick = () => {
    setOrder({ ...order, orderOn: true });
  };

  return (
    <div>
      { 'Sort by: '}
      <select
        name="columnFilter"
        id=""
        data-testid="column-sort"
        onChange={ handleChange }
      >
        <option>name</option>
        { columnMap.map((column) => (
          <option key={ column }>{ column }</option>
        ))}
      </select>
      <div>
        <label
          htmlFor="column-sort-input-asc"
        >
          <input
            name="sort"
            id="column-sort-input-asc"
            data-testid="column-sort-input-asc"
            value="ASC"
            type="radio"
            onClick={ handleChange }
          />
          Ascendent
        </label>
        <label
          htmlFor="column-sort-input-desc"
        >
          <input
            name="sort"
            id="column-sort-input-desc"
            data-testid="column-sort-input-desc"
            value="DESC"
            type="radio"
            onClick={ handleChange }
          />
          Descendent
        </label>
      </div>
      <button
        data-testid="column-sort-button"
        type="button"
        onClick={ handleClick }
      >
        Sort
      </button>
    </div>
  );
}
