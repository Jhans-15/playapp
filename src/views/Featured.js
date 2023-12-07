import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import PlaysContext from '../context/PlaysContext'

import Product from '../components/Product'

import './styles/featured.css'

function Featured() {

    const { isFeatured, getFeatured } = useContext(PlaysContext);

    const [ cachedFeatured, setCachedFeatured ] = useState([]);

    useEffect(() => {

        const getCachedData = () => {

            const cached = localStorage.getItem('featured');

            if (!cached) return null;

            try {
                
                return JSON.parse(cached);

            } catch (error) {
                console.log('Failed to parse: ' + error);
                return null;
            }

        }

        const cachedData = getCachedData();

        if (!cachedData || cachedData.length === 0) {
            getFeatured();
        } else {

            const areDataEqual = JSON.stringify(cachedData) === JSON.stringify(isFeatured);

            if (areDataEqual) {
                setCachedFeatured(cachedData);
            } else {
                setCachedFeatured(isFeatured);
                localStorage.setItem('featured', JSON.stringify(isFeatured));
            }

        }

    }, [getFeatured, isFeatured]);

    useEffect(() => {
        if (isFeatured && isFeatured.length > 0) {
            setCachedFeatured(isFeatured);
            localStorage.setItem('featured', JSON.stringify(isFeatured));
        }
    }, [isFeatured]);
    

    return (

        <div className='__xyyhan'>

            <div className='__tit'>
                <div className='__xols1'>
                    <span>Destacados</span>
                </div>
                <div className='__xols2' style={{display:'none'}}>
                    <Link>Ver más</Link>
                </div>
            </div>

            <div className='__scroll-h'>

                {cachedFeatured.map((play) => (
                    <Product key={play.id} id={play.id} type={'horizontal'} name={play.name} price={play.price} categoria={play.category} photo={play.photo} images={play.images} />
                ))}

            </div>

        </div>

    )

}

export default Featured