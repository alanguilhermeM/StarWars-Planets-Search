import PropTypes from 'prop-types';
import { useState } from 'react';
import filteredContext from './filteredContext';

export default function FilteredStateProvider({ children }) {
  const [filteredState, setFilteredState] = useState([]);

  return (
    <filteredContext.Provider value={ { filteredState, setFilteredState } }>
      {children}
    </filteredContext.Provider>
  );
}

FilteredStateProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
