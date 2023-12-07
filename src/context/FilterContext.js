import React, { createContext, useState } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {

    const [ isFilter, setIsFilter ] = useState('0');

    const changeFilter = (filter) => setIsFilter(filter);

    const contextValue = {
        isFilter, changeFilter
    }

    return (
        <FilterContext.Provider value={contextValue}>{children}</FilterContext.Provider>
    )

}

export default FilterContext;