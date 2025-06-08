

import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';
import { APP_NAME, ASSOCIATION_MOTTO, ASSOCIATION_EMAIL, ASSOCIATION_PHONE, ASSOCIATION_ADDRESS, MailIcon, PhoneIcon, LocationMarkerIcon, SunIcon, MoonIcon } from '../constants'; // Assurez-vous que SunIcon et MoonIcon sont exportés depuis constants ou utilisez ThemeSwitcher tel quel
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 font-heading tracking-wide ${
      isActive
        ? 'bg-themeColors-accentLight dark:bg-themeColors-accentDark text-white dark:text-themeColors-pageBgDark shadow-md'
        : 'text-themeColors-textPrimaryLight dark:text-themeColors-textPrimaryDark hover:text-themeColors-accentLight dark:hover:text-themeColors-accentDark hover:bg-themeColors-accentLight/10 dark:hover:bg-themeColors-accentDark/10'
    }`;
  
  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  `block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 font-heading tracking-wide ${
    isActive
      ? 'bg-themeColors-accentLight dark:bg-themeColors-accentDark text-white dark:text-themeColors-pageBgDark shadow-md'
      : 'text-themeColors-textPrimaryLight dark:text-themeColors-textPrimaryDark hover:text-themeColors-accentLight dark:hover:text-themeColors-accentDark hover:bg-themeColors-accentLight/10 dark:hover:bg-themeColors-accentDark/10'
  }`;

  return (
    <header className="bg-themeColors-cardBgLight/80 dark:bg-themeColors-cardBgDark/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-themeColors-borderLight/50 dark:border-themeColors-borderDark/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="text-3xl font-bold font-heading text-themeColors-accentLight dark:text-themeColors-accentDark hover:opacity-80 transition-opacity">
            {APP_NAME}
          </Link>
          <nav className="hidden md:flex items-center space-x-2">
            <NavLink to="/" className={navLinkClass} end>Accueil</NavLink>
            <NavLink to="/activites" className={navLinkClass}>Activités</NavLink>
            <NavLink to="/histoire" className={navLinkClass}>Notre Histoire</NavLink>
            <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
            {isAuthenticated && (
              <NavLink to="/admin" className={navLinkClass}>Admin</NavLink>
            )}
             {isAuthenticated && (
              <button
                onClick={logout}
                className="px-4 py-2 rounded-lg text-sm font-medium font-heading tracking-wide text-themeColors-textSecondaryLight dark:text-themeColors-textSecondaryDark hover:text-themeColors-accentLight dark:hover:text-themeColors-accentDark hover:bg-themeColors-accentLight/10 dark:hover:bg-themeColors-accentDark/10"
              >
                Déconnexion
              </button>
            )}
            <ThemeSwitcher />
          </nav>
          <div className="md:hidden flex items-center">
            <ThemeSwitcher />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="ml-3 p-2 rounded-md text-themeColors-textPrimaryLight dark:text-themeColors-textPrimaryDark hover:bg-themeColors-accentLight/10 dark:hover:bg-themeColors-accentDark/10 focus:outline-none"
              aria-label="Menu principal"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-themeColors-cardBgLight dark:bg-themeColors-cardBgDark shadow-xl border-t border-themeColors-borderLight/50 dark:border-themeColors-borderDark/50 z-40 p-4">
          <nav className="flex flex-col space-y-2">
            <NavLink to="/" className={mobileNavLinkClass} end onClick={() => setMobileMenuOpen(false)}>Accueil</NavLink>
            <NavLink to="/activites" className={mobileNavLinkClass} onClick={() => setMobileMenuOpen(false)}>Activités</NavLink>
            <NavLink to="/histoire" className={mobileNavLinkClass} onClick={() => setMobileMenuOpen(false)}>Notre Histoire</NavLink>
            <NavLink to="/contact" className={mobileNavLinkClass} onClick={() => setMobileMenuOpen(false)}>Contact</NavLink>
            {isAuthenticated && (
              <NavLink to="/admin" className={mobileNavLinkClass} onClick={() => setMobileMenuOpen(false)}>Admin</NavLink>
            )}
            {isAuthenticated && (
              <button
                onClick={() => { logout(); setMobileMenuOpen(false); }}
                className={mobileNavLinkClass({isActive:false})} // pass isActive false to get base style
              >
                Déconnexion
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-themeColors-cardBgLight dark:bg-themeColors-cardBgDark border-t border-themeColors-borderLight/30 dark:border-themeColors-borderDark/30 mt-auto text-themeColors-textSecondaryLight dark:text-themeColors-textSecondaryDark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10 text-sm">
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold font-heading text-themeColors-textPrimaryLight dark:text-themeColors-textPrimaryDark mb-4">{APP_NAME}</h3>
            <p className="max-w-md">
              {ASSOCIATION_MOTTO}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold font-heading text-themeColors-textPrimaryLight dark:text-themeColors-textPrimaryDark mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/activites" className="hover:text-themeColors-accentLight dark:hover:text-themeColors-accentDark transition-colors">Nos activités</Link></li>
              <li><Link to="/histoire" className="hover:text-themeColors-accentLight dark:hover:text-themeColors-accentDark transition-colors">Notre histoire</Link></li>
              <li><Link to="/contact" className="hover:text-themeColors-accentLight dark:hover:text-themeColors-accentDark transition-colors">Nous contacter</Link></li>
              <li><Link to="/admin" className="hover:text-themeColors-accentLight dark:hover:text-themeColors-accentDark transition-colors">Espace Admin</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold font-heading text-themeColors-textPrimaryLight dark:text-themeColors-textPrimaryDark mb-4">Restons Connectés</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MailIcon className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-themeColors-highlightLight dark:text-themeColors-highlightDark" />
                <a href={`mailto:${ASSOCIATION_EMAIL}`} className="hover:text-themeColors-accentLight dark:hover:text-themeColors-accentDark transition-colors break-all">{ASSOCIATION_EMAIL}</a>
              </li>
              <li className="flex items-start">
                <PhoneIcon className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-themeColors-highlightLight dark:text-themeColors-highlightDark" />
                <a href={`tel:${ASSOCIATION_PHONE.replace(/\s/g, '')}`} className="hover:text-themeColors-accentLight dark:hover:text-themeColors-accentDark transition-colors">{ASSOCIATION_PHONE}</a>
              </li>
              <li className="flex items-start">
                <LocationMarkerIcon className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-themeColors-highlightLight dark:text-themeColors-highlightDark" />
                <span>{ASSOCIATION_ADDRESS}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-themeColors-borderLight/50 dark:border-themeColors-borderDark/50 pt-10 text-center text-xs text-themeColors-textSecondaryLight/80 dark:text-themeColors-textSecondaryDark/80">
          <p>&copy; {new Date().getFullYear()} {APP_NAME}. Tous droits réservés. Site avec <span className="text-red-500">❤</span> par la communauté.</p>
        </div>
      </div>
    </footer>
  );
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-themeColors-pageBgLight dark:bg-themeColors-pageBgDark text-themeColors-textPrimaryLight dark:text-themeColors-textPrimaryDark selection:bg-themeColors-accentLight/30 selection:text-themeColors-accentHoverLight dark:selection:bg-themeColors-accentDark/30 dark:selection:text-themeColors-accentHoverDark">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;