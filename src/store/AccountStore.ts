import { action } from "mobx";

import { ObjectStore } from "./abstracts";
import AuthService from "../services/AuthService";
import GlobalStore from "./GlobalStore";
import type { User } from "../services/UserService";
import type { LoginCredentials } from "../services/AuthService";

class AccountStore extends ObjectStore<User> {
  @action public async login(credentials: LoginCredentials): Promise<User> {
    const user = await AuthService.login(credentials);
    this.setData(user);

    return user;
  }

  @action public async logout(): Promise<void> {
    try {
      await AuthService.logout();
    } finally {
      GlobalStore.clearAllStores();
    }
  }

  @action public async loadCurrentUser(): Promise<void> {
    if (!AuthService.isAuthenticated()) {
      return;
    }

    try {
      const user = await AuthService.getCurrentUser();

      this.setData(user);
    } catch (error) {
      console.error('Failed to load current user:', error);
      await this.logout();
    }
  }

  public get isAuthenticated(): boolean {
    return AuthService.isAuthenticated() && this.isDataExist;
  }
}

export default new AccountStore();
