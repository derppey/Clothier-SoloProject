import { combineReducers } from 'redux';

const initialState = {
  items: [] ,
  setAuthenticated: false
}

const items = (state = initialState, action) => {
  switch (action.type) {
    case 'getItems':
    return {items: [...state.items, ...action.payload]};
  default:
    return state;
  }
};

// Combining both reducers
const reducers = combineReducers({
  items,
});

export default reducers;