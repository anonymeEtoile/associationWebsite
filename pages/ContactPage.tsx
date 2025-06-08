import React, { useState } from 'react';
import { APP_NAME, ASSOCIATION_EMAIL, ASSOCIATION_PHONE, ASSOCIATION_ADDRESS, MailIcon, PhoneIcon, LocationMarkerIcon } from '../constants';

const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Form submitted:', { name, email, message });
    setIsLoading(false);
    setIsSubmitted(true);
    // Réinitialiser le formulaire après un délai pour que l'utilisateur voie le message de succès
    setTimeout(() => {
        setIsSubmitted(false); 
        setName('');
        setEmail('');
        setMessage('');
    }, 6000);
  };

  const commonInputClass = "mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none sm:text-sm bg-themeColors-cardBgLight dark:bg-themeColors-pageBgDark border-themeColors-borderLight dark:border-themeColors-borderDark text-themeColors-textPrimaryLight dark:text-themeColors-textPrimaryDark placeholder-themeColors-textSecondaryLight/70 dark:placeholder-themeColors-textSecondaryDark/70 focus:ring-2 focus:ring-themeColors-accentLight dark:focus:ring-themeColors-accentDark focus:border-transparent transition-colors";
  const commonLabelClass = "block text-sm font-semibold text-themeColors-textSecondaryLight dark:text-themeColors-textSecondaryDark mb-1";

  return (
    <div className="space-y-16 md:space-y-20">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold font-heading text-themeColors-textPrimaryLight dark:text-themeColors-textPrimaryDark mb-3">Prenons Contact</h1>
        <p className="text-lg text-themeColors-textSecondaryLight dark:text-themeColors-textSecondaryDark max-w-2xl mx-auto">
            Une question, une suggestion, ou envie de nous rejoindre ? N'hésitez pas !
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-10 lg:gap-12 items-start">
        <section className="lg:col-span-3 bg-themeColors-cardBgLight dark:bg-themeColors-cardBgDark p-8 md:p-10 rounded-2xl shadow-custom-light dark:shadow-custom-dark border border-themeColors-borderLight/30 dark:border-themeColors-borderDark/30">
          <h2 className="text-2xl lg:text-3xl font-bold font-heading text-themeColors-accentLight dark:text-themeColors-accentDark mb-8">Écrivez-nous</h2>
          {isSubmitted ? (
            <div className="p-6 bg-themeColors-accentLight/10 dark:bg-themeColors-accentDark/20 border-l-4 border-themeColors-accentLight dark:border-themeColors-accentDark text-themeColors-accentLight dark:text-themeColors-accentDark rounded-lg">
              <p className="font-semibold text-lg mb-1">Message envoyé avec succès !</p>
              <p className="text-sm">Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className={commonLabelClass}>Votre nom</label>
                  <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className={commonInputClass} />
                </div>
                <div>
                  <label htmlFor="email" className={commonLabelClass}>Votre e-mail</label>
                  <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className={commonInputClass} />
                </div>
              </div>
              <div>
                <label htmlFor="message" className={commonLabelClass}>Votre message</label>
                <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} rows={6} required className={commonInputClass}></textarea>
              </div>
              <div>
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full btn-primary py-3.5"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      <span>Envoi...</span>
                    </div>
                  ) : 'Envoyer le message'}
                </button>
              </div>
            </form>
          )}
        </section>

        <section className="lg:col-span-2 space-y-8">
          <div className="bg-themeColors-cardBgLight dark:bg-themeColors-cardBgDark p-8 md:p-10 rounded-2xl shadow-custom-light dark:shadow-custom-dark border border-themeColors-borderLight/30 dark:border-themeColors-borderDark/30">
            <h2 className="text-2xl lg:text-3xl font-bold font-heading text-themeColors-accentLight dark:text-themeColors-accentDark mb-6">Nos Coordonnées</h2>
            <address className="not-italic text-themeColors-textSecondaryLight dark:text-themeColors-textSecondaryDark space-y-4 text-md">
              <p className="font-semibold text-lg text-themeColors-textPrimaryLight dark:text-themeColors-textPrimaryDark">{APP_NAME}</p>
              <div className="flex items-start">
                <LocationMarkerIcon className="w-6 h-6 mr-3 mt-1 text-themeColors-highlightLight dark:text-themeColors-highlightDark flex-shrink-0"/>
                <span>{ASSOCIATION_ADDRESS}, France</span>
              </div>
              <div className="flex items-start">
                <MailIcon className="w-6 h-6 mr-3 mt-1 text-themeColors-highlightLight dark:text-themeColors-highlightDark flex-shrink-0"/>
                <a href={`mailto:${ASSOCIATION_EMAIL}`} className="text-themeColors-accentLight dark:text-themeColors-accentDark hover:underline">{ASSOCIATION_EMAIL}</a>
              </div>
              <div className="flex items-start">
                <PhoneIcon className="w-6 h-6 mr-3 mt-1 text-themeColors-highlightLight dark:text-themeColors-highlightDark flex-shrink-0"/>
                <a href={`tel:${ASSOCIATION_PHONE.replace(/\s/g, '')}`} className="text-themeColors-accentLight dark:text-themeColors-accentDark hover:underline">{ASSOCIATION_PHONE}</a>
              </div>
            </address>
          </div>
          
          <div className="bg-themeColors-cardBgLight dark:bg-themeColors-cardBgDark border border-themeColors-borderLight/30 dark:border-themeColors-borderDark/30 rounded-2xl shadow-custom-light dark:shadow-custom-dark overflow-hidden">
             <h2 className="text-xl lg:text-2xl font-bold font-heading text-themeColors-accentLight dark:text-themeColors-accentDark pt-6 px-6 md:pt-8 md:px-8">Où Nous Trouver ?</h2>
            <div className="aspect-w-16 aspect-h-9">
                <iframe 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    scrolling="no" 
                    marginHeight={0} 
                    marginWidth={0} 
                    src="https://www.openstreetmap.org/export/embed.html?bbox=2.22412109375%2C48.81557342706898%2C2.46978759765625%2C48.90214554400001&layer=mapnik&marker=48.858370%2C2.294481"
                    className="dark:filter dark:grayscale-[60%] dark:brightness-90 dark:contrast-120"
                    title="Carte OpenStreetMap de notre localisation"
                    aria-label="Carte OpenStreetMap montrant la localisation de l'association"
                ></iframe>
            </div>
            <small className="block text-center p-3 text-xs text-themeColors-textSecondaryLight/80 dark:text-themeColors-textSecondaryDark/80">
                <a href="https://www.openstreetmap.org/?mlat=48.85837&mlon=2.29448#map=16/48.85837/2.29448" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-themeColors-accentLight dark:hover:text-themeColors-accentDark">
                    Voir la carte en grand sur OpenStreetMap
                </a>
            </small>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactPage;
