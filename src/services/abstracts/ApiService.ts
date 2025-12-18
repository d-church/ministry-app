import axios, { type AxiosInstance, type AxiosResponse, AxiosError } from "axios";
import TokenStorage from "../../utils/TokenStorage";
import i18n from "../../bootstrap/i18n";
import type { Language } from "../../types";

export interface ApiConfig {
  language: Language;
}

abstract class ApiService {
  protected api: AxiosInstance = axios.create({
    baseURL: import.meta.env?.VITE_API_URL as string,
  });

  constructor() {
    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.api.interceptors.request.use(
      (config: any) => {
        if (TokenStorage.accessToken) {
          config.headers.Authorization = `Bearer ${TokenStorage.accessToken}`;
        }

        /*
         * Add language header if not manually set
         */
        if (!config.headers["x-locale"]) {
          const currentLanguage = i18n.language || "uk";
          config.headers["x-locale"] = currentLanguage;
        }

        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );

    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as any;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            if (TokenStorage.refreshToken) {
              const refreshData = await this.refreshToken(TokenStorage.refreshToken);
              const { accessToken, refreshToken: newRefreshToken } = refreshData;

              TokenStorage.setTokens(accessToken, newRefreshToken);

              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
              return this.api(originalRequest);
            }
          } catch (refreshError) {
            TokenStorage.clearTokens();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      },
    );
  }

  protected async refreshToken(refreshToken: string): Promise<{
    message: string;
    accessToken: string;
    refreshToken: string;
  }> {
    const response = await axios.post<{
      message: string;
      accessToken: string;
      refreshToken: string;
    }>(`${this.api.defaults.baseURL}auth/refresh-token`, { refreshToken });
    return response.data;
  }
}

export default ApiService;
