import React, { useContext, useEffect, useState } from 'react';
import context from '../context/myContext';

export default function Table() {
  const { fetchApi } = useContext(context);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await fetchApi('https://swapi.dev/api/planets');
      setLoading(false);
      setState(result);
    }
    fetchData();
  }, []);

  return (
    (
      loading ? <h1>Carregando...</h1> : (
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
            {state.map((planet) => (
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
      )
    )
  );
}
