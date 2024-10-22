// reducer/detailReducer.js
import { SET_DATA, TOGGLE_FAVORITE, SET_RATING } from "../action/detailAction";

const initialState = {
  data: [], // Array to store movie details
  favorites: [], // Array to store favorite movie IDs
  ratings: {}, // Object to store movie ratings (movieId: rating)
};

const detailReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        data: action.payload
      };

    case TOGGLE_FAVORITE:
      const isFavorite = state.favorites.includes(action.payload);
      return {
        ...state,
        favorites: isFavorite
          ? state.favorites.filter((id) => id !== action.payload) // Remove from favorites
          : [...state.favorites, action.payload], // Add to favorites
      };

    case SET_RATING:
      const { movieId, rating } = action.payload;
      return {
        ...state,
        ratings: {
          ...state.ratings,
          [movieId]: rating, // Update or add rating for the movie
        },
      };

    default:
      return state;
  }
};

export default detailReducer;
