const ACCESS_TOKEN_KEY = 'vivaha.accessToken'

let memoryToken: string | null = null

const canUseBrowserStorage = () => typeof window !== 'undefined'

export const accessTokenStore = {
  get(): string | null {
    if (memoryToken) return memoryToken

    if (!canUseBrowserStorage()) return null

    memoryToken = window.localStorage.getItem(ACCESS_TOKEN_KEY)
    return memoryToken
  },

  set(token: string): void {
    memoryToken = token

    if (canUseBrowserStorage()) {
      window.localStorage.setItem(ACCESS_TOKEN_KEY, token)
    }
  },

  clear(): void {
    memoryToken = null

    if (canUseBrowserStorage()) {
      window.localStorage.removeItem(ACCESS_TOKEN_KEY)
    }
  },
}
