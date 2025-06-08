import React, { useState, useEffect } from 'react';
import { EditablePageData, PageSection, PageContentItem } from '../../types';
import Modal from '../Modal';
import { PlusCircleIcon, TrashIcon, ChevronUpIcon, ChevronDownIcon, PencilIcon } from '../../constants';

interface PageContentEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  pageKey: string;
  initialPageData: EditablePageData;
  onSave: (pageKey: string, data: EditablePageData) => Promise<void>;
  isLoading?: boolean;
}

const PageContentEditModal: React.FC<PageContentEditModalProps> = ({
  isOpen,
  onClose,
  pageKey,
  initialPageData,
  onSave,
  isLoading = false,
}) => {
  const [pageData, setPageData] = useState<EditablePageData>(JSON.parse(JSON.stringify(initialPageData)));

  useEffect(() => {
    if (isOpen) { // Only reset when modal becomes visible and data might have changed
        setPageData(JSON.parse(JSON.stringify(initialPageData)));
    }
  }, [initialPageData, isOpen]);

  const handlePageTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageData({ ...pageData, pageTitle: e.target.value });
  };

  const handleSectionChange = (sectionIndex: number, field: keyof PageSection, value: any) => {
    const updatedSections = [...pageData.sections];
    (updatedSections[sectionIndex] as any)[field] = value;
    setPageData({ ...pageData, sections: updatedSections });
  };
  
  const handleContentItemChange = (sectionIndex: number, contentIndex: number, field: keyof PageContentItem, value: string) => {
    const updatedSections = [...pageData.sections];
    (updatedSections[sectionIndex].contents[contentIndex] as any)[field] = value;
    setPageData({ ...pageData, sections: updatedSections });
  };

  const addSection = () => {
    const newSection: PageSection = {
      id: `section_${Date.now()}`,
      title: 'Nouvelle Section Inspirante',
      contents: [{ id: `content_${Date.now()}`, type: 'paragraph', text: 'Commencez à écrire ici votre nouveau contenu...' }],
    };
    setPageData({ ...pageData, sections: [...pageData.sections, newSection] });
  };

  const deleteSection = (sectionIndex: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette section et tout son contenu ? C'est définitif !")) {
      const updatedSections = pageData.sections.filter((_, idx) => idx !== sectionIndex);
      setPageData({ ...pageData, sections: updatedSections });
    }
  };
  
  const moveSection = (index: number, direction: 'up' | 'down') => {
    const updatedSections = [...pageData.sections];
    const item = updatedSections[index];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= updatedSections.length) return;
    updatedSections.splice(index, 1);
    updatedSections.splice(newIndex, 0, item);
    setPageData({ ...pageData, sections: updatedSections });
  };

  const addContentItem = (sectionIndex: number, type: 'paragraph' | 'image') => {
    const newItem: PageContentItem = {
      id: `content_${Date.now()}`,
      type,
      text: type === 'paragraph' ? 'Nouveau paragraphe à remplir.' : undefined,
      imageUrl: type === 'image' ? 'https://picsum.photos/seed/newimageinspire/600/300' : undefined,
      imageAlt: type === 'image' ? 'Description de la nouvelle image' : undefined,
    };
    const updatedSections = [...pageData.sections];
    updatedSections[sectionIndex].contents.push(newItem);
    setPageData({ ...pageData, sections: updatedSections });
  };

  const deleteContentItem = (sectionIndex: number, contentIndex: number) => {
     if (window.confirm("Supprimer cet élément de contenu ?")) {
        const updatedSections = [...pageData.sections];
        updatedSections[sectionIndex].contents = updatedSections[sectionIndex].contents.filter((_, idx) => idx !== contentIndex);
        setPageData({ ...pageData, sections: updatedSections });
     }
  };

  const moveContentItem = (sectionIndex: number, contentIndex: number, direction: 'up' | 'down') => {
    const updatedSections = [...pageData.sections];
    const sectionContents = [...updatedSections[sectionIndex].contents];
    const item = sectionContents[contentIndex];
    const newIndex = direction === 'up' ? contentIndex - 1 : contentIndex + 1;
    if (newIndex < 0 || newIndex >= sectionContents.length) return;
    sectionContents.splice(contentIndex, 1);
    sectionContents.splice(newIndex, 0, item);
    updatedSections[sectionIndex].contents = sectionContents;
    setPageData({ ...pageData, sections: updatedSections });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(pageKey, pageData);
  };

  const commonInputClass = "mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none sm:text-sm bg-themeColors-cardBgLight dark:bg-themeColors-pageBgDark border-themeColors-borderLight dark:border-themeColors-borderDark text-themeColors-textPrimaryLight dark:text-themeColors-textPrimaryDark placeholder-themeColors-textSecondaryLight/70 dark:placeholder-themeColors-textSecondaryDark/70 focus:ring-2 focus:ring-themeColors-accentLight dark:focus:ring-themeColors-accentDark focus:border-transparent transition-colors";
  const commonLabelClass = "block text-sm font-semibold text-themeColors-textSecondaryLight dark:text-themeColors-textSecondaryDark mb-1";
  const smallButtonClass = "p-2.5 text-xs rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-offset-1 dark:focus:ring-offset-themeColors-cardBgDark flex items-center justify-center font-medium transition-colors";
  const controlButtonBase = `${smallButtonClass} text-white disabled:opacity-60 disabled:cursor-not-allowed`;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Édition du contenu : ${initialPageData.pageTitle}`} size="4xl">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label htmlFor="pageTitle" className={`${commonLabelClass} text-base`}>Titre Global de la Page</label>
          <input
            type="text"
            id="pageTitle"
            value={pageData.pageTitle}
            onChange={handlePageTitleChange}
            className={`${commonInputClass} text-xl font-bold font-heading`}
          />
        </div>

        <hr className="border-themeColors-borderLight/70 dark:border-themeColors-borderDark/70 my-8"/>

        <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold font-heading text-themeColors-textPrimaryLight dark:text-themeColors-textPrimaryDark">Sections de la Page</h3>
            <button type="button" onClick={addSection} className={`${smallButtonClass} bg-themeColors-highlightLight hover:bg-opacity-90 dark:bg-themeColors-highlightDark dark:hover:bg-opacity-90 text-white`}>
              <PlusCircleIcon className="w-5 h-5 mr-2"/> Ajouter une Section
            </button>
        </div>
        
        {pageData.sections.map((section, sectionIndex) => (
          <div key={section.id} className="space-y-5 p-6 border border-themeColors-borderLight dark:border-themeColors-borderDark rounded-xl bg-themeColors-pageBgLight dark:bg-themeColors-pageBgDark/60 shadow-lg">
            <div className="flex justify-between items-center pb-3 border-b border-themeColors-borderLight/50 dark:border-themeColors-borderDark/50 mb-4">
              <h4 className="text-xl font-semibold font-heading text-themeColors-accentLight dark:text-themeColors-accentDark">Section {sectionIndex + 1}</h4>
              <div className="flex items-center space-x-2.5">
                <button type="button" onClick={() => moveSection(sectionIndex, 'up')} disabled={sectionIndex === 0} title="Monter la section" className={`${controlButtonBase} bg-sky-500 hover:bg-sky-600 focus:ring-sky-400`}><ChevronUpIcon className="w-4 h-4"/></button>
                <button type="button" onClick={() => moveSection(sectionIndex, 'down')} disabled={sectionIndex === pageData.sections.length - 1} title="Descendre la section" className={`${controlButtonBase} bg-sky-500 hover:bg-sky-600 focus:ring-sky-400`}><ChevronDownIcon className="w-4 h-4"/></button>
                <button type="button" onClick={() => deleteSection(sectionIndex)} title="Supprimer la section" className={`${controlButtonBase} bg-red-500 hover:bg-red-600 focus:ring-red-400`}><TrashIcon className="w-4 h-4"/></button>
              </div>
            </div>
            <div>
              <label htmlFor={`sectionTitle-${section.id}`} className={commonLabelClass}>Titre de la Section</label>
              <input
                type="text"
                id={`sectionTitle-${section.id}`}
                value={section.title}
                onChange={(e) => handleSectionChange(sectionIndex, 'title', e.target.value)}
                className={`${commonInputClass} font-semibold font-heading text-lg`}
              />
            </div>
            
            <h5 className="text-md font-semibold text-themeColors-textPrimaryLight dark:text-themeColors-textPrimaryDark mt-5 mb-3">Contenu de cette section :</h5>
            {section.contents.map((item, contentIndex) => (
              <div key={item.id} className="space-y-3 p-5 border border-themeColors-borderLight/70 dark:border-themeColors-borderDark/70 rounded-lg bg-themeColors-cardBgLight dark:bg-themeColors-cardBgDark shadow-md relative">
                 <div className="flex justify-between items-center mb-3">
                    <span className="text-xs uppercase font-bold tracking-wider text-themeColors-highlightLight dark:text-themeColors-highlightDark">{item.type === 'paragraph' ? 'Paragraphe' : 'Image'}</span>
                    <div className="flex items-center space-x-2">
                        <button type="button" onClick={() => moveContentItem(sectionIndex, contentIndex, 'up')} disabled={contentIndex === 0} title="Monter l'élément" className={`${controlButtonBase} bg-blue-500 hover:bg-blue-600 focus:ring-blue-400 text-xs`}><ChevronUpIcon className="w-3.5 h-3.5"/></button>
                        <button type="button" onClick={() => moveContentItem(sectionIndex, contentIndex, 'down')} disabled={contentIndex === section.contents.length - 1} title="Descendre l'élément" className={`${controlButtonBase} bg-blue-500 hover:bg-blue-600 focus:ring-blue-400 text-xs`}><ChevronDownIcon className="w-3.5 h-3.5"/></button>
                        <button type="button" onClick={() => deleteContentItem(sectionIndex, contentIndex)} title="Supprimer l'élément" className={`${controlButtonBase} bg-red-400 hover:bg-red-500 focus:ring-red-300 text-xs`}><TrashIcon className="w-3.5 h-3.5"/></button>
                    </div>
                </div>
                {item.type === 'paragraph' && (
                  <textarea
                    value={item.text || ''}
                    onChange={(e) => handleContentItemChange(sectionIndex, contentIndex, 'text', e.target.value)}
                    rows={5}
                    className={commonInputClass}
                    placeholder="Écrivez votre paragraphe ici..."
                  />
                )}
                {item.type === 'image' && (
                  <div className="space-y-3">
                    <div>
                        <label htmlFor={`imageUrl-${item.id}`} className={`${commonLabelClass} text-xs`}>URL de l'image</label>
                        <input
                        type="url"
                        id={`imageUrl-${item.id}`}
                        value={item.imageUrl || ''}
                        onChange={(e) => handleContentItemChange(sectionIndex, contentIndex, 'imageUrl', e.target.value)}
                        className={commonInputClass}
                        placeholder="https://images.unsplash.com/photo-..."
                        />
                    </div>
                    {item.imageUrl && <img src={item.imageUrl} alt={item.imageAlt || 'Aperçu'} className="mt-2 rounded-lg max-h-32 w-auto object-contain bg-themeColors-pageBgLight dark:bg-themeColors-pageBgDark/50 p-2 border border-themeColors-borderLight dark:border-themeColors-borderDark shadow-sm"/>}
                    <div>
                        <label htmlFor={`imageAlt-${item.id}`} className={`${commonLabelClass} text-xs`}>Texte alternatif (pour l'accessibilité)</label>
                        <input
                        type="text"
                        id={`imageAlt-${item.id}`}
                        value={item.imageAlt || ''}
                        onChange={(e) => handleContentItemChange(sectionIndex, contentIndex, 'imageAlt', e.target.value)}
                        className={commonInputClass}
                        placeholder="Ex: Groupe de personnes souriantes lors d'un événement"
                        />
                    </div>
                  </div>
                )}
              </div>
            ))}
             <div className="flex space-x-3 mt-5 pt-4 border-t border-themeColors-borderLight/40 dark:border-themeColors-borderDark/40">
                <button type="button" onClick={() => addContentItem(sectionIndex, 'paragraph')} className={`${smallButtonClass} bg-green-500 hover:bg-green-600 text-white focus:ring-green-400`}><PlusCircleIcon className="w-4 h-4 mr-1.5"/> Paragraphe</button>
                <button type="button" onClick={() => addContentItem(sectionIndex, 'image')} className={`${smallButtonClass} bg-teal-500 hover:bg-teal-600 text-white focus:ring-teal-400`}><PlusCircleIcon className="w-4 h-4 mr-1.5"/> Image</button>
            </div>
          </div>
        ))}
        
        <div className="flex justify-end space-x-4 pt-8 border-t border-themeColors-borderLight/70 dark:border-themeColors-borderDark/70 mt-8">
          <button 
            type="button" 
            onClick={onClose} 
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
                    <span>Sauvegarde...</span>
                </div>
            ) : 'Sauvegarder les modifications'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default PageContentEditModal;
