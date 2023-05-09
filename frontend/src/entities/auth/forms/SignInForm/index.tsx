import {observer} from 'mobx-react-lite';
import Link from 'next/link';
import {useContext, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useGoogleLogin} from '@react-oauth/google';

import {authStore} from '@/src/entities/auth/model';
import {SignInFormSchema} from '@/src/entities/auth/forms/SignInForm/schema';

import {ButtonAuth, ButtonCta} from '@/src/shared/ui/Button';
import {FormGroup} from '@/src/shared/ui/FormGroup';
import {FormInput} from '@/src/shared/ui/FormInput';
import {FormLayout} from '@/src/shared/ui/FormLayout';

import GoogleSvg from '@/public/icons/google.svg';

export type SignInFormData = z.infer<typeof SignInFormSchema>;

export const SignInForm = observer(() => {
    const {signIn, googleSignIn, isLoading} = useContext(authStore);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const methods = useForm<SignInFormData>({
        mode: 'onSubmit',
        resolver: zodResolver(SignInFormSchema)
    });

    const togglePasswordVisibility = () =>
        setPasswordVisible((current) => !current);

    const googleLogin = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            googleSignIn({
                token: tokenResponse.access_token
            });
        }
    });

    const onGoogleAuth = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        googleLogin();
    };

    const onSubmitForm = async (data: SignInFormData) => await signIn(data);

    return (
        <FormProvider {...methods}>
            <FormLayout onSubmit={onSubmitForm}>
                <FormGroup variant="lg">
                    <ButtonAuth
                        Icon={GoogleSvg}
                        label="Google"
                        className="w-full"
                        onClick={onGoogleAuth}
                    />
                </FormGroup>
                <FormGroup variant="lg">
                    <div className="flex items-center justify-center w-fill h-px bg-white/10">
                        <div className="bg-fill px-2 text-sm text-white/50">
                            OR
                        </div>
                    </div>
                </FormGroup>
                <FormGroup>
                    <FormInput placeholder="Email" type="email" name="email" />
                </FormGroup>
                <FormGroup>
                    <FormInput
                        placeholder="Password (8+ characters please)"
                        type={passwordVisible ? 'text' : 'password'}
                        name="password"
                        togglePasswordVisibility={togglePasswordVisibility}
                    />
                </FormGroup>
                <FormGroup variant="lg">
                    <Link href="/reset-password" className="text-sm">
                        Forgot password?
                    </Link>
                </FormGroup>
                <FormGroup variant="sm">
                    <ButtonCta
                        type="submit"
                        className="h-12 w-full rounded-xl"
                        isLoading={isLoading}
                    >
                        Sign in
                    </ButtonCta>
                </FormGroup>
                <FormGroup>
                    <p className="text-sm text-white/50 text-center">
                        Don’t have an account?{' '}
                        <Link
                            href="/sign-up"
                            className="text-primary hover:opacity-80 transition-opacity duration-250"
                        >
                            Sign up
                        </Link>
                    </p>
                </FormGroup>
            </FormLayout>
        </FormProvider>
    );
});
