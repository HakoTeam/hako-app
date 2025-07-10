export interface IUser {
  id: string;
  phoneNumber: string;
  email?: string;
  avatar?: string;
}

export interface ICreateUserData {
  name: string;
  email: string;
}
