const actions = {
  getItems : (items) => ({
    type: 'getItems',
    payload: items
  }),
  getUser : (user) => ({
    type: 'getUser',
    payload: user
  }),
  getSingleItem : (item) => ({
    type: 'getSingleItem',
    payload: item
  }),
  setSearchVal : (item) => ({
    type: 'setSearchVal',
    payload: item
  }),
  setSelectedUser : (user) => ({
    type: 'setSelectedUser',
    payload: user
  }),
};

export default actions;