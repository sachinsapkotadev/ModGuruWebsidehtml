import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, Home, Grid3X3, Gamepad2, Shield } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <header className="sticky top-0 bg-white z-20 border-b border-gray-200 shadow-md">
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative h-16 flex items-center">
        <div className="flex items-center gap-2 w-full transition-all duration-200 ease-out">
          <button 
            onClick={toggleMenu}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600"
            aria-label="Menu Toggle"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          
          <Link to="/" className="flex items-center gap-2 shrink-0 no-underline">
            <h1 className="text-[26px] text-blue-600 font-bold tracking-tight m-0 leading-none">
              LITEAPKS.COM
            </h1>
          </Link>

          <nav className="hidden md:flex gap-0 ml-6">
            <Link 
              to="/" 
              className="flex items-center px-6 py-2 text-sm font-semibold no-underline text-blue-600 hover:text-blue-700"
            >
              <Home className="mr-2 w-5 h-5" />
              Home
            </Link>
            <Link 
              to="/apps" 
              className="flex items-center px-6 py-2 text-sm font-semibold no-underline text-gray-600 hover:text-blue-600"
            >
              <Grid3X3 className="mr-2 w-5 h-5" />
              Apps
            </Link>
            <Link 
              to="/games" 
              className="flex items-center px-6 py-2 text-sm font-semibold no-underline text-gray-600 hover:text-blue-600"
            >
              <Gamepad2 className="mr-2 w-5 h-5" />
              Games
            </Link>
            <Link 
              to="/admin" 
              className="flex items-center px-6 py-2 text-sm font-semibold no-underline text-gray-600 hover:text-blue-600"
            >
              <Shield className="mr-2 w-5 h-5" />
              Admin
            </Link>
          </nav>

          <div className="flex items-center gap-2 ml-auto">
            <button 
              onClick={toggleSearch}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600"
              aria-label="Open search"
            >
              <Search className="w-6 h-6" />
            </button>
          </div>
        </div>

        {isSearchOpen && (
          <div className="absolute inset-0 flex items-center gap-2 px-4 md:px-6 bg-white">
            <Search className="w-5 h-5 shrink-0 text-gray-600" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search apps & games..."
              className="flex-1 bg-transparent border-none outline-none text-sm text-gray-900 placeholder:text-gray-500 min-w-0"
            />
            <button 
              onClick={toggleSearch}
              className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600 bg-transparent border-none cursor-pointer"
              aria-label="Close search"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <nav className={`fixed top-0 left-0 bottom-0 w-[300px] max-w-[80vw] bg-white z-50 transition-transform duration-300 overflow-y-auto ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-200">
          <span className="text-lg font-bold text-gray-900">LITEAPKS.COM</span>
        </div>
        
        <Link 
          to="/" 
          onClick={toggleMenu}
          className="flex items-center px-6 py-3 text-sm font-medium no-underline text-gray-900 hover:bg-blue-50 hover:text-blue-600"
        >
          <Home className="mr-2 w-5 h-5" />
          Home
        </Link>
        <Link 
          to="/apps" 
          onClick={toggleMenu}
          className="flex items-center px-6 py-3 text-sm font-medium no-underline text-gray-900 hover:bg-blue-50 hover:text-blue-600"
        >
          <Grid3X3 className="mr-2 w-5 h-5" />
          Apps
        </Link>
        <Link 
          to="/games" 
          onClick={toggleMenu}
          className="flex items-center px-6 py-3 text-sm font-medium no-underline text-gray-900 hover:bg-blue-50 hover:text-blue-600"
        >
          <Gamepad2 className="mr-2 w-5 h-5" />
          Games
        </Link>
        <Link 
          to="/admin" 
          onClick={toggleMenu}
          className="flex items-center px-6 py-3 text-sm font-medium no-underline text-gray-900 hover:bg-blue-50 hover:text-blue-600"
        >
          <Shield className="mr-2 w-5 h-5" />
          Admin
        </Link>
      </nav>
    </header>
  );
};

export default Header;
