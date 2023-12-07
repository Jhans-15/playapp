import React, { useState } from 'react'

import './styles/photo.css'
import settings from '../config'

import defaultProduct from '../assets/img/default.png'

function Photo({ content }) {

    const defaultImage = content.photo === '0' ? defaultProduct : content.images[0];

    const [ selectedImage, setSelectedImages ] = useState(defaultImage);

    const url = `${settings.API}/plays/photos`;
    const urlBig = `${settings.API}/plays/photos/${selectedImage}`;

    return (

        <div className='__phoyxns'>

            <div className='__photo-primary' style={{backgroundImage: `url(${content.photo === '0' ? defaultProduct : urlBig})`}}></div>

            {content.photo === '1' && (
                <div className='__photo-sliders'>
                    {content.images.map((image, index) => (
                        <div className={`__photo-item ${selectedImage === image ? '__photo-item--active' : ''}`} key={index} style={{backgroundImage: `url(${url}/${image})`}} onClick={() => setSelectedImages(image)}></div>
                    ))}
                </div>
            )}

        </div>

    )

}

export default Photo