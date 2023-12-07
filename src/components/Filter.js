import React, { useContext } from 'react'
import FilterContext from '../context/FilterContext'


import './styles/filter.css'

function Filter({ type, filter }) {

    const { isFilter, changeFilter } = useContext(FilterContext);

    return (

        <div className={`__filtor ${type === isFilter ? '__filtor--active-default' : ''}`} onClick={() => changeFilter(type)}>{filter}</div>

    )

}

export default Filter