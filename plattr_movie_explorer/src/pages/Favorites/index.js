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
            <h1>Your Favorites</h1>
            {favorites.length === 0 ? (
                <p>No favorite movies yet!</p>
            ) : (
                <div className="favorites-grid">
                    {favorites.map(movie => (
                        <div key={movie.imdbID} className="favorite-card">
                            <img src={movie.Poster} alt={movie.Title} />
                            <h3 className='movie-title'>{movie.Title}</h3>
                            <p className='movie-year'>{movie.Year}</p>
                            <Link className='details-link' to={`/movie/${movie.imdbID}`}>View Details</Link>
                            <button onClick={() => removeFromFavorites(movie.imdbID)} className="remove-button">
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;
