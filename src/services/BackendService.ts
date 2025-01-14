import { useSessionStore } from '@/store/auth.store'
import axios from 'axios'

const Api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  timeout: 9999999,
  maxContentLength: 100000000,
  maxBodyLength: 100000000,
})

const sessionStore = useSessionStore()


const getToken = () => {
  const token = localStorage.getItem('ACCESS_TOKEN')
  return token ? JSON.parse(token) : null
}

Api.interceptors.request.use((config) => {
  if (config.headers['Require-Auth'] !== false) {
    const token = sessionStore.token || getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }

  config.headers['Access-Control-Allow-Origin'] = '*'
  return config
})

const V1 = (method: string, route: string, data = {}, requireAuth = true) => {
  const url = '/backend/v1' + route
  return Api({
    method,
    url,
    data,
    headers: {
      'Require-Auth': requireAuth,
    },
  })
}

const Root = (method: string, url: string, data = {}, requireAuth = false) => {
  return Api({
    method,
    url,
    data,
    headers: {
      'Require-Auth': requireAuth,
    },
  })
}

export default {
  V1,
  Root,
}
