import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import filteredContext from '../context/filteredContext';

export default function Filter({ state }) {
  const [filter, setFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    number: 0,
  });
  //   const [filtered, setFiltered] = useState(false);
  const { setFilteredState } = useContext(filteredContext);

  function handleChange({ target }) {
    const { name, value } = target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  }

  function handleFilter() {
    const { column, comparison, number } = filter;
    const filtrado = state.filter((planet) => {
      const columnValue = planet[column];
      switch (comparison) {
      case 'maior que':
        return columnValue > Number(number);
      case 'menor que':
        return columnValue < Number(number);
      default:
        return parseFloat(columnValue) === Number(number);
      }
    });
    setFilteredState([filtrado, true]);
  }

  return (
    <div>
      <label htmlFor="column">
        Coluna
        <select
          data-testid="column-filter"
          name="column"
          onChange={ handleChange }
          value={ filter.column }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <label htmlFor="comparison">
        Operador
        <select
          data-testid="comparison-filter"
          name="comparison"
          value={ filter.comparison }
          onChange={ handleChange }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label>
        <input
          type="number"
          data-testid="value-filter"
          name="number"
          value={ filter.number }
          onChange={ handleChange }
        />
      </label>
      <button data-testid="button-filter" onClick={ handleFilter }>FILTRAR</button>
    </div>
  );
}

Filter.propTypes = {
  state: PropTypes.arrayOf(PropTypes.shape({
    population: PropTypes.string.isRequired,
    orbital_period: PropTypes.string.isRequired,
    diameter: PropTypes.string.isRequired,
    rotation_period: PropTypes.string.isRequired,
    surface_water: PropTypes.string.isRequired,
  })).isRequired,
};
