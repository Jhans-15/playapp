import React, { useContext, useEffect } from 'react'
import PlaysContext from '../context/PlaysContext'
import Product from '../components/Product';

function List() {

    const { isPlays, getPlays } = useContext(PlaysContext);

    useEffect(() => {
        // Verifica si isPlays ya tiene datos (longitud mayor a cero)
        if (isPlays.length === 0) {
            getPlays();
        }
    }, [getPlays, isPlays]);

    return (

        <>
        
            {isPlays.map((p) => (
                <Product key={p.id} type={'vertical'} id={p.id} name={p.name} price={p.price} categoria={p.category} photo={p.photo} images={p.images} />
            ))}

        </>

    )

}

export default List