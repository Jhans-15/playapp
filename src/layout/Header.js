import React from 'react'
import { useNavigate } from 'react-router-dom';
import { IconArrowLeft, IconSend } from "@tabler/icons-react";
import settings from '../config';

import ButtonCart from "../components/ButtonCart";

import logo from '../assets/img/OTY.svg'

import './styles/header.css'

function Header({ screen, content }) {

    const navigate = useNavigate();

    const handleHome = () => navigate('/');

    const handleShareWhatsApp = () => {
        const message = encodeURIComponent(`¡😎🎅Echa un vistazo a esta increíble oferta 😎🎅!\n\n *${content.name}* a solo *s/. ${content.price}* soles por navidad\n\nDescubre más ofertas en ${settings.LINK}`);
        const url = `https://api.whatsapp.com/send?text=${message}`;
        window.open(url, '_blank');
    };

    return (

        <>
        
            {screen === 'home' && (

                <header className='header'>
                    <div className='__xuhjs'>

                        <div className='__logo'>
                            <img src={logo} alt='Logo de OTY | Tienda donde encontraras todo para tus engreídos' />
                        </div>

                        <ButtonCart/>

                    </div>
                </header>

            )}

            {screen === 'details' && (

                <header className='header-details'>

                    <div className='__xnys6z'>

                        <button className='__btn __btn-back' onClick={handleHome}><IconArrowLeft/></button>
                        <button className='__btn __btn-send' onClick={handleShareWhatsApp}><IconSend/></button>

                    </div>

                </header>

            )}

            {screen === 'cart' && (

                <header className='header-cart'>

                    <div className='__xnys6z'>

                        <button className='__btn __btn-back' onClick={handleHome}><IconArrowLeft/></button>
                        <span>Mi carrito</span>
                        <button className='__btn __btn-send' onClick={handleShareWhatsApp}><IconSend/></button>

                    </div>

                </header>

            )}

            {screen === 'all' && (

                <header className='header-all'>

                    <div className='__xnhs6z'>

                        <button className='__btn __btn-back' onClick={handleHome}><IconArrowLeft/></button>
                        <span>Todos</span>
                        <button className='__btn __btn-send' onClick={handleShareWhatsApp}><IconSend/></button>

                    </div>

                </header>

            )}

        </>

    )

}

export default Header