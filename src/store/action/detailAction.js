// action/detailAction.js
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const SET_DATA = 'SET_DATA';
export const SET_RATING = 'SET_RATING'; // New action for setting a rating

export const toggleFavorite = (movieId) => ({
  type: TOGGLE_FAVORITE,
  payload: movieId,
});

export const setData = (data) => ({
  type: SET_DATA,
  payload: data,
});

export const setRating = (movieId, rating) => ({
  type: SET_RATING,
  payload: { movieId, rating }, // Pass both movie ID and rating
});
