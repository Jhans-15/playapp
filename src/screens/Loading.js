import React, { useEffect } from 'react'

import '../assets/css/loading.css'

function Loading() {

    useEffect(() => {

        const clase = document.getElementById('root');
        clase.classList.add('__l0ad1ng');

        return () => {
            clase.classList.remove('__l0ad1ng');
        }

    }, []);

    return (

        <div className='__box-l0ng1ng'>
            <div className='loader'></div>
        </div>

    )

}

export default Loading