import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { IconMinus, IconPlus, IconX } from '@tabler/icons-react';
import settings from '../config'

import { useCart } from "../context/CartContext";

import photoDefault from '../assets/img/default.png'

import './styles/product.css'
import FilterContext from '../context/FilterContext';

function Product({ id, type, name, price, categoria, photo, cantidad, images }) {

    const { isFilter } = useContext(FilterContext);

    let classeNueva = isFilter === categoria || isFilter === '0' ? '' : 'none';

    const { removeItem } = useCart();

    const navigate = useNavigate();
    const handleDetails = (product_id) => navigate('/details/' + product_id); 

    const defaultImage = images[0];
    const image = photo === '0' ? photoDefault : `${settings.API}/plays/photos/${defaultImage}`;

    const categories = ['default', 'Niñas', 'Niños', 'Bebes', 'Educativo', 'Familiar'];

    const handleRemoveItem = (deleteItem) => removeItem({id: deleteItem});

    return (

        <>

            {type === 'horizontal' && (

                <div className='__xhtuxa' onClick={() => handleDetails(id)}>

                    <div className='__xhstza' style={{ backgroundImage: `url(${image})` }}></div>

                    <div className='__xhstzb'>
                        <span className={`badge badge-gender_${categoria}`}>{categories[categoria]}</span>
                        <div className='__row-zsh'>
                            <h3 className={`__tit-h4`}>{name}</h3>
                            <span className={`__prc`}>s/. {price}</span>
                        </div>
                    </div>

                </div>

            )}

            {type === 'vertical' && (
                <div className={`__xhtuxb`} onClick={() => handleDetails(id)} style={{display: `${classeNueva}`}}>
                    <div className='__colxs-1'>
                        <div className='__c9usbzx'>
                            <figure className='__photo'>
                                <img src={image} alt={name} loading='lazy' />
                            </figure>
                        </div>
                        <div className='__c0usbzx'>
                            <h5>{name}</h5>
                            <span  className={`badge badge-gender_${categoria}`}>{categories[categoria]}</span>
                        </div>
                    </div>
                    <p className={`__prc-xll`}>s/. {price}</p>
                </div>
            )}

            {type === 'currency' && (

                <div className='__xnys61'>

                    <div className='__xlosyz'>

                        <div className='__0oxn1jx'>
                            <figure className='__photo'>
                                <img src={image} alt={name} loading='lazy' />
                            </figure>
                        </div>

                        <div className='__9oxn1jx'>
                            <h4>{name}</h4>
                            <span className='__prc-product'>s/. {price}</span>
                            <div className='__ammount-change'>
                                <button className='__btn __btn-min'><IconMinus/></button>
                                <div className='__amount'>{cantidad}</div>
                                <button className='__btn __btn-max'><IconPlus/></button>
                            </div>
                        </div>

                    </div>

                    <button className='__btn-delete' onClick={() => handleRemoveItem(id)}><IconX/></button>

                </div>

            )}
        
        </>

    )

}

export default Product