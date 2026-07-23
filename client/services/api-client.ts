import axios, { AxiosError, type AxiosRequestConfig } from 'axios'
import { accessTokenStore } from '@/features/auth/storage/access-token'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'

type ApiErrorPayload = {
  message?: string
  errors?: unknown[]
  statusCode?: number
}

export class ApiClientError extends Error {
  statusCode?: number
  errors: unknown[]

  constructor(message: string, statusCode?: number, errors: unknown[] = []) {
    super(message)
    this.name = 'ApiClientError'
    this.statusCode = statusCode
    this.errors = errors
  }
}

export const httpClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

httpClient.interceptors.request.use((config) => {
  const accessToken = accessTokenStore.get()

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorPayload>) => {
    const payload = error.response?.data
    const message = payload?.message || error.message || 'Request failed'

    return Promise.reject(
      new ApiClientError(
        message,
        payload?.statusCode || error.response?.status,
        payload?.errors || [],
      ),
    )
  },
)

const unwrap = <T>(request: Promise<{ data: T }>): Promise<T> =>
  request.then((response) => response.data)

export const apiClient = {
  get: <T>(path: string, config?: AxiosRequestConfig) =>
    unwrap(httpClient.get<T>(path, config)),
  post: <T, TBody = unknown>(path: string, body?: TBody, config?: AxiosRequestConfig) =>
    unwrap(httpClient.post<T>(path, body, config)),
  put: <T, TBody = unknown>(path: string, body?: TBody, config?: AxiosRequestConfig) =>
    unwrap(httpClient.put<T>(path, body, config)),
  patch: <T, TBody = unknown>(path: string, body?: TBody, config?: AxiosRequestConfig) =>
    unwrap(httpClient.patch<T>(path, body, config)),
  del: <T>(path: string, config?: AxiosRequestConfig) => unwrap(httpClient.delete<T>(path, config)),
}
