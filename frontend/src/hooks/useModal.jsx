import { useState } from 'react';

const useModal = (content) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(content);
    
    const openModal = (content) => {
        setModalContent(content);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalContent(null);
    };

    return {
        isModalOpen,
        modalContent,
        openModal,
        closeModal
    };
}

export default useModal;