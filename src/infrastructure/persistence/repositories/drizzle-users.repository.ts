import { eq } from "drizzle-orm";

import { User, UserWithPassword } from "~/domain/entities/user.entity";
import type { UsersRepository } from "~/domain/interfaces/users-repository.interface";
import { db as database } from "~/infrastructure/persistence/drizzle/db";
import { usersTable } from "~/infrastructure/persistence/drizzle/schemas/users.schema";

export class DrizzleUsersRepository implements UsersRepository {
  constructor(private readonly db = database) {}

  async create(data: {
    name: string;
    username: string;
    password: string;
  }): Promise<User> {
    const [existingUser] = await this.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, data.username));

    if (existingUser) {
      throw new Error("User already exists");
    }

    const [newUser] = await this.db.insert(usersTable).values(data).returning({
      id: usersTable.id,
      name: usersTable.name,
      username: usersTable.username,
    });

    if (!newUser) {
      throw new Error("Failed to create user");
    }

    return new User(newUser.id, newUser.name, newUser.username);
  }

  async findById(id: string): Promise<UserWithPassword | null> {
    const [user] = await this.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id));

    if (!user) {
      return null;
    }

    return new UserWithPassword(
      user.id,
      user.name,
      user.username,
      user.password,
    );
  }

  async findByUsername(username: string): Promise<UserWithPassword | null> {
    const [user] = await this.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, username));

    if (!user) {
      return null;
    }

    return new UserWithPassword(
      user.id,
      user.name,
      user.username,
      user.password,
    );
  }
}
