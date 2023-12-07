import React, { useContext, useState } from 'react'

import './styles/modal.css'
import Cookies from 'js-cookie';
import settings from '../config';
import ModalContext from '../context/ModalContext';

function Modal() {

    const { hiddenModal } = useContext(ModalContext);

    const [ isNameUser, setIsNameUser ] = useState('');
    const [ isEmailUser, setIsEmailUser ] = useState('');

    const [ viewCode,  setViewCode ] = useState(false);

    const [ isLoading, setIsLoading ] = useState(false);

    const handleSendData = () => {

        setIsLoading(true);

        const token = Cookies.get('c_user');

        const formData = new FormData();
        formData.append('token', token);
        formData.append('name', isNameUser);
        formData.append('email', isEmailUser);

        fetch(`${settings.API}/users/login.php`, {
            method: 'POST',
            body: formData
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                Cookies.set('creat_at', 'true');
                setViewCode(true);
            }
        })
        .catch((error) => {
            console.log('Failed to login: ' + error.message);
        })
        .finally(() => {
            setIsLoading(false);
        })

    }

    return (

        <div className='__overlay'>

            <div className='__modal'>

                <div className='__modal-body'>

                    {!viewCode && (<p>{`¡Deja tu nombre y correo para tu cupón exclusivo!`}</p>)}

                    {!viewCode ? (
                    <div className='__form'>

                        <div className='__form-group'>
                            <input type='text' value={isNameUser} className='__entry' placeholder='Ingresa tu nombre' onChange={(e) => setIsNameUser(e.target.value)}/>
                        </div>
                        <div className='__form-group'>
                            <input type='email' value={isEmailUser} className='__entry' placeholder='Ingresa tu correo electrónico' onChange={(e) => setIsEmailUser(e.target.value)}/>
                        </div>
                        <div className='__form-group'>
                            <button className='__btn __btn-appy' onClick={handleSendData}>{isLoading ? 'Cargando...' : 'Obtener cupón'}</button>
                        </div>

                    </div>
                    ) : (
                        <div className='__code'>
                            <p>¡Usa este código al momento de hacer el pedido y verás el descuento!</p>
                            <div className='__codes'>
                                <span>OTY23</span>
                            </div>
                            <span className='__close' onClick={hiddenModal}>Cerrar</span>
                        </div>
                    )}

                </div>

            </div>

        </div>

    )

}

export default Modal