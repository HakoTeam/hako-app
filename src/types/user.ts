export interface IUser {
  user_id: string;
  company_id?: string;
  phone_number: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  day_of_birth?: string;
  address?: string;
  city?: string;
  district?: string;
  created_at: string;
  updated_at: string;
}

export interface ICreateUserData {
  company_id?: string;
  phone_number: string;
  email?: string;
  password: string;
  first_name?: string;
  last_name?: string;
  day_of_birth?: string;
  address?: string;
  city?: string;
  district?: string;
}
