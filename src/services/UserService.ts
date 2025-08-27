import RestService from "./abstracts/RestService";
import { type UserMinistry } from "./MinistryService";

class UserService extends RestService<User> {
  protected anchor = "users";

  public async getMe(): Promise<User> {
    const response = await this.api.get<User>(`/${this.anchor}/get-me`);

    console.log(response.data);
    return response.data;
  }
}

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  SUPERADMIN = 'super_admin',
  DEVELOPER = 'developer'
}

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  photo: string;
  photoKey: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
  userMinistries: UserMinistry[];
}

export default new UserService();
