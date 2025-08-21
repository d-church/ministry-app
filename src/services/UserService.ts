// TODO: Implement UserService

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