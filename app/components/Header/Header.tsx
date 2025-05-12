import { Link } from 'react-router';
import './Header.style.css';

const Header = () => {
  // TODO: Implementar un botón de favoritos que muestre un modal
  // o redirija a una página que muestre las películas favoritas.
  // Mejorar el sistema de cache en localStorage primero, ya que el Header
  // no debería saber nada de la lógica de las películas (ni siquiera tiene acceso al context).

  return (
    <header className="flex items-center p-s">
      <Link to="/" className="flex items-center">
        <img src="/assets/img/logo.svg" alt="MovieBox Logo" className="w-[35px] h-[35px] md:w-[50px] md:h-[50px]" />
        <h1 className="ml-xs md:ml-s color-primary font-weight-bold text-s md:text-xl">MovieBox</h1>
      </Link>
    </header>
  );
};

export default Header;
