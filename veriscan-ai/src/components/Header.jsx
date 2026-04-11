import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isHome = location.pathname === '/';
  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Features', path: '/features' },
    { label: 'How it Works', path: '/scan' },
    { label: 'About', path: '/about' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isHome
          ? 'glass-dark border-b border-purple-900/20'
          : 'bg-white border-b border-slate-200 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 no-underline group">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black text-white flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #6D28D9 0%, #4C1D95 100%)', boxShadow: '0 2px 10px rgba(76,29,149,0.4)' }}
          >
            VS
          </div>
          <span className={`text-xl font-bold tracking-tight ${isHome ? 'text-[#EDE9FE]' : 'text-[#0F172A]'}`}>
            Veri<span className="text-gradient-purple">Scan</span>
            <span className={isHome ? 'text-[#EDE9FE]' : 'text-[#0F172A]'}> AI</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 no-underline ${
                isHome
                  ? isActive(link.path)
                    ? 'text-[#C4B5FD] bg-purple-900/20'
                    : 'text-slate-400 hover:text-[#EDE9FE] hover:bg-purple-900/15'
                  : isActive(link.path)
                    ? 'text-[#6D28D9] bg-purple-50'
                    : 'text-slate-500 hover:text-[#6D28D9] hover:bg-purple-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/scan"
            className="ml-3 px-5 py-2.5 rounded-full text-sm font-bold text-white no-underline btn-dark-primary"
          >
            Verify Now
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className={`md:hidden p-2 rounded-lg transition-colors cursor-pointer border-0 bg-transparent ${
            isHome ? 'text-slate-300 hover:bg-purple-900/20' : 'text-slate-600 hover:bg-slate-100'
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className={`md:hidden border-t px-6 py-4 flex flex-col gap-1 ${
            isHome ? 'glass-dark border-purple-900/20' : 'bg-white border-slate-200'
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium no-underline transition-all ${
                isHome
                  ? 'text-slate-300 hover:text-white hover:bg-purple-900/20'
                  : 'text-slate-600 hover:text-[#6D28D9] hover:bg-purple-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/scan"
            onClick={() => setMenuOpen(false)}
            className="mt-2 px-5 py-3 rounded-full text-sm font-bold text-white text-center btn-dark-primary no-underline"
          >
            Verify Now
          </Link>
        </div>
      )}
    </header>
  );
}
