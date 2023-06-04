import React, { useContext, useEffect, useState } from 'react';
import context from '../context/myContext';
import Filter from './Filter';
import filteredContext from '../context/filteredContext';

export default function Table() {
  const { fetchApi } = useContext(context);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState([]);
  const [search, setSearch] = useState('');
  const { filteredState } = useContext(filteredContext);

  useEffect(() => {
    async function fetchData() {
      const result = await fetchApi('https://swapi.dev/api/planets');
      console.log(result);
      setLoading(false);
      setState(result);
    }
    fetchData();
  }, []);

  const lowerSearch = search.toLowerCase();
  const filtredState = state.filter((planet) => planet
    .name.toLowerCase().includes(lowerSearch));

  const filtredState2 = filteredState[0]
    ? filteredState[0].filter((planet) => planet.name.toLowerCase().includes(lowerSearch))
    : [];
  return (
    <div>
      <Filter state={ state } />
      <br />
      <fieldset>
        <input
          data-testid="name-filter"
          value={ search }
          onChange={ ({ target }) => setSearch(target.value) }
          placeholder="Busque pelo Planeta"
        />
      </fieldset>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          {filteredState[1]
            ? filtredState2.map((planet) => (
              <tr key={ planet.name }>
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
            ))
            : filtredState.map((planet) => (
              <tr key={ planet.name }>
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
    </div>
  );
}
