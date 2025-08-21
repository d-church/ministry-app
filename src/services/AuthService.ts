import TokenStorage from "../utils/TokenStorage";

import ApiService from "./abstracts/ApiService";
import UserService from "./UserService";
import type { User } from "./UserService";

class AuthService extends ApiService {
  public async login(credentials: LoginCredentials) {
    const response = await this.api.post<{
      user: User;
      accessToken: string;
      refreshToken: string;
      message: string;
    }>("/auth/login-admin", credentials);

    if (response.data.accessToken && response.data.refreshToken) {
      TokenStorage.setTokens(response.data.accessToken, response.data.refreshToken);
    }

    return response.data?.user;
  }

  public async logout(): Promise<void> {
    TokenStorage.clearTokens();
  }

  public async getCurrentUser(): Promise<User> {
    return UserService.getMe();
  }

  public isAuthenticated(): boolean {
    return TokenStorage.hasValidTokens();
  }
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export default new AuthService();
