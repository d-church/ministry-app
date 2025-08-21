import ApiService from "./ApiService";
import TokenStorage from "../utils/TokenStorage";
import type { AxiosResponse } from "axios";
import type { User } from "./UserService";

class AuthService extends ApiService {
  async login(credentials: LoginCredentials) {
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

  async logout(): Promise<void> {
    TokenStorage.clearTokens();
  }

  async getCurrentUser(): Promise<AxiosResponse> {
    return this.api.get("/auth/me");
  }

  isAuthenticated(): boolean {
    return TokenStorage.hasValidTokens();
  }
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export default new AuthService();
