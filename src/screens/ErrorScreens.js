import React, { useEffect } from 'react'

import image from '../assets/img/error-404.png'

import '../assets/css/error.css'
import { Link } from 'react-router-dom';

function ErrorScreens() {

    useEffect(() => {

        const clase = document.getElementById('root');
        clase.classList.add('__er00r_pag3');

        return () => {
            clase.classList.remove('__er00r_pag3');
        }

    }, []);

    return (

        <>
        
            <div className='__box'>

                <div className='__img'>
                    <img src={image} alt='Hubo un error al encontrar la página - 404 | OTY' />
                </div>
                <div className='__txt'>
                    <p>Este contenido no está disponible en este momento</p>
                    <Link className='__a-home' to={'/'}>Volver</Link>
                </div>

            </div>

        </>

    )
    
}

export default ErrorScreens