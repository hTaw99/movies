import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  [key: string]: any;
}

interface FavoritesState {
  favorites: Movie[];
}

const initialState: FavoritesState = {
  favorites: JSON.parse(localStorage.getItem('movieFavorites') || '[]'),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    loadFavorites: (state) => {
      const savedFavorites = localStorage.getItem('movieFavorites');
      state.favorites = savedFavorites ? JSON.parse(savedFavorites) : [];
    },
    addToFavorites: (state, action: PayloadAction<Movie>) => {
      const movie = action.payload;
      const isAlreadyFavorite = state.favorites.some((fav) => fav.imdbID === movie.imdbID);

      if (!isAlreadyFavorite) {
        state.favorites.push(movie);
        localStorage.setItem('movieFavorites', JSON.stringify(state.favorites));
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      const movieId = action.payload;
      state.favorites = state.favorites.filter((movie) => movie.imdbID !== movieId);
      localStorage.setItem('movieFavorites', JSON.stringify(state.favorites));
    },
    toggleFavorite: (state, action: PayloadAction<Movie>) => {
      const movie = action.payload;
      const existingIndex = state.favorites.findIndex((fav) => fav.imdbID === movie.imdbID);

      if (existingIndex >= 0) {
        state.favorites.splice(existingIndex, 1);
      } else {
        state.favorites.push(movie);
      }

      localStorage.setItem('movieFavorites', JSON.stringify(state.favorites));
    },
    clearFavorites: (state) => {
      state.favorites = [];
      localStorage.removeItem('movieFavorites');
    },
  },
});

export const {
  loadFavorites,
  addToFavorites,
  removeFromFavorites,
  toggleFavorite,
  clearFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;