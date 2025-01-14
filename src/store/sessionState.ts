
import type { BaseUser } from './baseUser'
import type { SessionToken } from './loginUser'

export interface SessionState<TUser extends BaseUser = BaseUser> {
  user?: TUser
  authenticated: boolean
  token?: SessionToken | null
  expiresAt?: Date | null | undefined
}
