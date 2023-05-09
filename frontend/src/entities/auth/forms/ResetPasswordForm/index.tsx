import {authStore} from '@/src/entities/auth/model';
import {observer} from 'mobx-react-lite';
import {useRouter} from 'next/router';
import {useContext, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

import {ButtonCta} from '@/src/shared/ui/Button';
import {FormGroup} from '@/src/shared/ui/FormGroup';
import {FormInput} from '@/src/shared/ui/FormInput';
import {FormLayout} from '@/src/shared/ui/FormLayout';
import {ResetPasswordFormSchema} from '@/src/entities/auth/forms/ResetPasswordForm/schema';

export type ResetPasswordFormData = z.infer<typeof ResetPasswordFormSchema>;

export const ResetPasswordForm = observer(() => {
    const router = useRouter();
    const {resetPassword, isLoading} = useContext(authStore);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const methods = useForm<ResetPasswordFormData>({
        mode: 'onSubmit',
        resolver: zodResolver(ResetPasswordFormSchema)
    });

    const togglePasswordVisibility = () =>
        setPasswordVisible((current) => !current);

    const onSubmitForm = async (data: ResetPasswordFormData) => {
        const token = router.query.token as string;
        await resetPassword(token, data);
    };

    return (
        <FormProvider {...methods}>
            <FormLayout onSubmit={onSubmitForm}>
                <FormGroup>
                    <FormInput
                        placeholder="Password (8+ characters please)"
                        type={passwordVisible ? 'text' : 'password'}
                        name="password"
                        togglePasswordVisibility={togglePasswordVisibility}
                    />
                </FormGroup>
                <FormGroup variant="lg">
                    <FormInput
                        placeholder="Confirm password"
                        type="password"
                        name="confirmPassword"
                    />
                </FormGroup>
                <FormGroup variant="sm">
                    <ButtonCta
                        type="submit"
                        className="h-12 w-full rounded-xl"
                        isLoading={isLoading}
                    >
                        Reset password
                    </ButtonCta>
                </FormGroup>
            </FormLayout>
        </FormProvider>
    );
});
