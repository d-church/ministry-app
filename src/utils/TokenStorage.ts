class TokenStorage {
  private static readonly ACCESS_TOKEN_KEY = "accessToken";
  private static readonly REFRESH_TOKEN_KEY = "refreshToken";

  public static get accessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  public static set accessToken(token: string | null) {
    if (token) {
      localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    }
  }

  public static get refreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  public static set refreshToken(token: string | null) {
    if (token) {
      localStorage.setItem(this.REFRESH_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    }
  }

  public static setTokens(accessToken: string, refreshToken: string): void {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  public static clearTokens(): void {
    this.accessToken = null;
    this.refreshToken = null;
  }

  public static hasValidTokens(): boolean {
    return Boolean(this.accessToken && this.refreshToken);
  }
}

export default TokenStorage;
