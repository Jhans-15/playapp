import React, { useContext, useEffect } from 'react'

import Header from '../layout/Header';
import Main from '../layout/Main';

import '../assets/css/home.css'
import ModalContext from '../context/ModalContext';
import Cookies from 'js-cookie';
import Modal from '../components/Modal';

function HomeScreens() {

    const { isViewModal,viewModal } = useContext(ModalContext);

    document.title = 'OTY | Todo para el engreído del hogar'

    useEffect(() => {
        const classNew = document.getElementById('root');
        classNew.classList.add('__yhxu');
    
        return () => {
            classNew.classList.remove('__yhxu');
        };
    }, []);

    useEffect(() => {

        const existModal = Cookies.get('creat_at');

        if (existModal === 'false') {
            viewModal();
        };

    }, [viewModal]);

    return (

        <>

            <Header screen={'home'}/>

            <Main screen={'home'} />

            {isViewModal && (<Modal/>)}
        
        </>

    )
    
}

export default HomeScreens