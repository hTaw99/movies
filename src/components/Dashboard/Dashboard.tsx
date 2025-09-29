import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { searchMovies, clearMovies } from '../../store/slices/movieSlice'
import { logout } from '../../store/slices/authSlice'
import { loadFavorites } from '../../store/slices/favoritesSlice'
import './Dashboard.css';
import Search from '../Search/Search';
import MovieCard from '../MovieCard/MovieCard';


const API_KEY = '6b446ff0';
const API_URL = 'http://www.omdbapi.com/';

export default function Dashboard() {
   const dispatch = useDispatch()
   const { movies, loading, loadingMore, error, currentPage, totalResults, searchTerm } = useSelector((state) => state.movies)

    useEffect(() => {
        dispatch(loadFavorites())
    }, [dispatch])

    const handleSearch = (term) => {
        dispatch(searchMovies({ searchTerm: term, page: 1 }))
    }

    const loadMore = () => {
        if (searchTerm && currentPage * 10 < totalResults) {
            dispatch(searchMovies({ searchTerm, page: currentPage + 1 }))
        }
    };

    const handleLogout = () => {
        dispatch(logout())
        dispatch(clearMovies())
    };

    const hasMoreMovies = searchTerm && currentPage * 10 < totalResults;


    return (
        <div className='dashboard'>
            <header className='header'>
                <h1>Movie to watch</h1>
                <nav className='nav-links'>
                    <Link to="/dashboard" className="nav-link active">Movies</Link>
                    <Link to="/favorites" className="nav-link">Favorites</Link>
                </nav>
                <button onClick={handleLogout} className='logout-btn'>Logout</button>
            </header>

            <main className='main-content'>
                <div className="hero-section">
                    <h2>Welcome to our Movie App!</h2>
                    <p>Search for your favorite movies</p>
                </div>

                <Search onSearch={handleSearch} loading={loading} />
                
                {error && (<div className="error-message">{error}</div>)}
                
                {movies.length > 0 && (
                    <div className="results-section">
                        <h3>Search Results : {movies.length} / {totalResults} movies</h3>
                        <div className="movies-grid">
                            {movies.map((movie) => (
                                <MovieCard 
                                    key={movie.imdbID} 
                                    movie={movie}
                                />
                            ))}
                        </div>
                        
                        {hasMoreMovies && (
                            <div className='pagination'>
                                <button 
                                    className='load-more-btn' 
                                    onClick={loadMore} 
                                    disabled={loadingMore}
                                >
                                    {loadingMore ? 'Loading...' : 'Load More'}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            
                {loading && (
                    <div className="loading-section">
                        <div className="loading-spinner"></div>
                        <p>Searching for movies...</p>
                    </div>
                )}
            </main>
        </div>
    );
}