import { z } from "zod";

const VALIDATION_LIMITS = {
  NAME_MIN: 2,
  LAST_NAME_MIN: 1,
  USERNAME_MIN: 3,
  USERNAME_MAX: 30,
  PASSWORD_MIN: 8,
};

const ERROR_MESSAGES = {
  EMAIL: "Please enter a valid email address",
  PASSWORD_MIN: `Password must be at least ${VALIDATION_LIMITS.PASSWORD_MIN} characters`,
  PASSWORD_UPPER: "Password must contain at least one uppercase letter",
  PASSWORD_LOWER: "Password must contain at least one lowercase letter",
  PASSWORD_NUMBER: "Password must contain at least one number",
  PASSWORD_SPECIAL: "Password must contain at least one special character",
  PASSWORD_MATCH: "Passwords do not match",
  REQUIRED: "This field is required",
};

const REGEX = {
  UPPERCASE: /[A-Z]/,
  LOWERCASE: /[a-z]/,
  NUMBER: /[0-9]/,
  SPECIAL: /[^A-Za-z0-9]/,
};

const basePasswordSchema = z
  .string()
  .min(VALIDATION_LIMITS.PASSWORD_MIN, ERROR_MESSAGES.PASSWORD_MIN)
  .regex(REGEX.UPPERCASE, ERROR_MESSAGES.PASSWORD_UPPER)
  .regex(REGEX.LOWERCASE, ERROR_MESSAGES.PASSWORD_LOWER)
  .regex(REGEX.NUMBER, ERROR_MESSAGES.PASSWORD_NUMBER)
  .regex(REGEX.SPECIAL, ERROR_MESSAGES.PASSWORD_SPECIAL);

export const signupSchema = z
  .object({
    firstName: z
      .string()
      .min(VALIDATION_LIMITS.NAME_MIN, `First name must be at least ${VALIDATION_LIMITS.NAME_MIN} characters`)
      .trim(),
    lastName: z
      .string()
      .min(VALIDATION_LIMITS.LAST_NAME_MIN, `Last name must be at least ${VALIDATION_LIMITS.LAST_NAME_MIN} characters`)
      .trim(),
    username: z
      .string()
      .min(VALIDATION_LIMITS.USERNAME_MIN, `Username must be at least ${VALIDATION_LIMITS.USERNAME_MIN} characters`)
      .max(VALIDATION_LIMITS.USERNAME_MAX, `Username cannot exceed ${VALIDATION_LIMITS.USERNAME_MAX} characters`)
      .trim()
      .toLowerCase(),
    email: z
      .string()
      .email(ERROR_MESSAGES.EMAIL)
      .toLowerCase(),
    password: basePasswordSchema,
    confirmPassword: z.string().min(1, ERROR_MESSAGES.REQUIRED),
    profilePicture: z.any().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: ERROR_MESSAGES.PASSWORD_MATCH,
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, "Email or username is required")
    .trim()
    .toLowerCase(),
  password: z.string().min(1, ERROR_MESSAGES.REQUIRED),
});

export type SignupValues = z.infer<typeof signupSchema>;
export type LoginValues = z.infer<typeof loginSchema>;
