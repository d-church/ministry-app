import axios, {
  type AxiosInstance,
  type AxiosResponse,
  AxiosError,
} from "axios";
import TokenStorage from "../utils/TokenStorage";

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
              const response = await this.refreshToken(TokenStorage.refreshToken);
              const { accessToken, refreshToken: newRefreshToken } = response.data;

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

  protected async refreshToken(refreshToken: string): Promise<AxiosResponse> {
    return axios.post(`${this.api.defaults.baseURL}auth/refresh`, {
      refreshToken,
    });
  }
}

export default ApiService;
