import React from 'react';
import { Activity } from '../types';
import { CalendarIcon, ClockIcon, LocationMarkerIcon, ChatBubbleLeftEllipsisIcon } from '../constants';

interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  const formattedDate = new Date(activity.date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-themeColors-cardBgLight dark:bg-themeColors-cardBgDark border border-themeColors-borderLight/50 dark:border-themeColors-borderDark/50 rounded-xl shadow-custom-light dark:shadow-custom-dark overflow-hidden transition-all duration-300 hover:shadow-xl dark:hover:shadow-themeColors-accentDark/30 flex flex-col h-full group">
      <div className="relative overflow-hidden h-56">
        <img 
          src={activity.imageUrl || 'https://picsum.photos/seed/defaultactivity/600/400?grayscale&blur=1&random=' + activity.id} 
          alt={`Image pour ${activity.name}`} 
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-5 md:p-6 flex flex-col flex-grow">
        <h3 className="font-heading text-xl lg:text-2xl font-semibold text-themeColors-textPrimaryLight dark:text-themeColors-textPrimaryDark mb-3 group-hover:text-themeColors-highlightLight dark:group-hover:text-themeColors-highlightDark transition-colors duration-300">
          {activity.name}
        </h3>
        
        <div className="space-y-3 text-sm text-themeColors-textSecondaryLight dark:text-themeColors-textSecondaryDark mb-4">
          <div className="flex items-center">
            <CalendarIcon className="w-5 h-5 mr-2.5 text-themeColors-highlightLight dark:text-themeColors-highlightDark flex-shrink-0" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center">
            <ClockIcon className="w-5 h-5 mr-2.5 text-themeColors-highlightLight dark:text-themeColors-highlightDark flex-shrink-0" />
            <span>{activity.time}</span>
          </div>
          <div className="flex items-center">
            <LocationMarkerIcon className="w-5 h-5 mr-2.5 text-themeColors-highlightLight dark:text-themeColors-highlightDark flex-shrink-0" />
            <span className="truncate">{activity.location}</span>
          </div>
        </div>
        
        <div className="text-sm text-themeColors-textSecondaryLight dark:text-themeColors-textSecondaryDark mt-auto pt-4 border-t border-themeColors-borderLight/70 dark:border-themeColors-borderDark/70">
          <p className="line-clamp-3 leading-relaxed">{activity.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
