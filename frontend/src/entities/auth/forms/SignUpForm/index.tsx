import {useGoogleLogin} from '@react-oauth/google';
import {observer} from 'mobx-react-lite';
import Link from 'next/link';
import {useContext, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

import {ButtonAuth, ButtonCta} from '@/src/shared/ui/Button';
import {FormGroup} from '@/src/shared/ui/FormGroup';
import {FormInput} from '@/src/shared/ui/FormInput';
import {FormLayout} from '@/src/shared/ui/FormLayout';
import {SignUpFormSchema} from '@/src/entities/auth/forms/SignUpForm/schema';
import {authStore} from '@/src/entities/auth/model';

import GoogleSvg from '@/public/icons/google.svg';

export type SignUpFormData = z.infer<typeof SignUpFormSchema>;

export const SignUpForm = observer(() => {
    const {signUp, googleSignIn, isLoading} = useContext(authStore);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const methods = useForm<SignUpFormData>({
        mode: 'onSubmit',
        resolver: zodResolver(SignUpFormSchema)
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

    const onSubmitForm = async (data: SignUpFormData) => await signUp(data);

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
                <FormGroup variant="lg">
                    <FormInput
                        placeholder="Password (8+ characters please)"
                        type={passwordVisible ? 'text' : 'password'}
                        name="password"
                        togglePasswordVisibility={togglePasswordVisibility}
                    />
                </FormGroup>
                <FormGroup variant="sm">
                    <ButtonCta
                        type="submit"
                        className="h-12 w-full rounded-xl"
                        isLoading={isLoading}
                    >
                        Create account
                    </ButtonCta>
                </FormGroup>
                <FormGroup>
                    <p className="text-sm text-white/50 text-center">
                        Already have an account?{' '}
                        <Link
                            href="/sign-in"
                            className="text-primary hover:opacity-80 transition-opacity duration-250"
                        >
                            Sign in
                        </Link>
                    </p>
                </FormGroup>
            </FormLayout>
        </FormProvider>
    );
});
