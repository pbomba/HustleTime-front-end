export const fetchLoginUser = (username, password) => {
  const url = 'http://localhost:3000/api/v1/auth'
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ username, password })
  }
  return fetch(url, options)
  .then(resp => resp.json())
}

export const fetchReauthUser = () => {
  const url = 'http://localhost:3000/api/v1/reauth'
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: localStorage.getItem('token')
    }
  }
  return fetch(url, options)
  .then(resp => resp.json())
}