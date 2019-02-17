export class User {
  id: string;
  email: string;
  password: string;
  token: string;
  salt: string;
  expiration: string;
  status: string;
  isLogged: boolean;
  role: number;
}
