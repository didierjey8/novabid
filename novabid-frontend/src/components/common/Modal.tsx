import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
    height?: 'auto' | 'fit' | 'full' | string;
    showCloseButton?: boolean;
    closeOnOverlayClick?: boolean;
    closeOnEscape?: boolean;
    className?: string;
}

const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
};

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    maxWidth = 'xl',
    height = 'auto',
    showCloseButton = true,
    closeOnOverlayClick = true,
    closeOnEscape = true,
    className = '',
}) => {
    // Handle escape key press
    useEffect(() => {
        if (!closeOnEscape) return;

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose, closeOnEscape]);

    // Handle overlay click
    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (closeOnOverlayClick && event.target === event.currentTarget) {
            onClose();
        }
    };

    // Get height classes
    const getHeightClass = () => {
        switch (height) {
            case 'fit':
                return 'h-fit';
            case 'full':
                return 'h-full';
            case 'auto':
                return 'h-auto max-h-[85vh]';
            default:
                return height;
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    onClick={handleOverlayClick}
                >
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ 
                            opacity: 0, 
                            scale: 0.95,
                            y: 20
                        }}
                        animate={{ 
                            opacity: 1, 
                            scale: 1,
                            y: 0
                        }}
                        exit={{ 
                            opacity: 0, 
                            scale: 0.95,
                            y: 20
                        }}
                        transition={{
                            duration: 0.2,
                            ease: 'easeOut'
                        }}
                        className={`
                            relative z-10 w-full ${maxWidthClasses[maxWidth]} 
                            bg-[#191B1D] border border-gray-800 rounded-2xl 
                            shadow-2xl shadow-black/50 ${getHeightClass()} 
                            overflow-hidden ${className}
                        `}
                    >
                        {/* Header */}
                        {(title || showCloseButton) && (
                            <div className="flex items-center justify-between p-6 pb-4">
                                {title && (
                                    <h2 className="text-white text-xl font-semibold">
                                        {title}
                                    </h2>
                                )}
                                {showCloseButton && (
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={onClose}
                                        className="text-gray-500 hover:text-gray-300 transition-colors p-1 rounded-lg hover:bg-gray-800/50"
                                    >
                                        <X className="w-5 h-5" />
                                    </motion.button>
                                )}
                            </div>
                        )}

                        {/* Content */}
                        <div className={`
                            ${(title || showCloseButton) ? 'px-6 pb-6' : 'p-6'}
                            ${height === 'auto' || height === 'full' ? 'overflow-y-auto' : ''}
                        `}>
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;