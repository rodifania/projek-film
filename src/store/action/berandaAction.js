export const SET_TRENDING = "SET_TRENDING";
export const SET_POPULER = "SET_POPULER";
export const SET_PEOPLE = "SET_PEOPLE";

export const settrending = (trending) => {
  return {
    type: SET_TRENDING,
    payload: trending,
  };
};

export const setpopuler = (populer) => {
  return {
    type: SET_POPULER,
    payload: populer,
  };
};

export const setpeople = (people) => {
  return {
    type: SET_PEOPLE,
    payload: people,
  };
};
