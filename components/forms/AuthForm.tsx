import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { EyeIcon, EyeSlashIcon } from '../../constants';

const AuthForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await login(email, password);
    if (!success) {
      setError('Email ou mot de passe incorrect. Veuillez réessayer.');
    }
  };

  const commonInputClass = "mt-1 block w-full px-4 py-3.5 rounded-lg shadow-sm focus:outline-none focus:ring-2 sm:text-sm transition-colors bg-themeColors-pageBgLight dark:bg-themeColors-pageBgDark border-themeColors-borderLight dark:border-themeColors-borderDark placeholder-themeColors-textSecondaryLight/70 dark:placeholder-themeColors-textSecondaryDark/70 text-themeColors-textPrimaryLight dark:text-themeColors-textPrimaryDark focus:ring-themeColors-accentLight dark:focus:ring-themeColors-accentDark focus:border-transparent";
  const commonLabelClass = "block text-sm font-semibold text-themeColors-textSecondaryLight dark:text-themeColors-textSecondaryDark";

  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center p-4 bg-themeColors-pageBgLight dark:bg-themeColors-pageBgDark">
      <div className="w-full max-w-4xl flex flex-col md:flex-row bg-themeColors-cardBgLight dark:bg-themeColors-cardBgDark border border-themeColors-borderLight/50 dark:border-themeColors-borderDark/50 rounded-2xl shadow-custom-light dark:shadow-custom-dark overflow-hidden">
        
        <div className="w-full md:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold font-heading text-themeColors-textPrimaryLight dark:text-themeColors-textPrimaryDark mb-3">
              Espace Admin
            </h1>
            <p className="text-themeColors-textSecondaryLight dark:text-themeColors-textSecondaryDark text-md">
              Connectez-vous pour gérer les activités et le contenu du site.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className={commonLabelClass}>
                Adresse e-mail
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={commonInputClass}
                placeholder="votreadmin@exemple.com"
              />
            </div>
            <div>
              <label htmlFor="password" className={commonLabelClass}>
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`${commonInputClass} pr-12`}
                  placeholder="Votre mot de passe secret"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 px-4 flex items-center text-sm leading-5 text-themeColors-textSecondaryLight dark:text-themeColors-textSecondaryDark hover:text-themeColors-accentLight dark:hover:text-themeColors-accentDark"
                  aria-label={showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <label htmlFor="rememberMe" className="flex items-center cursor-pointer">
                <input type="checkbox" id="rememberMe" className="h-4 w-4 text-themeColors-accentLight dark:text-themeColors-accentDark rounded focus:ring-themeColors-accentLight dark:focus:ring-themeColors-accentDark bg-themeColors-pageBgLight dark:bg-themeColors-pageBgDark border-themeColors-borderLight dark:border-themeColors-borderDark" />
                <span className="ml-2 text-themeColors-textSecondaryLight dark:text-themeColors-textSecondaryDark">Se souvenir de moi</span>
              </label>
              <a href="#" className="font-medium text-themeColors-textSecondaryLight hover:text-themeColors-accentLight dark:text-themeColors-textSecondaryDark dark:hover:text-themeColors-accentDark transition-colors">
                Mot de passe oublié ?
              </a>
            </div>

            {error && (
              <p className="text-sm text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-500/20 p-3.5 rounded-lg text-center border border-red-300 dark:border-red-500/30">
                {error}
              </p>
            )}
            
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3.5 text-base"
              >
                {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      <span>Connexion...</span>
                    </div>
                  ) : 'Se connecter'}
              </button>
            </div>
          </form>
        </div>

        <div className="hidden md:block md:w-1/2">
          <img 
            src="https://picsum.photos/seed/adminlogin/800/1200?random=5&blur=1"
            alt="Illustration abstraite et apaisante pour la page de connexion" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
