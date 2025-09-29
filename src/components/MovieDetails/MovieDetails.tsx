import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { fetchMovieDetails } from '../../store/slices/movieSlice'
import { toggleFavorite, loadFavorites } from '../../store/slices/favoritesSlice'
import { logout } from '../../store/slices/authSlice'
import './MovieDetails.css'

export default function MovieDetailes(){
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const { selectedMovie, loading, error } = useSelector((state) => state.movies)
    const { favorites } = useSelector((state) => state.favorites)

    useEffect(() => {
        dispatch(loadFavorites())
        dispatch(fetchMovieDetails(id))
    }, [id, dispatch])

    const toggleFavoriteHandler = () => {
        if (selectedMovie) {
            dispatch(toggleFavorite(selectedMovie))
        }
    };

    const isFavorited = selectedMovie && favorites.some(fav => fav.imdbID === selectedMovie.imdbID);

    const handleLogout = () => {
        dispatch(logout())
    };
    
    const navigateBack = () => { navigate(-1) }

    if(loading) return(
        <div className="movie-details">
            <header className='header'>
                <div className="nav-brand">
                    <h1>Movies Explorer</h1>
                </div>
                <nav className="nav-links">
                    <Link to="/dashboard" className="nav-link">Movies</Link>
                    <Link to="/favorites" className="nav-link">Favorites</Link>
                </nav>
                <button onClick={handleLogout} className='logout-btn'>Logout</button>
            </header>
            <div className="loading-container">Loading...</div>
        </div>
    )

    if(error) return(
        <div className="movie-details">
            <header className='header'>
                <div className="nav-brand">
                    <h1>Movies Explorer</h1>
                </div>
                <nav className="nav-links">
                    <Link to="/dashboard" className="nav-link">Movies</Link>
                    <Link to="/favorites" className="nav-link">Favorites</Link>
                </nav>
                <button onClick={handleLogout} className='logout-btn'>Logout</button>
            </header>
            <div className="error-container">{error}</div>
        </div>        
    )

    if (!selectedMovie) return null;

    return(
        <div className="movie-details">
            <header className='header'>
                <div className="nav-brand">
                    <h1>Movies Explorer</h1>
                </div>
                <nav className="nav-links">
                    <Link to="/dashboard" className="nav-link">Movies</Link>
                    <Link to="/favorites" className="nav-link">Favorites</Link>
                </nav>
                <button onClick={handleLogout} className='logout-btn'>Logout</button>
            </header>

            <main className="details-content">
                <button onClick={navigateBack} className="back-btn">Back</button>
                
                <div className="movie-details-container">
                    <div className="movie-poster-section">
                        <div className="poster-placeholder">
                            {selectedMovie.Poster !== 'N/A' ? (
                                <img 
                                    className="movie-poster-image"
                                    src={selectedMovie.Poster}
                                    alt={selectedMovie.Title}
                                />
                            ) : (
                                <div className="poster-fallback">
                                    <span>Poster</span>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="movie-info-section">
                        <div className="movie-header">
                            <h1 className="movie-title-large">{selectedMovie.Title}</h1>
                            <button 
                                onClick={toggleFavoriteHandler}
                                className={`add-favorite-btn ${isFavorited ? 'favorited' : ''}`}
                            >
                                {isFavorited ? 'Remove from favorites' : 'Add as favorite'}
                            </button>
                        </div>
                        
                        <p className="movie-plot">{selectedMovie.Plot}</p>
                        
                        <div className="movie-meta-grid">
                            <div className="meta-row">
                                <span className="meta-label">Genres</span>
                                <span className="meta-value">{selectedMovie.Genre}</span>
                            </div>
                            <div className="meta-row">
                                <span className="meta-label">Release Year</span>
                                <span className="meta-value">{selectedMovie.Year}</span>
                            </div>
                            <div className="meta-row">
                                <span className="meta-label">Directors</span>
                                <span className="meta-value">{selectedMovie.Director}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>    
    )
}