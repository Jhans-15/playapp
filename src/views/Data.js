import React from 'react'

import './styles/data.css'

function Data({ id, content }) {

    const categories = ['default', 'Niñas', 'Niños', 'Bebes', 'Educativo', 'Familiar'];

    return (

        <div className='___xyhsv1'>

            <div className='__name-product'>
                <div>
                    <h3 title={content.name}>{content.name}</h3>
                    <span className={`badge badge-gender_${content.category}`}>{categories[content.category]}</span>
                </div>
                <div style={{width: '30%'}}>
                    <span>s/. {content.price}</span>
                </div>
            </div>

            <div className='__desc-product'>
                <p>{content.description}</p>
            </div>

            <div className='__ammount-product'>
                <h5>Disponibles: {content.cantidad}</h5>
                <h5>Código: {content.code}</h5>
            </div>

        </div>

    )

}

export default Data