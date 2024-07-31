export interface PasswordService {
  hash(plainPassword: string): Promise<string>;

  verify(plainPassword: string, hashedPassword: string): Promise<boolean>;
}
