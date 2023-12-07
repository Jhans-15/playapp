import React, { useContext, useState } from 'react'
import { IconPlus, IconMinus } from "@tabler/icons-react";

import './styles/footer.css'
import { useCart } from '../context/CartContext';
import UserContext from '../context/UserContext';
import DiscountContext from '../context/DiscountContext';

function Footer({ screen, content }) {

    const { addItem, cart } = useCart();
    const { isUser } = useContext(UserContext);
    const { isApplyDiscount, isAmountDiscount } = useContext(DiscountContext);

    const [ isAmount, setIsAmount ] = useState(1);

    const [ textCart, setTextCart ] = useState('Añadir al carrito');

    let maxAmmount = content?.cantidad

    const handleChangeAmount = (change) => {
        const newAmount = change === 'max' ? isAmount + 1 : isAmount - 1;
        setIsAmount(Math.min(Math.max(newAmount, 1), maxAmmount));
    };


    const handleAddToCart = () => {
        addItem({
            id: content.id,
            name: content.name,
            price: content.price,
            categoria: content.category,
            photo: content.photo,
            images: content.images,
            quantity: isAmount
        });
        setTextCart('Añadido')
    };


    const handleShopping = () => {
        const phoneNumber = '+51995984231'; // Reemplaza con el número de WhatsApp al que deseas enviar el mensaje
        const customerName = isUser === '' ? '' : isUser.usuario; // Reemplaza con el nombre del cliente
        const message = generateWhatsAppMessage(cart.items, customerName);
      
        // Construye el enlace de WhatsApp
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      
        // Abre una nueva ventana o pestaña con el enlace de WhatsApp
        window.open(whatsappLink, '_blank');
    };

    const generateWhatsAppMessage = (cartItems, customerName) => {
        const itemsMessage = cartItems.map(item => {
            const subtotal = item.price * item.quantity;
            return `🔹${item.name} (${item.price}) x ${item.quantity} = $${subtotal.toFixed(2)}`;
        });
      
        let newTotal = cart.total - isAmountDiscount;
        const totalMessage = `========================\n💲 Total: $${isApplyDiscount ? newTotal.toFixed(2) : cart.total.toFixed(2)}`;
      
        const fullMessage = `¡Hola OTY 👋 !\n\nMe gustaría hacer un pedido con los siguientes detalles:${isUser.usuario === undefined ? '' : `\n\n👨 Cliente: ${customerName}`}\n\n🎳 Pedidos\n${itemsMessage.join('\n')}\n\n💲 Subtotal: s/. ${cart.total.toFixed(2)}\n${isApplyDiscount ? `💲 Descuento: s/. ${isAmountDiscount.toFixed(2)}\n` : ''}${totalMessage}\n\nPor favor, confírmame la disponibilidad y los detalles del envío.\n\n¡Gracias!`;
        
        return fullMessage;
    };      

    return (

        <>
        
            {screen === 'details' && (
            
                <footer className='__footer'>

                    <div className='__x7yshbz'>

                        <div className='__col1'>
                            <button className='__btn __btn-min' onClick={() => handleChangeAmount('min')}><IconMinus/></button>
                            <div className='__nums'>{isAmount}</div>
                            <button className='__btn __btn-max' onClick={() => handleChangeAmount('max')}><IconPlus/></button>
                        </div>

                        <div className='__col2'>
                            <button className='__btn __btn-primary' onClick={handleAddToCart}>{textCart}</button>
                        </div>

                    </div>

                </footer>
            
            )}

            {screen === 'cart' && (
            
                <footer className='__footer'>

                    <div className='__x7yshbz'>

                        <div className='__col2'>
                            {cart.items.length > 0 && (
                                <button className='__btn __btn-primary' onClick={handleShopping}>Hacer pedido</button>
                            )}
                        </div>

                    </div>

                </footer>
            
            )}
        
        </>

    )

}

export default Footer