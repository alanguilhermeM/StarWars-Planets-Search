import React from 'react';
import './App.css';
import Provider from './context/myProvider';
import FilteredStateProvider from './context/filteredProvider';
import Table from './components/Table';

function App() {
  return (
    <div>
      <FilteredStateProvider>
        <Provider>
          <Table />
        </Provider>
      </FilteredStateProvider>

    </div>
  );
}

export default App;
