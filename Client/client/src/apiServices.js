// require('dotenv').config();
const baseURL = process.env.REACT_APP_BASE_URL;
console.log(baseURL);
// import baseURL from './'

// const baseURL = 'http://localhost:3001';

const apiService = {};

apiService.fetchItems = () => {
  const result = fetch(baseURL+'/items', {
    method: 'GET',
  })
  .then(response => response.json())
  .catch(err => console.log(err));
  return result;
}

apiService.login = (user) => {
  return fetch(`${baseURL}/login`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((res) => (res.json()))
    .catch((err) => console.log(err))
}

apiService.profile = (accessToken, tokenType) => {
  return fetch(`${baseURL}/me`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${tokenType} ${accessToken}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiService.register = (newUser) => {
  return fetch(`${baseURL}/users`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser),
  })
    .then((res) => (res.json()))
    .catch((err) => console.log(err))
}

apiService.getUsers = (accessToken) => {
  return fetch(`${baseURL}/users`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiService.follow = (profileId, currentId) => {
  return fetch(`${baseURL}/follow`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      currentUserId: currentId,
      profileUser: profileId
    })
  })
    .then((res) => res)
    .catch((err) => console.log(err));
};

apiService.ADQ = (UserId, ItemId) => {
  return fetch(`${baseURL}/adq`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      UserId: UserId,
      ItemId: ItemId
    })
  })
    .then((res) => res)
    .catch((err) => console.log(err));
};

apiService.fetchOneItem = (id) => {
  const result = fetch(baseURL+'/OneItem', {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ItemId: id,
    })
  })
  .then(response => response.json())
  .catch(err => console.log(err));
  return result;
}



export default apiService;