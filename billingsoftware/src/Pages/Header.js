import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LogoutIconMUI from '@mui/icons-material/Logout';

const Header = ({ onLogout }) => {
  const location = useLocation();
  const currentPage = location.pathname;

  const LogoutIcon = ({ className = 'w-5 h-5' }) => <LogoutIconMUI className={className} />;

  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Invoice', path: '/invoice' },
    { name: 'Customers', path: '/customers' },
    { name: 'Products', path: '/products' },
    { name: 'Reports', path: '/reports' },
  ];

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 rounded-b-3xl shadow-2xl mb-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-3xl font-extrabold tracking-tight mb-4 md:mb-0">
          <span className="text-yellow-300">SKR</span>Services
        </h1>
        <nav className="w-full md:w-auto flex flex-col md:flex-row md:items-center md:space-x-6">
          <ul className="flex flex-col md:flex-row flex-1 justify-center gap-x-6 gap-y-2 md:gap-y-0 mb-2 md:mb-0">
            {navItems.map(item => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`
                    px-4 py-2 rounded-full text-lg font-medium transition-all duration-300 ease-in-out
                    ${currentPage === item.path
                      ? 'bg-white text-indigo-700 shadow-md transform scale-105'
                      : 'text-white hover:bg-indigo-500 hover:shadow-lg'
                    }
                  `}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <button
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md transition duration-200 ease-in-out transform hover:scale-110 flex items-center space-x-1 self-center md:self-auto"
            title="Logout"
          >
            <LogoutIcon className="w-5 h-5" />
            <span className="hidden md:inline">Logout</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;