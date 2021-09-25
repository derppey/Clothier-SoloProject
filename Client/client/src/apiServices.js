const baseURL = 'http://localhost:3001';

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

apiService.profile = (accessToken) => {
  return fetch(`${baseURL}/me`, {
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


export default apiService;