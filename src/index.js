import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Provider from './context/myProvider';
import FilteredStateProvider from './context/filteredProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FilteredStateProvider>
    <Provider>
      <App />
    </Provider>
  </FilteredStateProvider>,
);
