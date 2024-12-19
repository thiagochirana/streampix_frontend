import axios from 'axios'

const Api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
})

Api.interceptors.request.use(async (config) => {
  config.headers['Access-Control-Allow-Origin'] = '*'
  config.headers.Authorization = `Bearer ${getToken()}`
  config.timeout = 9999999
  config.maxContentLength = 100000000
  config.maxBodyLength = 100000000

  return config
})

const getToken = () => {
  if (localStorage.getItem('ACCESS_TOKEN')) {
    const token = JSON.parse(localStorage.getItem('ACCESS_TOKEN'))
    if (token) {
      return token
    }
  }

  return null
}

export default Api
