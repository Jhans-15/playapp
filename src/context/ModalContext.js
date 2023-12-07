import React, { createContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {

    const [ isViewModal, setIsViewModal ] = useState(false);

    const viewModal = () => setIsViewModal(true);
    const hiddenModal = () => setIsViewModal(false);

    const contextValue = {
        isViewModal,
        viewModal,
        hiddenModal
    }

    return (
        <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>
    )

}

export default ModalContext;