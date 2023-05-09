import {z} from 'zod';

export const ForgotPasswordFormSchema = z.object({
    email: z
        .string({
            required_error: 'Email is required'
        })
        .email({message: 'Invalid email address'})
});
