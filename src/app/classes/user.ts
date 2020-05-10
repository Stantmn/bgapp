import { Roles } from '../constants/enums';

export class User {
  _id: string;
  email: string;
  password: string;
  confirmPassword: string;
  token: string;
  salt: string;
  expiration: string;
  role: Roles;
  status: string;
  submerchant: string;
  storeName: string;
  isLogged: string;
}
