import React, { useState } from 'react';
import './Search.css';

const Search = ({ onSearch, loading }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            onSearch(searchTerm);
        }
    };

    return (
        <div className="search-container">
            <form onSubmit={handleSubmit} className="search-form">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <button 
                    type="submit" 
                    className="search-btn"
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Search'}
                </button>
            </form>
        </div>
    );
};

export default Search;