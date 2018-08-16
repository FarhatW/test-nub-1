export class ResetPasswordResource {
  public email: string;
  public password: string;
  public confirmPassword: string;
  public code: string
}
export class FormUserPasswordSaveModel {
  constructor(
    public password: string,
    public confirmPassword: string) {
  }
}
