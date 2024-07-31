import type { User, UserWithPassword } from "~/domain/entities/user.entity";

export interface UsersRepository {
  /**
   * @throws If the username is already taken.
   */
  create(data: {
    name: string;
    username: string;
    password: string;
  }): Promise<User>;

  findById(id: string): Promise<UserWithPassword | null>;

  findByUsername(username: string): Promise<UserWithPassword | null>;
}
