import type { StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import type postgres from "postgres";

import type { UsersRepository } from "~/domain/interfaces/users-repository.interface";
import { setupTestContainer } from "~/infrastructure/persistence/drizzle/__tests__/setup";
import type { db as database } from "~/infrastructure/persistence/drizzle/db";
import { DrizzleUsersRepository } from "~/infrastructure/persistence/repositories/drizzle-users.repository";

describe("DrizzleUsersRepository", () => {
  let client: postgres.Sql;
  let container: StartedPostgreSqlContainer;
  let db: typeof database;
  let repository: UsersRepository;

  beforeEach(async () => {
    const testContainer = await setupTestContainer();

    client = testContainer.client;
    container = testContainer.container;
    db = testContainer.db;
    repository = new DrizzleUsersRepository(db);
  }, 60000);

  afterEach(async () => {
    await client.end();
    await container.stop();
  });

  describe("create", () => {
    test("should create a new user", async () => {
      const newUser = await repository.create({
        name: "John Doe",
        username: "johndoe",
        password: "password",
      });

      expect(newUser).toEqual({
        id: expect.any(String),
        name: "John Doe",
        username: "johndoe",
      });
    });

    test("should not create a user if the username already exists", async () => {
      await repository.create({
        name: "John Doe",
        username: "johndoe",
        password: "password",
      });

      await expect(
        repository.create({
          name: "Jane Doe",
          username: "johndoe",
          password: "password",
        }),
      ).rejects.toThrow("User already exists");
    });
  });

  describe("findById", () => {
    test("should return a user by id", async () => {
      const newUser = await repository.create({
        name: "John Doe",
        username: "johndoe",
        password: "password",
      });

      const user = await repository.findById(newUser.id);

      expect(user).toEqual({
        id: newUser.id,
        name: "John Doe",
        username: "johndoe",
        password: "password",
      });
    });

    test("should return null if the user does not exist", async () => {
      const user = await repository.findById(
        "00000000-0000-0000-0000-000000000000",
      );

      expect(user).toBeNull();
    });
  });

  describe("findByUsername", () => {
    test("should return a user by username", async () => {
      const newUser = await repository.create({
        name: "John Doe",
        username: "johndoe",
        password: "password",
      });

      const user = await repository.findByUsername("johndoe");

      expect(user).toEqual({
        id: newUser.id,
        name: "John Doe",
        username: "johndoe",
        password: "password",
      });
    });

    test("should return null if the user does not exist", async () => {
      const user = await repository.findByUsername("non-existent-username");

      expect(user).toBeNull();
    });
  });
});
