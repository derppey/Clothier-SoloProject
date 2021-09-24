import { combineReducers } from 'redux';

const initialState = {
  items: [
    {
    title: 'testItem',
    category: 'jeans',
    image: "https://www.zappos.com/images/z/5/1/4/2/0/9/5142092-p-DETAILED.jpg"
  },
] ,
};

const items = (state = initialState, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

// Combining both reducers
const reducers = combineReducers({
  items,
});

export default reducers;