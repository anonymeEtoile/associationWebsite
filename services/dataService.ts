
import { Activity, User, EditablePageData } from '../types';
import { DEFAULT_USER_EMAIL, DEFAULT_USER_PASSWORD, HISTORY_PAGE_KEY, DEFAULT_HISTORY_PAGE_DATA } from '../constants';

const ACTIVITIES_STORAGE_KEY = 'association_activities';
const USER_STORAGE_KEY = 'association_user'; // Stores current user
const AUTH_TOKEN_KEY = 'association_auth_token'; // Stores mock auth token
const PAGE_CONTENT_STORAGE_PREFIX = 'association_page_content_';


// --- Initial Data & Helpers ---
const initialActivities: Activity[] = [
  {
    id: '1',
    name: 'Fête de Quartier Annuelle',
    date: '2024-07-20',
    time: '14:00',
    location: 'Parc Central, BelleVue-sur-Mer',
    description: 'Rejoignez-nous pour une journée de jeux, musique et convivialité. Stands de nourriture et animations pour tous les âges.',
    imageUrl: 'https://picsum.photos/seed/fete/600/400',
  },
  {
    id: '2',
    name: 'Réunion Mensuelle des Membres',
    date: '2024-08-05',
    time: '19:00',
    location: 'Salle Polyvalente, Mairie de BelleVue-sur-Mer',
    description: 'Discussion des projets en cours, planification des futurs événements et accueil des nouveaux membres.',
    imageUrl: 'https://picsum.photos/seed/reunion/600/400',
  },
  {
    id: '3',
    name: 'Atelier Créatif : Peinture sur Soie',
    date: '2024-08-15',
    time: '10:00',
    location: 'Espace Culturel L\'Horizon',
    description: 'Découvrez les techniques de la peinture sur soie avec notre artiste locale. Matériel fourni. Places limitées.',
    // No imageUrl for this one to test placeholder
  },
  {
    id: '4',
    name: 'Nettoyage de la Plage',
    date: '2023-09-10', // Past event
    time: '09:00',
    location: 'Plage des Goélands',
    description: 'Action citoyenne pour préserver notre littoral. Gants et sacs fournis.',
    imageUrl: 'https://picsum.photos/seed/plage/600/400',
  }
];

const getActivitiesFromStorage = (): Activity[] => {
  const storedActivities = localStorage.getItem(ACTIVITIES_STORAGE_KEY);
  if (storedActivities) {
    return JSON.parse(storedActivities);
  }
  // Initialize with default if nothing is stored
  localStorage.setItem(ACTIVITIES_STORAGE_KEY, JSON.stringify(initialActivities));
  return initialActivities;
};

const saveActivitiesToStorage = (activities: Activity[]) => {
  localStorage.setItem(ACTIVITIES_STORAGE_KEY, JSON.stringify(activities));
};

// --- Activity CRUD Operations ---
export const getActivities = async (): Promise<Activity[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return getActivitiesFromStorage();
};

export const getActivityById = async (id: string): Promise<Activity | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  const activities = getActivitiesFromStorage();
  return activities.find(activity => activity.id === id);
};

export const addActivity = async (activityData: Omit<Activity, 'id'>): Promise<Activity> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  const activities = getActivitiesFromStorage();
  const newActivity: Activity = {
    ...activityData,
    id: Date.now().toString(), // Simple unique ID
  };
  const updatedActivities = [...activities, newActivity];
  saveActivitiesToStorage(updatedActivities);
  return newActivity;
};

export const updateActivity = async (id: string, updates: Partial<Omit<Activity, 'id'>>): Promise<Activity | null> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  let activities = getActivitiesFromStorage();
  const index = activities.findIndex(activity => activity.id === id);
  if (index !== -1) {
    activities[index] = { ...activities[index], ...updates };
    saveActivitiesToStorage(activities);
    return activities[index];
  }
  return null;
};

export const deleteActivity = async (id: string): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  let activities = getActivitiesFromStorage();
  const updatedActivities = activities.filter(activity => activity.id !== id);
  if (activities.length !== updatedActivities.length) {
    saveActivitiesToStorage(updatedActivities);
    return true;
  }
  return false;
};


// --- Simulated Authentication ---
const MOCK_ADMIN_USER: User = {
  id: 'admin001',
  email: DEFAULT_USER_EMAIL,
};

// This simulates storing the current user's info (e.g., after login)
export const storeUser = async (user: User): Promise<void> => {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  // Simulate issuing a token
  localStorage.setItem(AUTH_TOKEN_KEY, `mock_jwt_token_for_${user.id}_${Date.now()}`);
};

// This simulates retrieving the stored user (e.g., on app load)
export const getStoredUser = async (): Promise<User | null> => {
  const storedUser = localStorage.getItem(USER_STORAGE_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
};

// This simulates clearing user info (e.g., on logout)
export const clearStoredUser = async (): Promise<void> => {
  localStorage.removeItem(USER_STORAGE_KEY);
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

// Simulates checking if a stored token is "valid"
export const checkAuthStatus = async (): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 50)); // Simulate async check
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  return !!token; // If token exists, consider authenticated for this mock
};


export const loginUser = async (email: string, password: string): Promise<User | null> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
  if (email === DEFAULT_USER_EMAIL && password === DEFAULT_USER_PASSWORD) {
    return MOCK_ADMIN_USER;
  }
  return null;
};

export const logoutUser = async (): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 100)); // Simulate API delay
  // In a real app, this would also invalidate the token on the server
  return;
};

// --- Editable Page Content ---
export const getPageData = async (pageKey: string): Promise<EditablePageData> => {
  await new Promise(resolve => setTimeout(resolve, 150)); // Simulate API delay
  const storedData = localStorage.getItem(`${PAGE_CONTENT_STORAGE_PREFIX}${pageKey}`);
  if (storedData) {
    return JSON.parse(storedData);
  }
  // Return default data if no stored data is found
  if (pageKey === HISTORY_PAGE_KEY) {
    return DEFAULT_HISTORY_PAGE_DATA;
  }
  // Fallback for other keys, though only history is implemented for now
  return { pageTitle: "Page non trouvée", sections: [] };
};

export const savePageData = async (pageKey: string, data: EditablePageData): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 200)); // Simulate API delay
  localStorage.setItem(`${PAGE_CONTENT_STORAGE_PREFIX}${pageKey}`, JSON.stringify(data));
};
