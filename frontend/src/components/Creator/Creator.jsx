import React, { useState, useEffect } from 'react';
import { getAllArts } from '../../utils/db';
import './Creator.css';

const Creator = () => {
    const [arts, setArts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArts = async () => {
            try {
                const savedArts = await getAllArts();
                setArts(savedArts);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchArts();
    }, []);

    return (
        <div>
            <div className='creatorSection'>
                <div>
                    <h1>Top Creators</h1>
                </div>
                <div className='sub-creatorSection'>
                    <h3>Checkout Top Rated Creators On The Nft Marketplace</h3>
                    <button>View Ranking</button>
                </div>

                {arts.map((art) => (
                    <div key={art._id} className='creatorSectionDetails'>
                        <div className='creatorSectionDetail'>
                            <div className='sub-creatorSectionDetails'>
                                <div className='secDetails'>
                                    <img src={`http://localhost:5000/${art.creatorImage}`} alt={art.creatorName} />
                                    <p>{art.creatorName}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {error && <p>Error: {error}</p>}
            </div>
        </div>
    );
};

export default Creator;
