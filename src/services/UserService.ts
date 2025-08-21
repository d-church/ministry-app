import RestService from "./abstracts/RestService";

class UserService extends RestService<User> {
  protected anchor = "users";

  public async getMe(): Promise<User> {
    const response = await this.api.get<User>("/users/get-me");
    return response.data;
  }
}

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  photo: string;
  photoKey: string;
  // TODO: Add role
  role: "admin";
  createdAt: string;
  updatedAt: string;
}

export default new UserService();