import React, { useEffect } from 'react'
import Header from '../layout/Header'
import Main from '../layout/Main';

import '../assets/css/all.css'

function AllScreens() {

    useEffect(() => {
        
        const newClass = document.getElementById('root');
        newClass.classList.add('__77uxnsx')

        return () => {
            newClass.classList.remove('__77uxnsx');
        }

    }, []);

    return (

        <>
        
            <Header screen={'all'} />

            <Main screen={'all'} />

        </>

    )

}

export default AllScreens