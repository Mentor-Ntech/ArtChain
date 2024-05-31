import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ArtStatusContext = createContext();

const ArtStatusProvider = ({ children }) => {
    const [artStatus, setArtStatus] = useState(() => {
        const savedStatus = localStorage.getItem('artStatus');
        return savedStatus ? JSON.parse(savedStatus) : {};
    });

    useEffect(() => {
        const saveArtStatus = async () => {
            try {
                await axios.post('http://localhost:5000/api/artStatus', artStatus);
            } catch (err) {
                console.error('Failed to save art status: ', err);
            }
        };

        saveArtStatus();
    }, [artStatus]);

    return (
        <ArtStatusContext.Provider value={{ artStatus, setArtStatus }}>
            {children}
        </ArtStatusContext.Provider>
    );
};

export default ArtStatusProvider;
