import { defineStore } from 'pinia'
import type { BaseUser } from './baseUser'
import type { SessionToken, StartSessionProps } from './loginUser'
import type { SessionState } from './sessionState'

export const SESSION_STORE = 'sessionStore'

export const useSessionStore = defineStore(SESSION_STORE, {
  state: (): SessionState => ({
    authenticated: false,
    user: undefined,
    token: undefined,
    expiresAt: undefined,
  }),
  actions: {
    setToken(token: SessionToken): void {
      this.$patch({ token })
    },

    login<TUser extends BaseUser = BaseUser>(props: StartSessionProps<TUser>) {
      const state: SessionState = {
        authenticated: true,
        user: props.user,
        token: props.token,
        expiresAt: props.token.expiresIn instanceof Date ? props.token.expiresIn : undefined,
      }

      this.$patch(state)

      return props.user
    },
    logout() {
      this.$reset()

      this.authenticated = false
    },
  },
  getters: {
    isLoggedIn: (state) => state.authenticated && state.user,
    fullname: (state) => state.user?.name || '',
  },
})
