import React, { useState, useEffect } from 'react';
import { Activity } from '../../types';

interface ActivityFormProps {
  onSubmit: (activityData: Omit<Activity, 'id'> | Activity) => void;
  onCancel: () => void;
  initialData?: Activity | null;
  isLoading?: boolean;
}

const ActivityForm: React.FC<ActivityFormProps> = ({ onSubmit, onCancel, initialData, isLoading = false }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDate(initialData.date ? new Date(initialData.date).toISOString().split('T')[0] : '');
      setTime(initialData.time);
      setLocation(initialData.location);
      setDescription(initialData.description);
      setImageUrl(initialData.imageUrl || '');
    } else {
      setName('');
      setDate('');
      setTime('');
      setLocation('');
      setDescription('');
      setImageUrl('');
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const activityData = {
      name,
      date,
      time,
      location,
      description,
      imageUrl: imageUrl.trim() === '' ? undefined : imageUrl.trim(),
    };
    if (initialData && initialData.id) {
      onSubmit({ ...activityData, id: initialData.id });
    } else {
      onSubmit(activityData);
    }
  };
  
  const commonInputClass = "mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none sm:text-sm bg-themeColors-cardBgLight dark:bg-themeColors-pageBgDark border-themeColors-borderLight dark:border-themeColors-borderDark text-themeColors-textPrimaryLight dark:text-themeColors-textPrimaryDark placeholder-themeColors-textSecondaryLight/70 dark:placeholder-themeColors-textSecondaryDark/70 focus:ring-2 focus:ring-themeColors-accentLight dark:focus:ring-themeColors-accentDark focus:border-transparent transition-colors";
  const commonLabelClass = "block text-sm font-semibold text-themeColors-textSecondaryLight dark:text-themeColors-textSecondaryDark mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="activity-name" className={commonLabelClass}>Nom de l'activité</label>
        <input type="text" id="activity-name" value={name} onChange={(e) => setName(e.target.value)} required className={commonInputClass} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
        <div>
          <label htmlFor="activity-date" className={commonLabelClass}>Date</label>
          <input type="date" id="activity-date" value={date} onChange={(e) => setDate(e.target.value)} required className={`${commonInputClass} dark:[color-scheme:dark]`} />
        </div>
        <div>
          <label htmlFor="activity-time" className={commonLabelClass}>Heure</label>
          <input type="time" id="activity-time" value={time} onChange={(e) => setTime(e.target.value)} required className={`${commonInputClass} dark:[color-scheme:dark]`} />
        </div>
      </div>
      <div>
        <label htmlFor="activity-location" className={commonLabelClass}>Lieu</label>
        <input type="text" id="activity-location" value={location} onChange={(e) => setLocation(e.target.value)} required className={commonInputClass} />
      </div>
      <div>
        <label htmlFor="activity-description" className={commonLabelClass}>Description</label>
        <textarea id="activity-description" value={description} onChange={(e) => setDescription(e.target.value)} required rows={5} className={commonInputClass}></textarea>
      </div>
      <div>
        <label htmlFor="activity-image-url" className={commonLabelClass}>URL de l'image (optionnel)</label>
        <input type="url" id="activity-image-url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://exemple.com/image.jpg" className={commonInputClass} />
        {imageUrl && (
            <div className="mt-4 p-3 bg-themeColors-pageBgLight dark:bg-themeColors-pageBgDark/50 rounded-lg border border-themeColors-borderLight dark:border-themeColors-borderDark">
                <img src={imageUrl} alt="Aperçu de l'image" className="rounded-md max-h-48 w-auto object-contain shadow-sm mx-auto" />
            </div>
        )}
      </div>
      <div className="flex justify-end space-x-4 pt-4">
        <button 
            type="button" 
            onClick={onCancel} 
            className="btn-secondary py-2.5 px-6"
        >
          Annuler
        </button>
        <button 
            type="submit" 
            disabled={isLoading} 
            className="btn-primary py-2.5 px-6"
        >
          {isLoading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2.5"></div>
              <span>{initialData ? 'Modification...' : 'Ajout...'}</span>
            </div>
          ) : (initialData ? "Modifier l'activité" : "Ajouter l'activité")}
        </button>
      </div>
    </form>
  );
};

export default ActivityForm;
