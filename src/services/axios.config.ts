import { BASE_URL, cancelRequest } from '@/utils'
import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  signal: cancelRequest(),
})

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log('🚀 ~ config:', config)
    return config
  },
  (error: AxiosError) => {
    console.error('Request interceptor error:', {
      message: error.message,
      code: error.code,
      status: error.response?.status,
    })
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('🚀 ~ response:', response)
    return response.data
  },
  (error: AxiosError) => {
    console.error('Response interceptor error:', {
      message: error.message,
      code: error.code,
      status: error.response?.status,
    })
    return Promise.reject(error.response?.data)
  }
)

export default axiosInstance
