import { z } from 'zod';
import { levels, roles } from './user.constant';
import { Levels } from './user.interface';

const numberEnum = z
  .number()
  .refine(value => levels.includes(value as Levels), {
    message: 'Invalid level value',
  })
  .transform(value => Number(value));

const CreateUserZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email(),
    password: z.string().optional(),
    role: z.enum([...roles] as [string, ...string[]], {
      required_error: 'Role is required',
    }),
    level: numberEnum,
  }),
});

const UpdateUserZodSchema = z
  .object({
    body: z.object({
      name: z
        .string({
          required_error: 'Name is required',
        })
        .optional(),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email()
        .optional(),
      password: z.string().optional(),
      role: z
        .enum([...roles] as [string, ...string[]], {
          required_error: 'Role is required',
        })
        .optional(),
      level: numberEnum.optional(),
    }),
  })
  .refine(
    value =>
      (value.body.role && value.body.level) ||
      (!value.body.role && !value.body.level),
    {
      message: 'Role and level must be provided together or not at all',
    }
  );

export const UserValidation = {
  CreateUserZodSchema,
  UpdateUserZodSchema,
};
