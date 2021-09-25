import { combineReducers } from 'redux';

const initialState = {
  items: [],
  user: {},
  searchBool: false
}

const store = (state = initialState, action) => {
  switch (action.type) {
    case 'getItems':
    return {
      ...state,
      items: [...action.payload]
    };
    case 'getUser':
      return {
        ...state,
        user: {...action.payload}
        };
    case 'toggleSearchTrue':
      return {
        ...state,
        searchBool: action.payload
        };
    case 'toggleSearchFalse':
      return {
        ...state,
        searchBool: action.payload
      };
    default:
      return state;
  }
};

// Combining both reducers
const reducers = combineReducers({
  store,
});

export default reducers;