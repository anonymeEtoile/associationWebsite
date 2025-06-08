import React, { useState, useEffect, useMemo } from 'react';
import { Activity } from '../types';
import ActivityCard from '../components/ActivityCard';
import { getActivities } from '../services/dataService';

enum ActivityFilter {
  All = 'all',
  Upcoming = 'upcoming',
  Past = 'past',
}

const ActivitiesPage: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<ActivityFilter>(ActivityFilter.Upcoming);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchActivities = async () => {
      setIsLoading(true);
      try {
        const data = await getActivities();
        setActivities(data.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      } catch (error) {
        console.error("Erreur lors de la récupération des activités:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchActivities();
  }, []);

  const filteredActivities = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return activities
      .filter(activity => {
        if (filter === ActivityFilter.Upcoming) return activity.date >= today;
        if (filter === ActivityFilter.Past) return activity.date < today;
        return true; // All
      })
      .filter(activity => 
        activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a,b) => {
        if (filter === ActivityFilter.Upcoming) return new Date(a.date).getTime() - new Date(b.date).getTime();
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
  }, [activities, filter, searchTerm]);

  const FilterButton: React.FC<{
    value: ActivityFilter;
    currentFilter: ActivityFilter;
    onClick: (value: ActivityFilter) => void;
    children: React.ReactNode;
  }> = ({ value, currentFilter, onClick, children }) => (
    <button
      onClick={() => onClick(value)}
      className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-opacity-50 ${
        currentFilter === value
          ? 'bg-themeColors-accentLight dark:bg-themeColors-accentDark text-white dark:text-themeColors-pageBgDark shadow-md focus:ring-themeColors-accentLight dark:focus:ring-themeColors-accentDark'
          : 'bg-themeColors-cardBgLight dark:bg-themeColors-cardBgDark border border-themeColors-borderLight dark:border-themeColors-borderDark text-themeColors-textSecondaryLight dark:text-themeColors-textSecondaryDark hover:bg-themeColors-accentLight/10 dark:hover:bg-themeColors-accentDark/10 hover:border-themeColors-accentLight/50 dark:hover:border-themeColors-accentDark/50 focus:ring-themeColors-accentLight/70 dark:focus:ring-themeColors-accentDark/70'
      }`}
    >
      {children}
    </button>
  );

  if (isLoading && activities.length === 0) {
    return (
        <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-themeColors-accentLight dark:border-themeColors-accentDark mx-auto"></div>
            <p className="mt-6 text-xl text-themeColors-textSecondaryLight dark:text-themeColors-textSecondaryDark">Chargement des activités...</p>
        </div>
    );
  }

  return (
    <div className="space-y-12 md:space-y-16">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold font-heading text-themeColors-textPrimaryLight dark:text-themeColors-textPrimaryDark mb-3">
            Explorez Nos Activités
        </h1>
        <p className="text-lg text-themeColors-textSecondaryLight dark:text-themeColors-textSecondaryDark max-w-2xl mx-auto">
            Que vous cherchiez à apprendre, partager ou simplement vous amuser, il y a une place pour vous.
        </p>
      </div>
      
      <div className="sticky top-20 z-30 bg-themeColors-pageBgLight/80 dark:bg-themeColors-pageBgDark/80 backdrop-blur-sm py-4 rounded-xl">
        <div className="p-5 bg-themeColors-cardBgLight dark:bg-themeColors-cardBgDark rounded-xl shadow-custom-light dark:shadow-custom-dark border border-themeColors-borderLight/50 dark:border-themeColors-borderDark/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3">
              <FilterButton value={ActivityFilter.Upcoming} currentFilter={filter} onClick={setFilter}>À Venir</FilterButton>
              <FilterButton value={ActivityFilter.Past} currentFilter={filter} onClick={setFilter}>Passées</FilterButton>
              <FilterButton value={ActivityFilter.All} currentFilter={filter} onClick={setFilter}>Toutes</FilterButton>
            </div>
            <input 
              type="text"
              placeholder="Rechercher par mot-clé..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2.5 w-full md:w-72 border rounded-lg focus:ring-2 focus:ring-themeColors-accentLight dark:focus:ring-themeColors-accentDark focus:border-transparent bg-themeColors-cardBgLight dark:bg-themeColors-cardBgDark border-themeColors-borderLight dark:border-themeColors-borderDark text-themeColors-textPrimaryLight dark:text-themeColors-textPrimaryDark placeholder-themeColors-textSecondaryLight/70 dark:placeholder-themeColors-textSecondaryDark/70 shadow-sm transition-colors"
            />
          </div>
        </div>
      </div>

      {isLoading && activities.length > 0 ? (
         <div className="text-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-themeColors-accentLight dark:border-themeColors-accentDark mx-auto"></div>
            <p className="mt-3 text-themeColors-textSecondaryLight dark:text-themeColors-textSecondaryDark">Mise à jour...</p>
          </div>
      ) : filteredActivities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
          {filteredActivities.map(activity => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-themeColors-cardBgLight dark:bg-themeColors-cardBgDark rounded-xl shadow-custom-light dark:shadow-custom-dark border border-themeColors-borderLight/30 dark:border-themeColors-borderDark/30">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto text-themeColors-borderLight dark:text-themeColors-borderDark mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75s.168-.75.375-.75S9.75 9.336 9.75 9.75Zm-4.5 0c0 .414-.168.75-.375.75S4.5 10.164 4.5 9.75s.168-.75.375-.75S5.25 9.336 5.25 9.75Zm10.5-1.125c0-.414-.168-.75-.375-.75s-.375.336-.375.75s.168.75.375.75s.375-.336.375-.75Z" />
          </svg>
          <p className="text-xl font-semibold text-themeColors-textPrimaryLight dark:text-themeColors-textPrimaryDark mb-2">Oops! Rien par ici...</p>
          <p className="text-themeColors-textSecondaryLight dark:text-themeColors-textSecondaryDark">
            Aucune activité ne correspond à vos critères. Essayez d'ajuster vos filtres ou votre recherche.
          </p>
        </div>
      )}
    </div>
  );
};

export default ActivitiesPage;
