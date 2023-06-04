import React from 'react';
import { render, screen, within, container } from '@testing-library/react';
import { mockData } from '../helpers/mockData';
import App from '../App';
import userEvent from '@testing-library/user-event';

// const fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(() =>
// Promise.resolve({
//   json: () => Promise.resolve(mockData),
// }),
// );
global.fetch = jest.fn().mockResolvedValue({ json: jest.fn().mockResolvedValue(mockData)})
describe('testes', () => {
  test('testes', async () => {
    render(<App />);
    console.log('Início do teste');
    expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets');
    expect(global.fetch).toHaveBeenCalledTimes(1);
    const colunaInput = screen.getByTestId('column-filter')
    const operadorInput = screen.getByTestId('comparison-filter')
    const numeroInput = screen.getByTestId('value-filter')
    const btnFiltrar = screen.getByRole('button', {  name: /filtrar/i});
    const barraPesquisa = screen.getByRole('textbox');
    
    expect(colunaInput).toBeInTheDocument()
    expect(operadorInput).toBeInTheDocument()
    expect(numeroInput).toBeInTheDocument()
    expect(btnFiltrar).toBeInTheDocument()
    expect(barraPesquisa).toBeInTheDocument()

    userEvent.selectOptions(colunaInput, 'population');
    userEvent.selectOptions(operadorInput, 'maior que');
    userEvent.type(numeroInput, 0);
    userEvent.click(btnFiltrar);

    const filtro = screen.getByTestId('filtro');
    expect(filtro).toBeInTheDocument()
    // expect(screen.queryByRole('heading', { name: /carregando\.\.\./i })).not.toBeInTheDocument();
    // screen.getByRole('button', { name: /filtrar/i });
  });
});
