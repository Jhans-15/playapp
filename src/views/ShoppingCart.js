import React, { useContext, useState } from 'react'
import Product from '../components/Product'
import { useCart } from '../context/CartContext'
import { IconCheck, IconChevronDown } from '@tabler/icons-react';

import emptycart from '../assets/img/empty-cart.png'

import './styles/shopping.css'
import DiscountContext from '../context/DiscountContext';

function ShoppingCart() {

    const codes = ['OTY23', 'FAC3B00K', 'PROMVIDAD'];
    const { cart } = useCart();
    const { isApplyDiscount, isAmountDiscount, getApplyDiscount } = useContext(DiscountContext);

    const [ entryCode, setEntryCode ] = useState('');
    const subtotalPrice = cart.total;

    const applyPromoCode = () => {
        const matchedCode = codes.find(code => code === entryCode.toUpperCase());
        const ammount_discount = matchedCode ? 5 : 0;
        const newDiscountPrice = (ammount_discount / 100) * subtotalPrice;

        getApplyDiscount(newDiscountPrice);
    };

    const totalPay = (subtotalPrice - isAmountDiscount);

    return (

        <>
        
            {cart.items.length > 0 ? (
            <>
                {cart.items.map((cart) => (
                    <Product key={cart.id} id={cart.id} type={'currency'} name={cart.name} categoria={cart.categoria} price={cart.price} photo={cart.photo} images={cart.images} cantidad={cart.quantity} />
                ))}
                <div className='__cart'>

                    {!isApplyDiscount && (
                        <div className='__row __mb-2'>
                            <div className='__tit-prom'>
                                <span className='__span-tit'>Código de promoción</span>
                                <span className='__span-ico'><IconChevronDown/></span>
                            </div>
                            <div className='__entry-prom'>
                                <div className='__entry'>
                                    <input type='text' className='__entry-code' placeholder='Ingresa el código de promoción' value={entryCode} onChange={(e) => setEntryCode(e.target.value)} />
                                    <button className='__btn __btn-apply' onClick={applyPromoCode}><IconCheck/></button>
                                </div>
                            </div>
                        </div>
                    )}

                    {cart.items.map((itemCart, index) => (
                        <div className='__row __row-sub' key={index}>
                            <div className='__sub-tit'>
                                <span>{itemCart.name}</span>
                            </div>
                            <div className='__sub-prc'>
                                <span>s/. {itemCart.price}</span>
                            </div>
                        </div>
                    ))}

                    <div className='__line'></div>
                    <div className='__row __row-sub'>
                        <div className='__sub-tit'>
                            <span>SubTotal</span>
                        </div>
                        <div className='__sub-prc'>
                            <span>s/. {subtotalPrice.toFixed(2)}</span>
                        </div>
                    </div>

                    {isApplyDiscount && (
                        <>
                            <div className='__line'></div>
                            <div className='__row __row-sub'>
                                <div className='__sub-tit'>
                                    <span>Descuento</span>
                                </div>
                                <div className='__sub-prc'>
                                    <span>s/. {isAmountDiscount.toFixed(2)}</span>
                                </div>
                            </div>
                        </>
                    )}
                    <div className='__line'></div>
                    <div className='__row __row-tol'>
                        <div className='__sub-tit'>
                            <span>Total</span>
                        </div>
                        <div className='__sub-prc'>
                            <span>s/. {totalPay.toFixed(2)}</span>
                        </div>
                    </div>

                </div>
            </>
            ) : (
                <>
                    <div className='__centerd'>

                        <div className='__box'>
                            <div className='__img'>
                                <img src={emptycart} alt='No hay productos en el carrito' />
                            </div>
                            <span>No hay productos en el carrito</span>
                        </div>

                    </div>
                </>
            )}

        </>

    )

}

export default ShoppingCart