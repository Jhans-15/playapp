import React, { useContext, useEffect } from 'react'
import PlaysContext from '../context/PlaysContext'

import './styles/filters.css'
import Filter from '../components/Filter';

function Filters() {

    const { isCategories, getCategories } = useContext(PlaysContext);

    useEffect(() => {
        getCategories();
    }, [getCategories])

    return (

        <div className='__filters'>
            <Filter filter={'Todo'} type={'0'} />
            {isCategories.map((filter) => (
                <Filter key={filter.id} type={filter.category_id} filter={filter.category}/>
            ))}
        </div>

    )

}

export default Filters