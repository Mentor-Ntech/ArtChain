import React, { useState, useEffect, useContext } from 'react';
import ArtLogo from '../../assets/orderImg.jpeg';
import './OrderCreation.css';
import { addArt, getAllArts } from '../../utils/db';
import { Link } from 'react-router-dom';
import { ArtStatusContext } from '../../context/ArtStatusContext';

const OrderCreation = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        image: null,
        creatorImage: null,
        title: '',
        description: '',
        price: '',
        creatorName: ''
    });
    const [arts, setArts] = useState([]);
    const { artStatus, setArtStatus } = useContext(ArtStatusContext);

    useEffect(() => {
        const fetchArts = async () => {
            const savedArts = await getAllArts();
            setArts(savedArts);
        };

        fetchArts();
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({ ...formData, [name]: files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('image', formData.image);
        data.append('creatorImage', formData.creatorImage);
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('creatorName', formData.creatorName);

        await addArt(data);
        const savedArts = await getAllArts();
        setArts(savedArts);
        closeModal();
    };

    const handleBuyArt = (id) => {
        setArtStatus((prevStatus) => ({ ...prevStatus, [id]: 'processing' }));
    };

    return (
        <div className="--orderCreation-header">
            <div className="orderCreation">
                <div className="orderCreation-img">
                    <img src={ArtLogo} alt="" />
                </div>
                <div className="orderCreation-secong">
                    <h1>
                        Extraordinary <br /> <span>Art</span> you'll love
                    </h1>
                    <button className="button" onClick={openModal}>Create Art</button>
                    <Link to="/artMarket">
                        <button className="button">Art Market</button>
                    </Link>
                </div>
            </div>

            <div className="marketplace">
                <h1>ART MARKETPLACE</h1>
            </div>

            <section className="artSection">
                {arts.map((art) => (
                    <div key={art._id} className="artSection-one">
                        <p>{artStatus[art._id] === 'bought' ? 'Sold' : 'Unsold'}</p>
                        <img className='artsectionImage' src={`http://localhost:5000/${art.image}`} alt={art.title} />
                        <div className='artDetails'>
                        <div>
                            <h2>{art.title}</h2>
                        </div>
                        <div className="creator">
                            <img src={`http://localhost:5000/${art.creatorImage}`} alt={art.creatorName} />
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
                            
                        <button className="artTag-btn" onClick={() => handleBuyArt(art._id)} disabled={artStatus[art._id] === 'bought' || artStatus[art._id] === 'processing'}>
                            {artStatus[art._id] === 'processing' ? 'Processing' : artStatus[art._id] === 'bought' ? 'Art Purchased' : 'Buy Art'}
                        </button>
                        </div>
                        </div>
                        
                    </div>
                ))}
            </section>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>Create New Art</h2>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Image:
                                <input type="file" name="image" onChange={handleFileChange} required />
                            </label>
                            <label>
                                Creator Image:
                                <input type="file" name="creatorImage" onChange={handleFileChange} required />
                            </label>
                            <label>
                                Title:
                                <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
                            </label>
                            <label>
                                Description:
                                <textarea name="description" value={formData.description} onChange={handleInputChange} required />
                            </label>
                            <label>
                                Price:
                                <input type="number" name="price" value={formData.price} onChange={handleInputChange} required />
                            </label>
                            <label>
                                Creator Name:
                                <input type="text" name="creatorName" value={formData.creatorName} onChange={handleInputChange} required />
                            </label>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderCreation;
