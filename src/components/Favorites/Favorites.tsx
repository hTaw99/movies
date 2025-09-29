import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { loadFavorites } from '../../store/slices/favoritesSlice'
import { logout } from '../../store/slices/authSlice'
import MovieCard from '../MovieCard/MovieCard';
import'./Favorites.css'

const Favorites = () => {
    const dispatch = useDispatch()
    const { favorites } = useSelector((state) => state.favorites)

    useEffect(() => {
        dispatch(loadFavorites())
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logout())
    };

    return (
        <div className="favorites">
            <header className='header'>
                <div className="nav-brand">
                    <h1>Favorite Movies</h1>
                </div>
                <nav className="nav-links">
                    <Link to="/dashboard" className="nav-link">Movies</Link>
                    <Link to="/favorites" className="nav-link active">Favorites</Link>
                </nav>
                <button onClick={handleLogout} className='logout-btn'>Logout</button>
            </header>

            <main className="favorites-content">
                {favorites.length === 0 ? (
                    <div className="empty-favorites">
                        <h2>No favorites yet</h2>
                        <p>Start exploring movies and add them to your favorites!</p>
                        <Link to="/dashboard" className="browse-btn">Browse Movies</Link>
                    </div>
                ) : (
                    <div className="favorites-grid">
                        {favorites.map((movie) => (
                            <MovieCard
                                key={movie.imdbID}
                                movie={movie}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Favorites;