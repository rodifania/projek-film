import { SET_PEOPLE, SET_POPULER, SET_TRENDING } from "../action/berandaAction";

const nilaiDefault = {
  trending: [],
  populer: [],
  People: [],
};

const berandaReducer = (state = nilaiDefault, action) => {
  switch (action.type) {
    case SET_TRENDING:
      return {
        ...state,
        trending: action.payload,
      };

    case SET_POPULER:
      return {
        ...state,
        populer: action.payload,
      };
      
      case SET_PEOPLE:
        return {
          ...state,
          people: action.payload,
        };
    default:
      return state;
  }
};

export default berandaReducer;
