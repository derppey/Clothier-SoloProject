const actions = {
  getItems : (items) => ({
    type: 'getItems',
    payload: items
  }),
  getUser : (user) => ({
    type: 'getUser',
    payload: user
  }),
  toggleSearchTrue : () => ({
    type: 'toggleSearchTrue',
    payload: true
  }),
  toggleSearchFalse : () => ({
    type: 'toggleSearchTrue',
    payload: false
  })
};

export default actions;