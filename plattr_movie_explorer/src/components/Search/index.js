import React, {useState} from 'react';
import './index.css'

const Search = ({onSearch}) => {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();

        if (query.trim() !== '') {
            onSearch(query)
        }
    } 

  return (
    <div>
      <div className="search-container">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search for a movie..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="search-input"
                />
                <button type="submit" className="search-button">Search</button>
            </form>
        </div>
    </div>
  );
};

export default Search
