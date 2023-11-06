import {observer} from 'mobx-react-lite';
import Link from 'next/link';
import {useContext} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

import {authStore} from '@/src/entities/auth/model';
import {ButtonCta} from '@/src/shared/ui/Button';
import {FormGroup} from '@/src/shared/ui/FormGroup';
import {FormInput} from '@/src/shared/ui/FormInput';
import {FormLayout} from '@/src/shared/ui/FormLayout';
import {ForgotPasswordFormSchema} from '@/src/entities/auth/forms/ForgotPasswordForm/schema';
import {AuthFormMessage} from '@/src/entities/auth';

import CheckSvg from '@/public/icons/check.svg';

export type ForgotPasswordFormData = z.infer<typeof ForgotPasswordFormSchema>;

export const ForgotPasswordForm = observer(() => {
    const {forgotPassword, isEmailSent, isLoading} = useContext(authStore);
    const methods = useForm<ForgotPasswordFormData>({
        mode: 'onSubmit',
        resolver: zodResolver(ForgotPasswordFormSchema)
    });

    const onSubmitForm = async (data: ForgotPasswordFormData) => {
        await forgotPassword(data);
    };

    return (
        <FormProvider {...methods}>
            <FormLayout onSubmit={onSubmitForm}>
                {!isEmailSent ? (
                    <>
                        <FormGroup variant="lg">
                            <FormInput
                                placeholder="Email"
                                type="email"
                                name="email"
                            />
                        </FormGroup>
                        <FormGroup variant="sm">
                            <ButtonCta
                                type="submit"
                                className="h-12 w-full rounded-xl"
                                isLoading={isLoading}
                            >
                                Send reset instructions
                            </ButtonCta>
                        </FormGroup>
                    </>
                ) : (
                    <FormGroup variant="lg">
                        <AuthFormMessage
                            Icon={CheckSvg}
                            message="We've sent you an email which you can use to reset your password. Check your spam folder if you haven't received it after a few minutes."
                        />
                    </FormGroup>
                )}
                <FormGroup className="text-center">
                    <Link
                        href="/sign-in"
                        className="text-sm opacity-50 hover:opacity-80 transition-opacity duration-250"
                    >
                        Go back to Sign in
                    </Link>
                </FormGroup>
            </FormLayout>
        </FormProvider>
    );
});
