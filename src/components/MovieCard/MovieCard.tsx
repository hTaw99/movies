import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { toggleFavorite } from '../../store/slices/favoritesSlice'
import './MovieCard.css';
export default function MovieCard({ movie }) {
    
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { favorites } = useSelector((state) => state.favorites)
    
    const isFav = favorites.some((favorite) => favorite.imdbID === movie.imdbID)

    const handleFavoriteClick = (e) => {
        e.stopPropagation();
        dispatch(toggleFavorite(movie))
    };

    const handleCardClick = () => {
        navigate(`/movie/${movie.imdbID}`)
    };

    return (
        <div className="movie-card" onClick={handleCardClick}>
            <div className="movie-poster">
                <img 
                    src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450/cccccc/666666?text=No+Image'} 
                    alt={movie.Title}
                />
                <button 
                    className={`favorite-btn ${isFav ? 'favorited' : ''}`}
                    onClick={handleFavoriteClick}
                >
                    {isFav ? '❤️' : '🤍'}
                </button>
            </div>
            
            <div className="movie-info">
                <h3 className="movie-title">{movie.Title}</h3>
                <p className="movie-year">{movie.Year}</p>
                <p className="movie-type">{movie.Type}</p>
            </div>
        </div>
    );
}