import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

const API_KEY = '6b446ff0';
const API_URL = 'http://www.omdbapi.com/';

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  [key: string]: string | number | undefined;
}

export interface MovieDetails extends Movie {
  Rated: string;
  Released: string;
  Genre: string;
  Actors: string;
}

export interface MoviesState {
  movies: Movie[];
  selectedMovie: MovieDetails | null;
  loading: boolean;
  loadingMore: boolean;
  error: string;
  currentPage: number;
  totalResults: number;
  searchTerm: string;
}

const initialState: MoviesState = {
  movies: [],
  selectedMovie: null,
  loading: false,
  loadingMore: false,
  error: '',
  currentPage: 1,
  totalResults: 0,
  searchTerm: '',
};

export const searchMovies = createAsyncThunk<
  {
    movies: Movie[];
    totalResults: number;
    page: number;
    searchTerm: string;
    append: boolean;
  },
  { searchTerm: string; page?: number }
>(
  'movies/searchMovies',
  async ({ searchTerm, page = 1 }) => {
    const response = await fetch(`${API_URL}?apikey=${API_KEY}&s=${searchTerm}&page=${page}`);
    const data = await response.json();

    if (response.ok && data.Response === 'True') {
      const uniqueMovies = data.Search?.filter((movie: Movie, index: number, self: Movie[]) =>
        index === self.findIndex(m => m.imdbID === movie.imdbID)
      ) || [];

      return {
        movies: uniqueMovies,
        totalResults: parseInt(data.totalResults),
        page,
        searchTerm,
        append: page > 1,
      };
    } else {
      throw new Error(data.Error || 'No movies found');
    }
  }
);

export const fetchMovieDetails = createAsyncThunk<MovieDetails, string>(
  'movies/fetchMovieDetails',
  async (movieId) => {
    const response = await fetch(`${API_URL}?apikey=${API_KEY}&i=${movieId}`);
    const data = await response.json();

    if (response.ok && data.Response === 'True') {
      return data;
    } else {
      throw new Error(data.Error || 'Movie not found');
    }
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearMovies: (state) => {
      state.movies = [];
      state.error = '';
      state.currentPage = 1;
      state.totalResults = 0;
      state.searchTerm = '';
    },
    clearError: (state) => {
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.pending, (state, action) => {
        if (action.meta.arg.page === 1) {
          state.loading = true;
        } else {
          state.loadingMore = true;
        }
        state.error = '';
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        const { movies, totalResults, page, searchTerm, append } = action.payload;

        if (append) {
          const existingIds = new Set(state.movies.map(movie => movie.imdbID));
          const newMovies = movies.filter(movie => !existingIds.has(movie.imdbID));
          state.movies = [...state.movies, ...newMovies];
        } else {
          state.movies = movies;
        }

        state.totalResults = totalResults;
        state.currentPage = page;
        state.searchTerm = searchTerm;
        state.loading = false;
        state.loadingMore = false;
        state.error = '';
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.loadingMore = false;
        state.error = action.error.message || 'Failed to fetch movies. Please try again.';
      })
      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.selectedMovie = action.payload;
        state.loading = false;
        state.error = '';
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch movie details.';
      });
  },
});

export const { clearMovies, clearError } = moviesSlice.actions;
export default moviesSlice.reducer;