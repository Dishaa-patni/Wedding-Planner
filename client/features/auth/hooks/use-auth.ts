'use client'

import { useMutation } from '@tanstack/react-query'
import { appToast } from '@/components/ui/app-toaster'
import { accessTokenStore } from '../storage/access-token'
import { authApi, mapLoginToLoginRequest, mapSignupToRegisterRequest } from '../api/auth.api'
import type { LoginFormValues, SignupFormValues } from '../schemas'

const getErrorMessage = (error: Error) => error.message || 'Please try again.'

const saveAuthSession = (accessToken: string) => {
  accessTokenStore.set(accessToken)
}

export const useRegisterUser = () =>
  useMutation({
    mutationFn: (values: SignupFormValues) => authApi.register(mapSignupToRegisterRequest(values)),
    onSuccess: (response) => {
      saveAuthSession(response.data.accessToken)
      appToast.success({
        title: 'Account created',
        description: response.message,
      })
    },
    onError: (error: Error) => {
      appToast.error({
        title: 'Signup failed',
        description: getErrorMessage(error),
      })
    },
  })

export const useLoginUser = () =>
  useMutation({
    mutationFn: (values: LoginFormValues) => authApi.login(mapLoginToLoginRequest(values)),
    onSuccess: (response) => {
      saveAuthSession(response.data.accessToken)
      appToast.success({
        title: 'Welcome back',
        description: response.message,
      })
    },
    onError: (error: Error) => {
      appToast.error({
        title: 'Login failed',
        description: getErrorMessage(error),
      })
    },
  })

export const useGoogleOAuth = () => ({
  startGoogleOAuth: authApi.startGoogleOAuth,
})

export const useLogout = () => ({
  logout: accessTokenStore.clear,
})
