import React, { useContext, useEffect, useState } from 'react'

import '../assets/css/details.css'
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Main from '../layout/Main';
import PlaysContext from '../context/PlaysContext';
import { useParams } from 'react-router-dom';
import Loading from './Loading';

function DetailScreens() {
    
    const { id } = useParams();
    const { isPlay, getPlay, isLoadingPlay } = useContext(PlaysContext);
    const [ dataLoaded, setDataLoaded ] = useState(false);

    document.title = `${isPlay.name} | OTY`

    useEffect(() => {
        const classNew = document.getElementById('root');
        classNew.classList.add('__xyhnsz');
    
        return () => {
            classNew.classList.remove('__xyhnsz');
        };
    }, []);

    useEffect(() => {

        if (!dataLoaded) {
            getPlay(id);
            setDataLoaded(true);
        }
        
    }, [getPlay, id, dataLoaded]);

    useEffect(() => {
        return () => {
            setDataLoaded(false);
        }
    }, []);

    return (

        <>

            {!isLoadingPlay ? (
                <Loading/>
            ) : (
                <>

                    <Header screen={'details'} content={isPlay} />

                    <Main screen={'details'} datos={isPlay} />

                    <Footer screen={'details'} content={isPlay} />
                
                </>
            )}

        </>

    )

}

export default DetailScreens