import { action } from "mobx";

import { ObjectStore } from "../utils/abstracts/store";
import AuthService from "../services/AuthService";
import type { User } from "../services/UserService";
import type { LoginCredentials } from "../services/AuthService";

class AccountStore extends ObjectStore<User> {
  @action public async login(credentials: LoginCredentials): Promise<User> {
    const user = await AuthService.login(credentials);
    this.setData(user);

    return user;
  }

  @action public async logout(): Promise<void> {
    await AuthService.logout();
    this.removeData();
  }

  public get isAuthenticated(): boolean {
    return AuthService.isAuthenticated() && this.isDataExist;
  }
}

export default new AccountStore();
