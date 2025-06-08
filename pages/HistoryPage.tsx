import React, { useState, useEffect } from 'react';
import { EditablePageData, PageSection as PageSectionType, PageContentItem } from '../types';
import { getPageData } from '../services/dataService';
import { HISTORY_PAGE_KEY } from '../constants';

const HistoryPage: React.FC = () => {
  const [pageData, setPageData] = useState<EditablePageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getPageData(HISTORY_PAGE_KEY);
        setPageData(data);
      } catch (err) {
        console.error("Erreur de chargement du contenu de la page Histoire:", err);
        setError("Impossible de charger le contenu de la page.");
      } finally {
        setIsLoading(false);
      }
    };
    loadContent();
  }, []);

  if (isLoading) {
     return (
        <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-themeColors-accentLight dark:border-themeColors-accentDark mx-auto"></div>
            <p className="mt-6 text-xl text-themeColors-textSecondaryLight dark:text-themeColors-textSecondaryDark">Chargement de notre épopée...</p>
        </div>
    );
  }

  if (error) {
    return <p className="text-center text-xl text-red-500 dark:text-red-400 py-10 bg-red-50 dark:bg-red-900/20 p-6 rounded-xl">{error}</p>;
  }

  if (!pageData) {
    return <p className="text-center text-xl text-themeColors-textSecondaryLight dark:text-themeColors-textSecondaryDark py-10">Aucun contenu disponible pour cette page.</p>;
  }

  const renderContentItem = (item: PageContentItem, index: number, array: PageContentItem[]) => {
    const marginBottomClass = index === array.length - 1 ? 'mb-0' : 'mb-6 md:mb-8';
    switch (item.type) {
      case 'paragraph':
        return <p key={item.id} className={`text-themeColors-textSecondaryLight dark:text-themeColors-textSecondaryDark leading-relaxed text-md md:text-lg ${marginBottomClass}`}>{item.text}</p>;
      case 'image':
        return (
          <div key={item.id} className={`my-6 md:my-8 ${marginBottomClass}`}>
            <img
              src={item.imageUrl || 'https://picsum.photos/seed/default/700/400'}
              alt={item.imageAlt || 'Image illustrative'}
              className="rounded-xl w-full h-auto object-cover shadow-custom-light dark:shadow-custom-dark border border-themeColors-borderLight/30 dark:border-themeColors-borderDark/30"
              loading="lazy"
            />
            {item.imageAlt && <p className="text-xs text-center mt-2 text-themeColors-textSecondaryLight/80 dark:text-themeColors-textSecondaryDark/80 italic">{item.imageAlt}</p>}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-16 md:space-y-20">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold font-heading text-themeColors-textPrimaryLight dark:text-themeColors-textPrimaryDark mb-4">{pageData.pageTitle}</h1>
        <p className="text-xl text-themeColors-highlightLight dark:text-themeColors-highlightDark font-medium">Un regard sur notre parcours commun.</p>
      </div>

      {pageData.sections.map((section: PageSectionType, sectionIndex: number) => (
        <section 
          key={section.id} 
          className="bg-themeColors-cardBgLight dark:bg-themeColors-cardBgDark p-6 md:p-10 rounded-2xl shadow-custom-light dark:shadow-custom-dark border border-themeColors-borderLight/30 dark:border-themeColors-borderDark/30"
        >
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-themeColors-accentLight dark:text-themeColors-accentDark mb-8 pb-4 border-b-2 border-themeColors-highlightLight/30 dark:border-themeColors-highlightDark/30">
            {section.title}
          </h2>
          {section.contents.map(renderContentItem)}
        </section>
      ))}
    </div>
  );
};

export default HistoryPage;
