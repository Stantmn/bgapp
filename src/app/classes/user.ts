export class User {
  id: string;
  email: string;
  password: string;
  confirmPassword: string;
  token: string;
  salt: string;
  expiration: string;
  role: string;
  status: string;
  storeId: string;
  isLogged: boolean;
}
