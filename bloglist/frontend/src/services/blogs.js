import axios from 'axios'
import { loadState } from '../stateLoader'
const baseUrl = '/api/blogs'

const refreshToken = () => {
  let user = null
  const loadedState = loadState()

  if (loadedState !== null) {
    user = JSON.parse(loadedState.user)
  }

  setToken(user.token)

  return user
}

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  refreshToken()
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  refreshToken()
  const config = {
    headers: {
      Authorization: token,
    },
  }
  if (newObject) {
    delete newObject.user
  }
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return response.data
}

const remove = async (id) => {
  refreshToken()
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { setToken, getAll, create, update, remove }
