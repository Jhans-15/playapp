import React, { useContext, useEffect } from 'react'

import Header from '../layout/Header';

import '../assets/css/cart.css'
import Footer from '../layout/Footer';
import Main from '../layout/Main';
import UserContext from '../context/UserContext';
import Cookies from 'js-cookie';
import ModalContext from '../context/ModalContext';
import Modal from '../components/Modal';

function CartScreens() {

    const { isViewModal, viewModal, hiddenModal } = useContext(ModalContext);
    const { getUser } = useContext(UserContext);

    useEffect(() => {
        const claseNew = document.getElementById('root');
        claseNew.classList.add('__xgbs62z')

        return () => {
            claseNew.classList.remove('__xgbs62z');
        }
    }, []);

    useEffect(() => {
        getUser(Cookies.get('c_user'));
    }, [getUser]);

    useEffect(() => {

        const existModal = Cookies.get('creat_at');

        if (existModal === 'false') {
            viewModal();
        } else {
            hiddenModal();
        }

    }, [isViewModal, hiddenModal, viewModal]);


    return (

        <>
        
            
            <Header screen={'cart'} />

            <Main screen={'cart'} />

            <Footer screen={'cart'} />

            {isViewModal && ( <Modal/> )}

        </>

    )
    
}

export default CartScreens