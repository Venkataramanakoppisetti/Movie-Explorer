import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../Spinner';
import './index.css';

const API_KEY = '5c714149';
const BASE_URL = 'https://www.omdbapi.com/';

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await fetch(`${BASE_URL}?i=${id}&apikey=${API_KEY}`);
                const data = await response.json();

                if (data.Response === "False") {
                    throw new Error(data.Error);
                }

                setMovie(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);

    const addToFavorites = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const isAlreadyFavorite = favorites.some(fav => fav.imdbID === movie.imdbID);

        if (!isAlreadyFavorite) {
            favorites.push(movie);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            alert('Movie added to favorites!');
        } else {
            alert('Movie is already in favorites.');
        }
    };

    if (loading) return <Spinner />;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="movie-detail-container">
            {movie && (
                <>
                    <img src={movie.Poster} alt={movie.Title} className="movie-detail-poster" />
                    <div className="movie-detail-info">
                        <h1>{movie.Title}</h1>
                        <p><strong>Plot:</strong> {movie.Plot}</p>
                        <p><strong>Director:</strong> {movie.Director}</p>
                        <p><strong>Cast:</strong> {movie.Actors}</p>
                        <p><strong>Release Date:</strong> {movie.Released}</p>
                        <p><strong>Runtime:</strong> {movie.Runtime}</p>
                        <p><strong>IMDb Rating:</strong> {movie.imdbRating}</p>
                        <button onClick={addToFavorites} className="favorite-button">Add to Favorites</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default MovieDetails;
