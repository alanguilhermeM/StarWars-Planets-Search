import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import filteredContext from '../context/filteredContext';

export default function Filter({ state }) {
  const [filter, setFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    number: 0,
  });
  const { setFilteredState } = useContext(filteredContext);
  const [countFilters, setCountFilters] = useState([]);
  const [filtros, setFiltros] = useState([]);
  console.log(countFilters);

  function handleChange({ target }) {
    const { name, value } = target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  }

  function handleFilters() {
    const updatedFilters = [...filtros, filter];
    setFiltros(updatedFilters);
    setCountFilters(updatedFilters);
    const filtrado = state.filter((planet) => updatedFilters.every((condicao) => {
      const { column, comparison, number } = condicao;
      const columnValue = planet[column];

      switch (comparison) {
      case 'maior que':
        return columnValue > Number(number);
      case 'menor que':
        return columnValue < Number(number);
      default:
        return parseFloat(columnValue) === Number(number);
      }
    }));

    setFilteredState([filtrado, true]);
    setFilter({
      column: 'population',
      comparison: 'maior que',
      number: 0,
    });
  }

  const handleColumn = (column) => !filtros.find((opcao) => column === opcao.column);
  const removeFilter = (filtro) => {
    const filtroAtualizado = filtros.filter((opcao) => opcao !== filtro);
    setFiltros(filtroAtualizado);
    if (filtroAtualizado.length === 0) {
      setFilteredState([state, false]); // Redefinir a tabela original
    } else {
      const filtrado = state.filter((planet) => filtroAtualizado.every((condicao) => {
        const { column, comparison, number } = condicao;
        const columnValue = planet[column];

        switch (comparison) {
        case 'maior que':
          return columnValue > Number(number);
        case 'menor que':
          return columnValue < Number(number);
        default:
          return parseFloat(columnValue) === Number(number);
        }
      }));

      setFilteredState([filtrado, true]);
    }
  };

  const handleRemoveFilters = () => {
    setCountFilters([]);
    setFiltros([]);
    setFilteredState([state, false]);
  };

  return (
    <div>
      <fieldset>
        <label htmlFor="column">
          Coluna
          <select
            data-testid="column-filter"
            name="column"
            onChange={ handleChange }
            value={ filter.column }
          >
            {['population', 'orbital_period', 'diameter', 'rotation_period',
              'surface_water'].filter(handleColumn)
              .map((column) => (
                <option key={ column } value={ column }>
                  {column}
                </option>
              ))}
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
        <button data-testid="button-filter" onClick={ handleFilters }>FILTRAR</button>
        <button
          onClick={ handleRemoveFilters }
          data-testid="button-remove-filters"
        >
          Remover todas filtragens

        </button>
      </fieldset>
      {filtros.map((filtro) => (
        <div key={ Math.random() } data-testid="filter">
          <span>
            {filtro.column}
            {' '}
            {filtro.comparison}
            {' '}
            {filtro.number}
          </span>
          <button onClick={ () => removeFilter(filtro) }>X</button>
        </div>
      ))}
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
