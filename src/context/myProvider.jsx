import PropTypes from 'prop-types';
import context from './myContext';

function Provider({ children }) {
  async function fetchApi(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      const { results } = data;
      const residents = 'residents';
      const filtred = results.map((result) => {
        const novoObjeto = { ...result };
        delete novoObjeto[residents];
        return novoObjeto;
      });
      return filtred;
    } catch (error) {
      console.log('deu erro');
    }
  }

  const value = {
    fetchApi,
  };

  return (
    <context.Provider value={ value }>
      {children}
    </context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Provider;
