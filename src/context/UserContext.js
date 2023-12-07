import React, { createContext, useState } from "react";

import settings from "../config";

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [ isUser, setUser ] = useState([]);

    const getUser = async (token_user) => {

        try {
            
            const response = await fetch(`${settings.API}/users/user.php?c_user=${token_user}`);
            const data = await response.json();
            setUser(data);

        } catch (error) {
            
            console.log('Failed to fetch user: ' + JSON.stringify(error));

        }

    }

    const contextValue = {
        isUser, getUser
    }

    return (
        <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
    )

}

export default UserContext;