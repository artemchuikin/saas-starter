import {z} from 'zod';
import {validPassword} from '@/src/shared/lib/regex';

export const ResetPasswordFormSchema = z
    .object({
        password: z
            .string({
                required_error: 'Password is required'
            })
            .regex(new RegExp(validPassword), 'Password is too weak')
            .min(8, 'Minimum length is 8 characters')
            .max(14, 'Maximum length is 14 characters'),
        confirmPassword: z.string({
            required_error: 'Password is required'
        })
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword']
    });
