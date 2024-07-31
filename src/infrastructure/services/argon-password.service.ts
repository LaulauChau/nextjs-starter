import { hash, verify } from "@node-rs/argon2";

import type { PasswordService } from "~/core/interfaces/password-service.interface";

export class ArgonPasswordService implements PasswordService {
  private readonly config = {
    memoryCost: 19456,
    outputLen: 32,
    parallelism: 1,
    timeCost: 2,
  } as const;

  async hash(plainPassword: string): Promise<string> {
    return hash(plainPassword, this.config);
  }

  async verify(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return verify(hashedPassword, plainPassword, this.config);
  }
}
