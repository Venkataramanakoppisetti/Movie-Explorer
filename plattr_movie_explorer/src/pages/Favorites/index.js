import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);
    }, []);

    const removeFromFavorites = (id) => {
        const updatedFavorites = favorites.filter(movie => movie.imdbID !== id);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    return (
        <div className="favorites-container">
            {favorites.length === 0 ? (
                <>
                    <img 
                    src='https://cdni.iconscout.com/illustration/premium/thumb/product-is-empty-illustration-download-in-svg-png-gif-file-formats--no-records-list-record-emply-data-user-interface-pack-design-development-illustrations-6430781.png?f=webp'
                    className='no-movies-found' 
                    alt='no favorite movies yet'
                    />
                    <h1>No Favorite movies yet</h1>
                </>
                
            ) : (
                <>
                    <h1>Your Favorites</h1>
                    <div className="favorites-grid">
                        
                        {favorites.map(movie => (
                            <div key={movie.imdbID} className="favorite-card">
                                <img className='poster' src={movie.Poster} alt={movie.Title} />
                                <h3 className='movie-title'>{movie.Title}</h3>
                                <p className='movie-year'>{movie.Year}</p>
                                <Link className='details-link' to={`/movie/${movie.imdbID}`}>View Details</Link>
                                <button onClick={() => removeFromFavorites(movie.imdbID)} className="remove-button">
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                </>
                
            )}
        </div>
    );
};

export default Favorites;
