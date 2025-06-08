import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Activity } from '../types';
import ActivityCard from '../components/ActivityCard';
import { getActivities } from '../services/dataService';
import { ASSOCIATION_CITY, CalendarIcon, ChatBubbleLeftEllipsisIcon } from '../constants';

const GeometricArtPiece: React.FC<{ variant: 'hero' | 'mission' | 'historyTeaser' }> = ({ variant }) => {
  if (variant === 'hero') {
    return (
      <div className="w-full h-full flex items-center justify-center p-2 md:p-4">
        <div className="grid grid-cols-7 grid-rows-5 gap-2 md:gap-3 aspect-[10/7] w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
          {/* Row 1 */}
          <div className="col-start-1 row-start-1 col-span-2 row-span-2 bg-themeColors-accentLight dark:bg-themeColors-accentDark rounded-lg shadow-md"></div>
          <div className="col-start-3 row-start-1 col-span-1 row-span-1 bg-neutral-200 dark:bg-neutral-700 rounded-md shadow-sm"></div>
          <div className="col-start-5 row-start-1 col-span-1 row-span-1 bg-themeColors-greenAccent3Light dark:bg-themeColors-greenAccent3Dark rounded-sm shadow-sm"></div>
          {/* Row 2 */}
          <div className="col-start-3 row-start-2 col-span-1 row-span-1 bg-neutral-800 dark:bg-neutral-900 rounded-md shadow-sm"></div>
          <div className="col-start-4 row-start-2 col-span-2 row-span-2 bg-themeColors-greenAccent3Light dark:bg-themeColors-greenAccent3Dark rounded-xl shadow-md"></div>
          <div className="col-start-6 row-start-2 col-span-2 row-span-1 bg-[url('https://picsum.photos/seed/heroArtSM/200/100')] bg-cover bg-center rounded-lg shadow-lg"></div>
          {/* Row 3 */}
          <div className="col-start-1 row-start-3 col-span-3 row-span-2 bg-[url('https://picsum.photos/seed/heroArtLG/400/300')] bg-cover bg-center rounded-xl shadow-xl"></div>
          <div className="col-start-6 row-start-3 col-span-1 row-span-1 bg-neutral-200 dark:bg-neutral-700 rounded-md shadow-sm"></div>
          {/* Row 4 */}
          <div className="col-start-4 row-start-4 col-span-1 row-span-1 bg-themeColors-accentLight dark:bg-themeColors-accentDark rounded-md transform scale-90 shadow-sm"></div>
          <div className="col-start-5 row-start-4 col-span-2 row-span-2 bg-neutral-800 dark:bg-neutral-900 rounded-lg shadow-md"></div>
          {/* Row 5 */}
          <div className="col-start-1 row-start-5 col-span-1 row-span-1 bg-neutral-200 dark:bg-neutral-700 rounded-sm"></div>
          <div className="col-start-2 row-start-5 col-span-2 row-span-1 bg-themeColors-greenAccent3Light dark:bg-themeColors-greenAccent3Dark rounded-md shadow-sm"></div>
          <div className="col-start-7 row-start-5 col-span-1 row-span-1 bg-themeColors-accentLight dark:bg-themeColors-accentDark rounded-sm transform scale-75 shadow-sm"></div>
        </div>
      </div>
    );
  }

  if (variant === 'historyTeaser') {
    return (
      <div className="w-full h-full min-h-[300px] md:min-h-[400px] flex items-center justify-center p-4">
        <div className="w-full aspect-[4/3] max-w-lg bg-themeColors-greenAccent2Light dark:bg-themeColors-greenAccent2Dark rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-out hover:shadow-custom-light dark:hover:shadow-custom-dark">
          <img
            src="https://picsum.photos/seed/historyarchive/600/450"
            alt="Archive historique de l'association"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    );
  }

  return null;
};

const HomePage: React.FC = () => {
  const [upcomingActivities, setUpcomingActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUpcoming = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const allActivities = await getActivities();
        const today = new Date().toISOString().split('T')[0];
        const future = allActivities
          .filter(act => act.date >= today)
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .slice(0, 3);
        setUpcomingActivities(future);
      } catch (err: any) {
        console.error("Erreur lors de la récupération des activités:", err);
        setError(err.message || "Une erreur est survenue.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUpcoming();
  }, []);

  const statItems = [
    {
      value: "150+",
      label: "Participants réguliers",
      icon: <ChatBubbleLeftEllipsisIcon />,
    },
    { value: "50+", label: "Événements annuels", icon: <CalendarIcon /> },
    {
      value: "15+",
      label: "Années d'existence",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.31h5.418a.563.563 0 0 1 .321.988l-4.204 3.192a.563.563 0 0 0-.182.557l1.285 5.022a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.652 0l-4.725 2.885a.562.562 0 0 1-.84-.61l1.285-5.022a.563.563 0 0 0-.182-.557l-4.204-3.192a.563.563 0 0 1 .321-.988H8.88a.563.563 0 0 0 .475-.31l2.125-5.11Z"
          />
        </svg>
      ),
    },
  ];

  const sectionVerticalSpacing = "py-16 md:py-20 lg:py-24";

  const contentBlockStyling =
    "bg-themeColors-blockSecondaryBgLight dark:bg-themeColors-blockSecondaryBgDark border border-themeColors-greenAccent2Light dark:border-themeColors-greenAccent2Dark p-6 md:p-8 lg:p-10 rounded-3xl shadow-custom-light dark:shadow-custom-dark";

  // Button class for most buttons
  const primaryButtonClass =
    "text-black dark:text-white px-6 py-3 rounded-lg font-medium bg-[#80b84c] hover:bg-[#6ca242] dark:bg-[#98db90] dark:hover:bg-[#82c47d] transition-colors duration-200";

  // Specific button class for "Découvrir nos activités"
  const discoverButtonClass =
    "text-black dark:text-white px-6 py-3 rounded-lg font-medium bg-[#e9f3df] hover:bg-[#d3e0c8] dark:bg-[#1a3b18] dark:hover:bg-[#2a4b28] transition-colors duration-200";

  return (
    <div>
      {/* Hero Section */}
      <section
        className={`container mx-auto flex flex-col md:flex-row min-h-[calc(90vh-var(--header-height,5rem))] items-stretch ${sectionVerticalSpacing}`}
      >
        <div className="w-full md:w-3/5 flex flex-col justify-center items-start text-left p-4 sm:p-6 lg:p-8 xl:pr-16 z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-heading text-themeColors-textPrimaryLight dark:text-themeColors-textPrimaryDark mb-6 md:mb-8 leading-tight">
            Tisser des liens,{" "}
            <span className="block">
              au cœur de{" "}
              <span className="text-themeColors-accentLight dark:text-themeColors-accentDark">
                {ASSOCIATION_CITY}
              </span>
              .
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-themeColors-textSecondaryLight dark:text-themeColors-textSecondaryDark max-w-xl mb-10 md:mb-12 leading-relaxed">
            Rejoignez notre communauté dynamique pour des moments de partage, des
            activités conviviales et pour enrichir ensemble la vie de notre cher
            village.
          </p>
          <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-5">
            <Link to="/activites" className={discoverButtonClass}>
              Découvrir nos activités
            </Link>
            <Link to="/histoire" className={primaryButtonClass}>
              Notre Histoire
            </Link>
          </div>
        </div>
        <div className="w-full md:w-2/5 flex items-center justify-center mt-10 md:mt-0 z-0">
          <GeometricArtPiece variant="hero" />
        </div>
      </section>

      {/* "Notre Mission" Section */}
      <section className={`container mx-auto ${sectionVerticalSpacing}`}>
        <div className={`${contentBlockStyling} flex flex-col items-stretch`}>
          <div className="w-full flex flex-col justify-center items-start text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-themeColors-textPrimaryLight dark:text-themeColors-textPrimaryDark mb-6 md:mb-8">
              Notre Mission :{" "}
              <span className="text-themeColors-accentLight dark:text-themeColors-accentDark">
                Cultiver la Convivialité
              </span>
            </h2>
            <div className="space-y-5 text-base sm:text-lg text-themeColors-textSecondaryLight dark:text-themeColors-textSecondaryDark leading-relaxed mb-10 md:mb-12">
              <p>
                Au cœur de {ASSOCIATION_CITY}, notre association s'engage à
                renforcer le lien social. Nous croyons que chaque rencontre, chaque
                sourire échangé, chaque idée partagée contribue à un village plus
                uni, vibrant et solidaire.
              </p>
              <p>
                Nous organisons des cafés conviviaux, des ateliers créatifs pour
                tous les âges, des événements festifs qui animent nos rues, et des
                moments de partage simples mais précieux. Notre porte est toujours
                ouverte à ceux qui souhaitent s'impliquer ou simplement passer un
                bon moment.
              </p>
            </div>
            <Link to="/contact" className={primaryButtonClass}>
              Rejoignez-nous !
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`container mx-auto ${sectionVerticalSpacing}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {statItems.map((item, index) => (
            <div
              key={index}
              className="bg-themeColors-cardBgLight dark:bg-themeColors-cardBgDark p-6 py-8 md:p-8 rounded-2xl shadow-subtle-light dark:shadow-subtle-dark border border-black/5 dark:border-white/10 text-center flex flex-col items-center"
            >
              {React.cloneElement(item.icon, {
                className:
                  "w-10 h-10 md:w-12 md:h-12 mb-4 text-themeColors-highlightLight dark:text-themeColors-highlightDark",
              })}
              <p className="text-3xl md:text-4xl font-bold font-heading text-themeColors-textPrimaryLight dark:text-themeColors-textPrimaryDark mb-1">
                {item.value}
              </p>
              <p className="text-sm md:text-base text-themeColors-textSecondaryLight dark:text-themeColors-textSecondaryDark">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* "Prochains Événements" */}
      <section className={`container mx-auto ${sectionVerticalSpacing}`}>
        <div className={`${contentBlockStyling}`}>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-themeColors-textPrimaryLight dark:text-themeColors-textPrimaryDark mb-4">
              Prochains Rendez-vous
            </h2>
            <p className="text-base sm:text-lg text-themeColors-textSecondaryLight dark:text-themeColors-textSecondaryDark max-w-2xl mx-auto">
              Ne manquez pas nos prochains événements. C'est l'occasion parfaite
              pour se rencontrer, échanger et partager !
            </p>
          </div>
          {isLoading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-themeColors-accentLight dark:border-themeColors-accentDark mx-auto"></div>
              <p className="mt-4 text-themeColors-textSecondaryLight dark:text-themeColors-textSecondaryDark">
                Chargement des événements...
              </p>
            </div>
          ) : error ? (
            <p className="text-center text-red-500 dark:text-red-400 py-10">
              {error}
            </p>
          ) : upcomingActivities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {upcomingActivities.map(activity => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          ) : (
            <p className="text-center text-themeColors-textSecondaryLight dark:text-themeColors-textSecondaryDark py-10 text-lg">
              Aucun événement programmé pour le moment. Revenez bientôt pour de
              nouvelles aventures !
            </p>
          )}
          <div className="text-center mt-12 md:mt-16">
            <Link to="/activites" className={primaryButtonClass}>
              Voir toutes les activités
            </Link>
          </div>
        </div>
      </section>

      {/* "Un Voyage au Cœur de Notre Communauté" (History Teaser) */}
      <section className={`container mx-auto ${sectionVerticalSpacing}`}>
        <div
          className={`${contentBlockStyling} flex flex-col md:flex-row items-stretch gap-10 md:gap-12 lg:gap-16`}
        >
          <div className="w-full md:w-3/5 flex flex-col justify-center items-start text-left xl:pr-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-themeColors-textPrimaryLight dark:text-themeColors-textPrimaryDark mb-6 md:mb-8">
              Un Voyage au Cœur de Notre Communauté
            </h2>
            <p className="text-base sm:text-lg text-themeColors-textSecondaryLight dark:text-themeColors-textSecondaryDark leading-relaxed mb-10 md:mb-12 max-w-xl">
              Depuis nos modestes débuts il y a plus de quinze ans, chaque
              chapitre de notre histoire a été écrit avec passion, engagement et le
              sourire de nos membres. Découvrez comment, ensemble, nous avons animé{" "}
              {ASSOCIATION_CITY} et tissé des liens qui durent.
            </p>
            <Link to="/histoire" className={primaryButtonClass}>
              Lire notre histoire
            </Link>
          </div>
          <div className="w-full md:w-2/5 flex items-center justify-center p-4 md:p-0">
            <GeometricArtPiece variant="historyTeaser" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;