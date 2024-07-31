import type { PasswordService } from "~/core/interfaces/password-service.interface";
import { ArgonPasswordService } from "~/infrastructure/services/argon-password.service";

describe("ArgonPasswordService", () => {
  let service: PasswordService;

  beforeEach(() => {
    service = new ArgonPasswordService();
  });

  describe("hash", () => {
    test("should hash a plain password", async () => {
      const plainPassword = "password";
      const hashedPassword = await service.hash(plainPassword);

      expect(hashedPassword).not.toBe(plainPassword);
    });
  });

  describe("verify", () => {
    test("should return true if the password is correct", async () => {
      const plainPassword = "password";
      const hashedPassword = await service.hash(plainPassword);

      const isCorrect = await service.verify(plainPassword, hashedPassword);

      expect(isCorrect).toBe(true);
    });

    test("should return false if the password is incorrect", async () => {
      const plainPassword = "password";
      const hashedPassword = await service.hash(plainPassword);

      const isCorrect = await service.verify("wrong-password", hashedPassword);

      expect(isCorrect).toBe(false);
    });
  });
});
