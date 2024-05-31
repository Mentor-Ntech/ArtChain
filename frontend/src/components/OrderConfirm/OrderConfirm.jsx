import React, { useState, useEffect, useContext } from 'react';
import { getAllArts } from '../../utils/db';
import "./OrderConfirm.css";
import { ArtStatusContext } from '../../context/ArtStatusContext';
// import { BuyArtContext } from '../../context/BuyArtContext';
import { BuyArtContext } from '../../context/BuyArtContext ';

const OrderConfirm = () => {
    const [arts, setArts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { artStatus, setArtStatus } = useContext(ArtStatusContext);
    const { isBuyArtClicked } = useContext(BuyArtContext); // Updated line

    useEffect(() => {
        const fetchArts = async () => {
            try {
                const savedArts = await getAllArts();
                setArts(savedArts);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchArts();
    }, []);

    const handleConfirmPayment = (id) => {
        setArtStatus((prevStatus) => ({ ...prevStatus, [id]: 'bought' }));
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <section className="artSection">
                {/* <div>
                    <h1>cjdkmn</h1>
                </div> */}

                {arts.map((art) => (
                    <div key={art._id} className="artSection-one">
                        <p>{artStatus[art._id] === 'bought' ? 'Sold' : 'Unsold'}</p>
                        <img className='artsectionImage' src={`http://localhost:5000/${art.image}`} alt={art.title} />
                        <div className='artDetails'>
                        <div>
                            <h2>{art.title}</h2>
                        </div>
                        <div className="creator">
                            <img src={`http://localhost:5000/${art.creatorImage}`} alt={art.creatorName}/>
                            <h4 className="creatorName">{art.creatorName}</h4>
                        </div>
                        <div className="artTag">
                            
                            <div>
                                <h2>{art.description}</h2>
                            </div>
                            
                        </div>
                        <div className="artTag">
                            <div>
                                <h2>{art.price}</h2>
                            </div>
                            {artStatus[art._id] === 'processing' && (
                                <button className="artTag-btn" onClick={() => handleConfirmPayment(art._id)}>
                                    Confirm Payment
                                </button>
                            )}
                            {artStatus[art._id] === 'bought' && (
                                <button className="artTag-btn-success" disabled>
                                    Successful
                                </button>
                            )}
                        </div>
                        </div>
                        
                    </div>
                ))}
            </section>
        </div>
    );
};

export default OrderConfirm;
