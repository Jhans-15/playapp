import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PlaysContext from '../context/PlaysContext';

import Product from '../components/Product';

import './styles/recent.css'

function Recent() {

    const { isRecent, getRecent } = useContext(PlaysContext);
    const [ cachedRecent, setCachedRecent ] = useState([]);

    useEffect(() => {

        const getCachedData = () => {

            const cached = localStorage.getItem('recent');
            if (!cached) {
                return null;
            }

            try {
                const cachedData = JSON.parse(cached);
                return cachedData;
            } catch (error) {
                console.error('Error parsing cached data:', error);
                return null;
            }
        };

        const cachedData = getCachedData();

        if (!cachedData || cachedData.length === 0 ) {
            // Si no hay datos en caché, obtén los datos recientes de la API
            getRecent();
        } else {
            const areDataEqual = JSON.stringify(cachedData) === JSON.stringify(isRecent);

            if (areDataEqual) {
                // Si los datos son iguales, usa los datos de la caché
                setCachedRecent(cachedData);
            } else {
                // Si son diferentes, actualiza la caché con los nuevos datos de la API
                setCachedRecent(isRecent);
                localStorage.setItem('recent', JSON.stringify(isRecent));
            }
        }
    }, [getRecent, isRecent]);

    useEffect(() => {
        if (isRecent && isRecent.length > 0) {
            setCachedRecent(isRecent);
            localStorage.setItem('recent', JSON.stringify(isRecent));
        }
    }, [isRecent]);

    return (

        <div className='__jxusbaz'>

            <div className='__tit'>
                <div className='__xols1'>
                    <span>Recientes</span>
                </div>
                <div className='__xols2'>
                    <Link to={'/all'}>Ver más</Link>
                </div>
            </div>

            <div className='__scroll-v'>

                {cachedRecent.map((play) => (

                    <Product key={play.id} id={play.id} type={'vertical'} name={play.name} price={play.price} categoria={play.category} photo={play.photo} images={play.images} />

                ))}

            </div>

        </div>

    )

}

export default Recent