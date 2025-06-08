import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'xl' }) => { // Default size increased
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md flex justify-center items-center z-[100] p-4 transition-opacity duration-300 ease-in-out"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={`bg-themeColors-cardBgLight dark:bg-themeColors-cardBgDark border border-themeColors-borderLight/50 dark:border-themeColors-borderDark/50 p-6 md:p-8 rounded-2xl shadow-custom-light dark:shadow-custom-dark w-full ${sizeClasses[size]} max-h-[90vh] flex flex-col transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-modal-appear`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6 pb-6 border-b border-themeColors-borderLight dark:border-themeColors-borderDark">
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-themeColors-textPrimaryLight dark:text-themeColors-textPrimaryDark">{title}</h2>
          <button
            onClick={onClose}
            className="text-themeColors-textSecondaryLight dark:text-themeColors-textSecondaryDark hover:text-themeColors-accentLight dark:hover:text-themeColors-accentDark text-3xl font-light focus:outline-none rounded-full w-10 h-10 flex items-center justify-center hover:bg-themeColors-pageBgLight dark:hover:bg-themeColors-pageBgDark transition-colors"
            aria-label="Fermer la fenêtre modale"
          >
            &times;
          </button>
        </div>
        <div className="overflow-y-auto flex-grow custom-scrollbar pr-2 -mr-2"> {/* Offset padding for scrollbar */}
         {children}
        </div>
      </div>
      {/*
        The `jsx` and `global` attributes were removed from the <style> tag below.
        These attributes are specific to styled-jsx, a library not standard in all React setups.
        Removing them resolves the TypeScript error. The keyframes and animation class
        (.animate-modal-appear) will still be applied globally as intended.
      */}
      <style>{`
        @keyframes modal-appear {
          0% {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-modal-appear {
          animation: modal-appear 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Modal;