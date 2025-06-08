
export interface Activity {
  id: string;
  name: string;
  date: string; // ISO string format for date
  time: string; // HH:mm format
  location: string;
  description: string;
  imageUrl?: string;
}

export interface User {
  id: string;
  email: string;
  // In a real app, never store passwords or tokens like this client-side directly
  // This is for simulation purposes only
  // passwordHash?: string; // For mock DB
}

export interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

// Types for Editable Page Content
export interface PageContentItem {
  id: string; // Unique ID for the content item
  type: 'paragraph' | 'image';
  text?: string; // For paragraph
  imageUrl?: string; // For image
  imageAlt?: string; // For image
}

export interface PageSection {
  id: string; // Unique ID for the section
  title: string;
  contents: PageContentItem[];
}

export interface EditablePageData {
  pageTitle: string; // Main page title
  sections: PageSection[];
}
