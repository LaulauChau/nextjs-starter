import { LoginUseCase } from "~/core/use-cases/auth/login.use-case";
import { RegisterUseCase } from "~/core/use-cases/auth/register.use-case";
import { ValidateSessionUseCase } from "~/core/use-cases/auth/validate-session.use-case";
import { DrizzleUsersRepository } from "~/infrastructure/persistence/repositories/drizzle-users.repository";
import { ArgonPasswordService } from "~/infrastructure/services/argon-password.service";
import { LuciaAuthService } from "~/infrastructure/services/auth/lucia-auth.service";

export const getAuthServices = () => ({
  createBlankSessionCookie: new LuciaAuthService().createBlankSessionCookie,

  createSessionCookie: new LuciaAuthService().createSessionCookie,

  getSessionCookieName: new LuciaAuthService().getSessionCookieName,
});

export const getAuthUseCases = () => ({
  loginUseCase: new LoginUseCase(
    new LuciaAuthService(),
    new ArgonPasswordService(),
    new DrizzleUsersRepository(),
  ),

  registerUseCase: new RegisterUseCase(
    new LuciaAuthService(),
    new ArgonPasswordService(),
    new DrizzleUsersRepository(),
  ),

  validateSessionUseCase: new ValidateSessionUseCase(new LuciaAuthService()),
});
