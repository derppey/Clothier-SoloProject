import { combineReducers } from 'redux';

const initialState = {
  items: [],
  user: {},
  searchVal: '',
  selectedItem: {},
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
    case 'getSingleItem':
      return {
        ...state,
        selectedItem: action.payload
      };
    case 'setSearchVal':
      return {
        ...state,
        searchVal: action.payload
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