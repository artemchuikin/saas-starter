import {z} from 'zod';
import {validPassword} from '@/src/shared/lib/regex';

export const SignUpFormSchema = z.object({
    email: z
        .string({
            required_error: 'Email is required'
        })
        .email({message: 'Invalid email address'}),
    password: z
        .string({
            required_error: 'Password is required'
        })
        .regex(new RegExp(validPassword), 'Password is too weak')
        .min(8, 'Minimum length is 8 characters')
        .max(14, 'Maximum length is 14 characters')
});
