import React, { useState, useEffect, useRef, useCallback } from 'react';
import { fetchMovies } from '../../utils/api';
import MovieCard from '../../components/MovieCard';
import Spinner from '../../components/Spinner';
import './index.css';

const Home = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const observerRef = useRef();

    const handleSearch = async (e) => {
        e.preventDefault();
        setPage(1);
        setError('');
        setMovies([]);
        try {
            setLoading(true);
            const { movies, totalResults } = await fetchMovies(query, 1);
            setMovies(movies);
            setTotalResults(totalResults);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const loadMore = useCallback(async () => {
        try {
            setLoading(true);
            const { movies: newMovies } = await fetchMovies(query, page + 1);
            setMovies((prev) => [...prev, ...newMovies]);
            setPage((prev) => prev + 1);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [query, page]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && movies.length < totalResults) {
                    loadMore();
                }
            },
            { threshold: 1.0 }
        );

        if (observerRef.current) observer.observe(observerRef.current);

        return () => observer.disconnect();
    }, [movies, totalResults, loadMore]);

    return (
        <div className="home-container">
            <h1 className='web-heading'>Movie Explorer</h1>
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for movies..."
                />
                <button type="submit">Search</button>
            </form>
            {loading && <Spinner />}
            {error && <p className="error-message">{error}</p>}
            <div className="movie-grid">
                {movies.map((movie) => (
                    <MovieCard key={movie.imdbID} movie={movie} />
                ))}
            </div>
            <div ref={observerRef}></div>
        </div>
    );
};

export default Home;
