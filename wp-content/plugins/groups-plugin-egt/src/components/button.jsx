import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom'; // Importar useLocation para obtener la ruta actual

const Button = ({ title, action }) => {
  const location = useLocation(); // Obtener la ruta actual

  // Determinar si estamos en la página principal (Home)
  const isHomePage = location.pathname === '/';

  return (
    <div
      className={`button ${!isHomePage ? 'inverted' : ''}`} // Si no estamos en Home, aplicamos la clase 'inverted'
      onClick={action}
    >
      {title}
    </div>
  );
};

export default Button;

Button.propTypes = {
  title: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};