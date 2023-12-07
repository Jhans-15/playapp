import React, { createContext, useState } from "react";

import settings from "../config";

const PlaysContext = createContext();

export const PlaysProvider = ({ children }) => {

    const [ isPlays, setIsPlays ] = useState([]);

    const [ isPlay, setIsPlay ] = useState([]);
    const [ isLoadingPlay, setIsLoadingPlay ] = useState(false);

    const [ isFeatured, setIsFeatured ] = useState([]);
    const [ isRecent, setIsRecent ] = useState([]);

    const [ isCategories, setIsCategories ] = useState([]);

    const getPlays = async () => {

        try {
            
            const response = await fetch(`${settings.API}/plays`);
            const data = await response.json();
            setIsPlays(data);

        } catch (error) {
            
            console.log('Error fetching: ', error);

        }

    }

    const getFeatured = async () => {

        try {

            const response = await fetch(`${settings.API}/plays/?featured`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            // Obtener los datos reales del servidor PHP
            const data = await response.json();
            setIsFeatured(data);

        } catch (error) {

            console.log('Error Fetching: ', error.message);

        }
    } 
    
    const getRecent = async () => {
        try {

            const response = await fetch(`${settings.API}/plays/?recent`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            // Obtener los datos reales del servidor PHP
            const data = await response.json();
            setIsRecent(data);

        } catch (error) {

            console.log('Error Fetching: ', error.message);

        }
    } 

    const getPlay = async (id) => {

        try {
            
            const response = await fetch(`${settings.API}/plays/?id=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            // Obtener los datos reales del servidor PHP
            const data = await response.json();
            setIsPlay(data);
            setIsLoadingPlay(true);

        } catch (error) {
            
            console.log('Error Fetching: ', error.message);
            setIsLoadingPlay(false);

        }

    }

    const getCategories = async () => {

        try {
            
            const response = await fetch(`${settings.API}/plays/?list`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            // Obtener los datos reales del servidor PHP
            const data = await response.json();
            setIsCategories(data)

        } catch (error) {
            
            console.log('Error Fetching: ', error.message);

        }

    }

    const contextValue = {
        isPlays, getPlays,
        isPlay, getPlay,
        isFeatured, getFeatured,
        isRecent, getRecent,
        isCategories, getCategories,
        isLoadingPlay
    }

    return (
        <PlaysContext.Provider value={contextValue}>{children}</PlaysContext.Provider>
    )

}

export default PlaysContext;