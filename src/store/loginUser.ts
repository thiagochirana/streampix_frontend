import type { BaseUser } from "./baseUser";

export interface LoginUser {
  login: string
  password: string
}

export interface StartSessionProps<TUser extends BaseUser = BaseUser> {
  user: TUser;
  token: SessionToken;
}

export interface SessionToken {
  /**
   * Tipo do token
   * @example Se o token completo for "Bearer 123", o tipo é "Bearer"
   * @example "Bearer"
   * @example "Basic"
   */
  type: string;

  /**
   * Valor do token, sem o tipo.
   * @example "Bearer 123" -> "123"
   */
  accessToken: string;

  refreshToken?: string;

  /**
   * Se a lógica de refresh está habilitada. No entanto o token pode não ser atualizável ou não ter um refresh token.
   * @default true
   */
  isRefreshEnabled?: boolean;

  /**
   * Se definido, indica a data de expiração do token.
   * @variation Se for uma string, vai ser interpretado como uma data ISO.
   * @variation Se for um número, vai ser interpretado como um timestamp em milissegundos.
   */
  expiresIn?: string | number | Date | undefined;

}