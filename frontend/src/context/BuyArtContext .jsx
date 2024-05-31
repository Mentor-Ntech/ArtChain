import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const BuyArtContext = createContext();

const BuyArtProvider = ({ children }) => {
    const [buyArtStatus, setBuyArtStatus] = useState(() => {
        const savedStatus = localStorage.getItem('buyArtStatus');
        return savedStatus ? JSON.parse(savedStatus) : {};
    });

    const [isBuyArtClicked, setIsBuyArtClicked] = useState(false); // Add this line

    useEffect(() => {
        const saveBuyArtStatus = async () => {
            try {
                await axios.post('http://localhost:5000/api/buyArtStatus', buyArtStatus);
            } catch (err) {
                console.error('Failed to save buy art status: ', err);
            }
        };

        saveBuyArtStatus();
    }, [buyArtStatus]);

    return (
        <BuyArtContext.Provider value={{ buyArtStatus, setBuyArtStatus, isBuyArtClicked, setIsBuyArtClicked }}>
            {children}
        </BuyArtContext.Provider>
    );
};

export default BuyArtProvider;
