import React, { createContext, useState } from "react";

const DiscountContext = createContext();

export const DiscountProvider = ({ children }) => {

    const [ isApplyDiscount, setIsApplyDiscount ] = useState(false);
    const [ isAmountDiscount, setAmountDiscount ] = useState(0);

    const getApplyDiscount = (discount) => {
        setAmountDiscount(discount);
        setIsApplyDiscount(true);
    }

    const contextValue = {
        isApplyDiscount,
        isAmountDiscount,
        getApplyDiscount
    }

    return (
        <DiscountContext.Provider value={contextValue}>{children}</DiscountContext.Provider>
    )

}

export default DiscountContext;