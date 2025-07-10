export interface IUser {
  id: string;
  phoneNumber: string;
  email?: string;
}

export interface ICreateUserData {
  name: string;
  email: string;
}
