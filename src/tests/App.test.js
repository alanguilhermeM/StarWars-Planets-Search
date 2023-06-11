import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { mockData } from '../helpers/mockData';
import App from '../App';
import userEvent from '@testing-library/user-event';
import FilteredStateProvider from '../context/filteredProvider';
import Provider from '../context/myProvider';

// const fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(() =>
// Promise.resolve({
//   json: () => Promise.resolve(mockData),
// }),
// );
// global.fetch = jest.fn().mockResolvedValue({ json: jest.fn().mockResolvedValue(mockData)})
describe('testes', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockData),
      });

      act(() => {
        render(<FilteredStateProvider><Provider><App /></Provider></FilteredStateProvider>);
      });
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('testes', async () => {
    expect(fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets');
    expect(fetch).toHaveBeenCalledTimes(1);
  
    const colunaInput = screen.getByTestId('column-filter');
    const operadorInput = screen.getByTestId('comparison-filter');
    const numeroInput = screen.getByTestId('value-filter');
    const btnFiltrar = screen.getByRole('button', { name: /filtrar/i });
  
    expect(colunaInput).toBeInTheDocument();
    expect(operadorInput).toBeInTheDocument();
    expect(numeroInput).toBeInTheDocument();
    expect(btnFiltrar).toBeInTheDocument();
  
    // Adicionar filtros
    userEvent.selectOptions(colunaInput, 'population');
    userEvent.selectOptions(operadorInput, 'menor que');
    userEvent.type(numeroInput, '30000001');
    act(() => {
      userEvent.click(btnFiltrar);
    });
  
    userEvent.selectOptions(colunaInput, 'diameter');
    userEvent.selectOptions(operadorInput, 'maior que');
    userEvent.type(numeroInput, '10000');
    act(() => {
      userEvent.click(btnFiltrar);
    });
  
    userEvent.selectOptions(colunaInput, 'rotation_period');
    userEvent.selectOptions(operadorInput, 'igual a');
    userEvent.type(numeroInput, '23');
    act(() => {
      userEvent.click(btnFiltrar);
    });
  
    // Verificar filtros adicionados
    const filtros = await screen.findAllByTestId('filter');
    expect(filtros).toHaveLength(3);
  
    // Remover filtros um por um
    for (const filtro of filtros) {
      const removeButton = filtro.querySelector('button');
      userEvent.click(removeButton);
    }
  
    // Verificar se todos os filtros foram removidos
    const filtrosRemovidos = await screen.queryAllByTestId('filter');
    expect(filtrosRemovidos).toHaveLength(2);
  });
  test('testando a remoção de todos os filtros', async () => {
    const colunaInput = screen.getByTestId('column-filter')
    const operadorInput = screen.getByTestId('comparison-filter')
    const numeroInput = screen.getByTestId('value-filter')
    const btnFiltrar = screen.getByRole('button', {  name: /filtrar/i});

    userEvent.selectOptions(colunaInput, 'population');
    userEvent.selectOptions(operadorInput, 'igual a');
    userEvent.type(numeroInput, 1000000000000);
    userEvent.click(btnFiltrar);

    userEvent.selectOptions(colunaInput, 'orbital_period');
    userEvent.selectOptions(operadorInput, 'menor que');
    userEvent.type(numeroInput, 2000);
    userEvent.click(btnFiltrar);

    const filtro = await screen.findAllByTestId('filter');
    expect(filtro).toHaveLength(2);

    const removeAllFilters = screen.getByRole('button', {  name: /remover todas filtragens/i});
    userEvent.click(removeAllFilters);

    const filtrosRemovidos = await screen.queryAllByTestId('filter');
    expect(filtrosRemovidos).toHaveLength(0);
  })

  test('testando a barra de pesquisa', async () => {
    await screen.findByText('Tatooine');
    expect(fetch).toHaveBeenCalled();

    const nameInput = screen.getByRole('textbox');
    act(() => {
      userEvent.type(nameInput, 'Hoth');
    });
    expect(nameInput).toHaveValue('Hoth');
    expect(screen.queryByText('Tatooine')).not.toBeInTheDocument();
    screen.getByText('Hoth');
    expect(screen.getAllByRole('row')).toHaveLength(2);
    act(() => {
      userEvent.clear(nameInput);
    });
    expect(nameInput).toHaveValue('');
    expect(screen.getAllByRole('row')).toHaveLength(11);
  });
});
