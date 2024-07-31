import { z } from "zod";

import { loginSchema } from "./login.schema";

export const registerSchema = loginSchema
  .extend({
    name: z
      .string()
      .trim()
      .min(1, { message: "Name is required" })
      .refine(
        (value) => /^[a-zA-ZÀ-ÿ\s-]{3,}$/g.test(value),
        "Name must contain only letters, spaces, and hyphens",
      ),
    confirmPassword: z
      .string()
      .min(12, { message: "Password must be at least 12 characters long" })
      .refine(
        (value) =>
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()]).{12,255}$/g.test(
            value,
          ),
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      ),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
