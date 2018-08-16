export class UserToken {

  nameid: string;
  email: string;

  exp: number;
  iat: number;
  nbf: number;

  userType: string;

  role: string[];
}
