import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Home, Building, Users, Phone, BookOpen, UserCircle, LogOut } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simuler l'état de connexion

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600';
  };

  const navLinks = [
    { path: '/', label: 'Accueil', icon: <Home size={18} /> },
    { path: '/biens', label: 'Nos Biens', icon: <Building size={18} /> },
    { path: '/a-propos', label: 'À Propos', icon: <Users size={18} /> },
    { path: '/contact', label: 'Contact', icon: <Phone size={18} /> },
    { path: '/blog', label: 'Blog', icon: <BookOpen size={18} /> },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <Building className="h-8 w-8 text-primary-600" />
            <span className="text-2xl font-title font-bold text-primary-800">ImmoExpert</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-1 ${isActive(link.path)} font-medium transition-colors duration-200`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Authentication Buttons (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-700 hover:text-primary-600"
              >
                <LogOut size={18} />
                <span>Déconnexion</span>
              </button>
            ) : (
              <>
                <Link to="/login" className="btn-outline">
                  Connexion
                </Link>
                <Link to="/inscription" className="btn-primary">
                  Inscription
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-700 hover:text-primary-600 focus:outline-none"
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200 slide-in">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-2 ${isActive(link.path)} py-2`}
                  onClick={closeMenu}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))}
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                {isLoggedIn ? (
                  <button 
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 py-2"
                  >
                    <LogOut size={18} />
                    <span>Déconnexion</span>
                  </button>
                ) : (
                  <>
                    <Link to="/login" className="btn-outline text-center" onClick={closeMenu}>
                      Connexion
                    </Link>
                    <Link to="/inscription" className="btn-primary text-center" onClick={closeMenu}>
                      Inscription
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;