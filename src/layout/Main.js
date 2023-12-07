import React from 'react'

import './styles/main.css'
import Featured from '../views/Featured'
import Recent from '../views/Recent'
import Photo from '../views/Photo'
import Data from '../views/Data'
import { useParams } from 'react-router-dom'
import ShoppingCart from '../views/ShoppingCart'
import Filters from '../views/Filters'
import List from '../views/List'

function Main({ screen, datos }) {

    const { id } = useParams();

    return (

        <>
        
            {screen === 'home' && (

                <main className='__hyxbs6'>

                    <Featured/>

                    <Recent/>

                </main>

            )}

            {screen === 'details' && (

                <main className='__hxyhns1'>

                    <Photo id={id} content={datos} />

                    <Data id={id} content={datos} />

                </main>

            )}

            {screen === 'cart' && (

                <main className='__xbys56b'>

                    <ShoppingCart/>

                </main>

            )}

            {screen === 'all' && (

                <main className='__7uxn21'>

                    <Filters/>

                    <List/>

                </main>

            )}

        </>

    )

}

export default Main