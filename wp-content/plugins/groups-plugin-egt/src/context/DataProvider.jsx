import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Crear el contexto
export const DataContext = createContext();

// Proveedor de datos
export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simular la carga de datos desde un JSON
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error al cargar el JSON:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ data }}>
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};