import React from 'react';
import { ChatBubbleLeftEllipsisIcon } from '../constants';

const AideIAPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8 py-10">
      <div className="text-center">
        <ChatBubbleLeftEllipsisIcon className="w-16 h-16 mx-auto text-themeColors-borderLight dark:text-themeColors-borderDark mb-6" />
        <h1 className="text-4xl md:text-5xl font-extrabold font-heading text-themeColors-textPrimaryLight dark:text-themeColors-textPrimaryDark mb-4">
          Assistant IA
        </h1>
        <p className="text-lg text-themeColors-textSecondaryLight dark:text-themeColors-textSecondaryDark max-w-xl mx-auto">
          L'assistant IA n'est pas disponible pour le moment.
        </p>
        <p className="text-md text-themeColors-textSecondaryLight dark:text-themeColors-textSecondaryDark max-w-xl mx-auto mt-4">
          Nous vous remercions de votre compréhension.
        </p>
      </div>
    </div>
  );
};

export default AideIAPage;
