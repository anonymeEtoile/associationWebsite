import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import AuthForm from '../components/forms/AuthForm';
import ActivityForm from '../components/forms/ActivityForm';
import Modal from '../components/Modal';
import PageContentEditModal from '../components/modals/PageContentEditModal';
import { Activity, EditablePageData } from '../types';
import { getActivities, addActivity, updateActivity, deleteActivity, getPageData, savePageData } from '../services/dataService';
import { PlusCircleIcon, PencilIcon, TrashIcon } from '../constants';
import { HISTORY_PAGE_KEY } from '../constants';

const AdminDashboard: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoadingActivities, setIsLoadingActivities] = useState(true);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [activityFormIsLoading, setActivityFormIsLoading] = useState(false);
  
  const [historyPageData, setHistoryPageData] = useState<EditablePageData | null>(null);
  const [isLoadingHistoryData, setIsLoadingHistoryData] = useState(true);
  const [isPageContentModalOpen, setIsPageContentModalOpen] = useState(false);
  const [pageContentFormIsLoading, setPageContentFormIsLoading] = useState(false);

  const { logout } = useAuth();

  const fetchActivitiesData = useCallback(async () => {
    setIsLoadingActivities(true);
    try {
      const data = await getActivities();
      setActivities(data.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    } catch (error) {
      console.error("Erreur de chargement des activités:", error);
    } finally {
      setIsLoadingActivities(false);
    }
  }, []);

  const fetchHistoryPageData = useCallback(async () => {
    setIsLoadingHistoryData(true);
    try {
      const data = await getPageData(HISTORY_PAGE_KEY);
      setHistoryPageData(data);
    } catch (error) {
      console.error("Erreur de chargement du contenu de la page Histoire:", error);
    } finally {
      setIsLoadingHistoryData(false);
    }
  }, []);

  useEffect(() => {
    fetchActivitiesData();
    fetchHistoryPageData();
  }, [fetchActivitiesData, fetchHistoryPageData]);

  const handleOpenActivityModalForNew = () => {
    setEditingActivity(null);
    setIsActivityModalOpen(true);
  };

  const handleOpenActivityModalForEdit = (activity: Activity) => {
    setEditingActivity(activity);
    setIsActivityModalOpen(true);
  };

  const handleCloseActivityModal = () => {
    setIsActivityModalOpen(false);
    setEditingActivity(null);
  };

  const handleSubmitActivity = async (activityData: Omit<Activity, 'id'> | Activity) => {
    setActivityFormIsLoading(true);
    try {
      if ('id' in activityData && activityData.id) {
        await updateActivity(activityData.id, activityData);
      } else {
        await addActivity(activityData as Omit<Activity, 'id'>);
      }
      await fetchActivitiesData(); 
      handleCloseActivityModal();
    } catch (error) {
      console.error("Erreur lors de la sauvegarde de l'activité:", error);
      // TODO: Afficher une notification d'erreur à l'utilisateur
    } finally {
      setActivityFormIsLoading(false);
    }
  };

  const handleDeleteActivity = async (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette activité ? Cette action est irréversible.")) {
      setActivityFormIsLoading(true); // Utiliser ce loader pour l'opération de suppression
      try {
        await deleteActivity(id);
        await fetchActivitiesData(); // Actualise la liste, ce qui mettra fin au loader général si besoin
      } catch (error) {
        console.error("Erreur lors de la suppression de l'activité:", error);
         // TODO: Afficher une notification d'erreur à l'utilisateur
      } finally {
        setActivityFormIsLoading(false);
      }
    }
  };

  const handleOpenPageContentModal = () => {
    setIsPageContentModalOpen(true);
  };

  const handleClosePageContentModal = () => {
    setIsPageContentModalOpen(false);
  };

  const handleSavePageContent = async (pageKey: string, data: EditablePageData) => {
    setPageContentFormIsLoading(true);
    try {
      await savePageData(pageKey, data);
      if (pageKey === HISTORY_PAGE_KEY) {
        setHistoryPageData(data);
      }
      handleClosePageContentModal();
    } catch (error) {
      console.error(`Erreur lors de la sauvegarde du contenu de la page ${pageKey}:`, error);
      // TODO: Afficher une notification d'erreur à l'utilisateur
    } finally {
      setPageContentFormIsLoading(false);
    }
  };
  
  const baseButtonClass = "px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 shadow-md focus:outline-none focus:ring-4 focus:ring-opacity-60 focus:ring-offset-2 dark:focus:ring-offset-themeColors-cardBgDark";
  const primaryButtonClass = `${baseButtonClass} bg-themeColors-accentLight dark:bg-themeColors-accentDark text-white dark:text-themeColors-pageBgDark hover:bg-themeColors-accentHoverLight dark:hover:bg-themeColors-accentHoverDark focus:ring-themeColors-accentLight dark:focus:ring-themeColors-accentDark`;
  const secondaryButtonClass = `${baseButtonClass} bg-themeColors-cardBgLight dark:bg-themeColors-cardBgDark border border-themeColors-borderLight dark:border-themeColors-borderDark text-themeColors-textSecondaryLight dark:text-themeColors-textSecondaryDark hover:bg-themeColors-pageBgLight dark:hover:bg-themeColors-pageBgDark hover:border-themeColors-accentLight/70 dark:hover:border-themeColors-accentDark/70 focus:ring-themeColors-accentLight dark:focus:ring-themeColors-accentDark`;
  
  const editButtonClass = `${baseButtonClass} bg-sky-500 hover:bg-sky-600 text-white focus:ring-sky-500/50`;
  const deleteButtonClass = `${baseButtonClass} bg-red-600 hover:bg-red-700 text-white focus:ring-red-600/50`;

  if (isLoadingActivities && activities.length === 0 && isLoadingHistoryData && !historyPageData) { 
    return (
      <div className="text-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-themeColors-accentLight dark:border-themeColors-accentDark mx-auto"></div>
          <p className="mt-6 text-xl text-themeColors-textSecondaryLight dark:text-themeColors-textSecondaryDark">Chargement du QG...</p>
      </div>
    );
  }

  return (
    <div className="space-y-12 md:space-y-16">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl lg:text-4xl font-bold font-heading text-themeColors-textPrimaryLight dark:text-themeColors-textPrimaryDark">Tableau de Bord Admin</h1>
        <button
            onClick={logout}
            className={`${secondaryButtonClass} focus:ring-offset-themeColors-pageBgLight dark:focus:ring-offset-themeColors-pageBgDark`}
        >
            Déconnexion
        </button>
      </div>

      <section className="p-6 md:p-8 bg-themeColors-cardBgLight dark:bg-themeColors-cardBgDark rounded-2xl shadow-custom-light dark:shadow-custom-dark border border-themeColors-borderLight/30 dark:border-themeColors-borderDark/30">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-2xl lg:text-3xl font-semibold font-heading text-themeColors-textPrimaryLight dark:text-themeColors-textPrimaryDark">Gestion des Activités</h2>
          <button 
              onClick={handleOpenActivityModalForNew} 
              className={`${primaryButtonClass} flex items-center focus:ring-offset-themeColors-cardBgLight dark:focus:ring-offset-themeColors-cardBgDark`}
          >
              <PlusCircleIcon className="w-5 h-5 mr-2" />
              Ajouter une activité
          </button>
        </div>

        {isLoadingActivities ? (
            <div className="text-center py-10 text-themeColors-textSecondaryLight dark:text-themeColors-textSecondaryDark">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-themeColors-accentLight dark:border-themeColors-accentDark mx-auto mb-3"></div>
                Chargement des activités...
            </div>
        ) : activities.length > 0 ? (
          <div className="overflow-x-auto rounded-xl border border-themeColors-borderLight/50 dark:border-themeColors-borderDark/50">
            <table className="min-w-full divide-y divide-themeColors-borderLight/50 dark:divide-themeColors-borderDark/50">
              <thead className="bg-themeColors-pageBgLight dark:bg-themeColors-pageBgDark/50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold font-heading text-themeColors-textSecondaryLight dark:text-themeColors-textSecondaryDark uppercase tracking-wider">Nom</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold font-heading text-themeColors-textSecondaryLight dark:text-themeColors-textSecondaryDark uppercase tracking-wider">Date & Heure</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold font-heading text-themeColors-textSecondaryLight dark:text-themeColors-textSecondaryDark uppercase tracking-wider hidden md:table-cell">Lieu</th>
                  <th scope="col" className="px-6 py-4 text-right text-xs font-semibold font-heading text-themeColors-textSecondaryLight dark:text-themeColors-textSecondaryDark uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-themeColors-cardBgLight dark:bg-themeColors-cardBgDark divide-y divide-themeColors-borderLight/40 dark:divide-themeColors-borderDark/40">
                {activities.map((activity) => (
                  <tr key={activity.id} className="hover:bg-themeColors-pageBgLight/60 dark:hover:bg-themeColors-pageBgDark/40 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-themeColors-textPrimaryLight dark:text-themeColors-textPrimaryDark">{activity.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-themeColors-textSecondaryLight dark:text-themeColors-textSecondaryDark">{new Date(activity.date).toLocaleDateString('fr-FR')} à {activity.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-themeColors-textSecondaryLight dark:text-themeColors-textSecondaryDark hidden md:table-cell truncate max-w-xs">{activity.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button onClick={() => handleOpenActivityModalForEdit(activity)} className={`${editButtonClass} py-2 px-3 text-xs`} aria-label={`Modifier ${activity.name}`}>
                        <PencilIcon className="w-4 h-4 inline-block sm:mr-1.5"/> <span className="hidden sm:inline">Éditer</span>
                      </button>
                      <button 
                        onClick={() => handleDeleteActivity(activity.id)} 
                        className={`${deleteButtonClass} py-2 px-3 text-xs ${activityFormIsLoading && editingActivity?.id !== activity.id ? 'opacity-50 cursor-not-allowed' : ''}`} // Dim if another op is in progress
                        disabled={activityFormIsLoading && editingActivity?.id !== activity.id} // Disable if another op is in progress
                        aria-label={`Supprimer ${activity.name}`}
                      >
                        <TrashIcon className="w-4 h-4 inline-block sm:mr-1.5"/> <span className="hidden sm:inline">Suppr.</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-themeColors-textSecondaryLight dark:text-themeColors-textSecondaryDark py-12 text-lg">
            Aucune activité pour le moment. Prêt à en créer une ?
          </p>
        )}
      </section>

      <section className="p-6 md:p-8 bg-themeColors-cardBgLight dark:bg-themeColors-cardBgDark rounded-2xl shadow-custom-light dark:shadow-custom-dark border border-themeColors-borderLight/30 dark:border-themeColors-borderDark/30">
        <h2 className="text-2xl lg:text-3xl font-semibold font-heading text-themeColors-textPrimaryLight dark:text-themeColors-textPrimaryDark mb-8">Gestion du Contenu des Pages</h2>
        {isLoadingHistoryData ? (
          <div className="text-center py-10 text-themeColors-textSecondaryLight dark:text-themeColors-textSecondaryDark">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-themeColors-accentLight dark:border-themeColors-accentDark mx-auto mb-3"></div>
              Chargement des données de la page histoire...
          </div>
        ) : historyPageData && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-center p-5 border border-themeColors-borderLight/50 dark:border-themeColors-borderDark/50 rounded-xl bg-themeColors-pageBgLight dark:bg-themeColors-pageBgDark/50 shadow-sm">
              <div>
                <h3 className="text-lg font-semibold font-heading text-themeColors-textPrimaryLight dark:text-themeColors-textPrimaryDark">Page Notre Histoire</h3>
                <p className="text-sm text-themeColors-textSecondaryLight dark:text-themeColors-textSecondaryDark">Titre actuel: "{historyPageData.pageTitle}"</p>
              </div>
              <button 
                onClick={handleOpenPageContentModal}
                className={`${primaryButtonClass} flex items-center mt-4 sm:mt-0 focus:ring-offset-themeColors-pageBgLight dark:focus:ring-offset-themeColors-pageBgDark`}
              >
                <PencilIcon className="w-5 h-5 mr-2"/> Modifier le contenu
              </button>
            </div>
          </div>
        )}
      </section>

      <Modal 
        isOpen={isActivityModalOpen} 
        onClose={handleCloseActivityModal} 
        title={editingActivity ? "Modifier l'activité" : "Ajouter une nouvelle activité"}
        size="2xl" // Slightly larger for better form layout
      >
        <ActivityForm 
          onSubmit={handleSubmitActivity} 
          onCancel={handleCloseActivityModal} 
          initialData={editingActivity}
          isLoading={activityFormIsLoading}
        />
      </Modal>

      {historyPageData && (
        <PageContentEditModal
          isOpen={isPageContentModalOpen}
          onClose={handleClosePageContentModal}
          pageKey={HISTORY_PAGE_KEY}
          initialPageData={historyPageData}
          onSave={handleSavePageContent}
          isLoading={pageContentFormIsLoading}
        />
      )}
    </div>
  );
};


const AdminPage: React.FC = () => {
  const { isAuthenticated, loading: authLoading } = useAuth();

  if (authLoading) {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-themeColors-pageBgLight dark:bg-themeColors-pageBgDark py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-themeColors-accentLight dark:border-themeColors-accentDark"></div>
            <p className="mt-4 text-xl text-themeColors-textPrimaryLight dark:text-themeColors-textPrimaryDark">Vérification de l'accès...</p>
        </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthForm />;
  }

  return <AdminDashboard />;
};

export default AdminPage;
