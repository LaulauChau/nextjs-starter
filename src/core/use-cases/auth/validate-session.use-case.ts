import type { Session, User } from "lucia";

import type { AuthService } from "~/core/interfaces/auth-service.interface";

export class ValidateSessionUseCase {
  constructor(private authService: AuthService) {}

  async execute(
    sessionId: string | null,
  ): Promise<{ session: Session | null; user: User | null }> {
    return this.authService.validateSession(sessionId);
  }
}
