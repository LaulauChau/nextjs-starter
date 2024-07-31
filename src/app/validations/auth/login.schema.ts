import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().trim().min(1, { message: "Username is required" }),
  password: z
    .string()
    .min(12, { message: "Password must be at least 12 characters long" })
    .refine(
      (value) =>
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()]).{12,255}$/g.test(
          value,
        ),
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ),
});

export type LoginSchema = z.infer<typeof loginSchema>;
