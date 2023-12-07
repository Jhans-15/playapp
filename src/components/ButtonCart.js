import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IconShoppingBag } from '@tabler/icons-react'
import { useCart } from '../context/CartContext';

import './styles/buttoncart.css'

function ButtonCart() {

    const navigate = useNavigate();

    const { cart } = useCart();

    const handleCart = () => navigate('/cart');

    return (

        <button className='__btn __btn-cart' onClick={handleCart}>
            <div className='__syhhbx'>
                {cart.items.length > 0 && (
                    <span className='__badge __badge-point'>{cart.items.length}</span>
                )}
                <IconShoppingBag/>
            </div>
        </button>

    )

}

export default ButtonCart