const API_KEY = '5c714149';
const BASE_URL = 'https://www.omdbapi.com/';

export const fetchMovies = async (query, page = 1) => {
    try {
        const response = await fetch(`${BASE_URL}?s=${query}&page=${page}&apikey=${API_KEY}`);
        const data = await response.json();

        if (data.Response === "False") {
            throw new Error(data.Error);
        }

        return { movies: data.Search, totalResults: parseInt(data.totalResults, 10) };
    } catch (error) {
        console.log("Error fetching movies: ", error);
        throw error;
    }
};
