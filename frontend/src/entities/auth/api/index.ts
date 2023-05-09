import {ForgotPasswordFormData} from '@/src/entities/auth/forms/ForgotPasswordForm';
import {ResetPasswordFormData} from '@/src/entities/auth/forms/ResetPasswordForm';
import {AxiosResponse} from 'axios';
import {SignInFormData} from '@/src/entities/auth/forms/SignInForm';
import {SignUpFormData} from '@/src/entities/auth/forms/SignUpForm';
import {GoogleFormData, SignResult} from '@/src/entities/auth/model/types';
import {apiInstance, apiPrivateInstance} from '@/src/shared/api/base';

export const signUp = async (
    formData: SignUpFormData
): Promise<AxiosResponse<SignResult>> => {
    return await apiInstance.post<SignResult>(`/api/v1/auth/signup`, formData, {
        withCredentials: true
    });
};

export const signIn = async (
    formData: SignInFormData
): Promise<AxiosResponse<SignResult>> => {
    return await apiInstance.post<SignResult>(`/api/v1/auth/signin`, formData, {
        withCredentials: true
    });
};

export const googleSignIn = async (
    tokenResponse: GoogleFormData
): Promise<AxiosResponse<SignResult>> => {
    return await apiInstance.post<SignResult>(
        `/api/v1/auth/google`,
        tokenResponse,
        {
            withCredentials: true
        }
    );
};

export const signOut = async (): Promise<void> => {
    await apiPrivateInstance.post<AxiosResponse<SignResult>>(
        `/api/v1/auth/signout`
    );
};

export const refreshTokens = async (): Promise<AxiosResponse<SignResult>> => {
    return await apiInstance.get<SignResult>(`/api/v1/auth/refresh-tokens`, {
        withCredentials: true
    });
};

export const forgotPassword = async (
    formData: ForgotPasswordFormData
): Promise<void> => {
    await apiInstance.post<AxiosResponse<ForgotPasswordFormData>>(
        `/api/v1/auth/forgot-password`,
        formData
    );
};

export const resetPassword = async (
    resetToken: string,
    formData: ResetPasswordFormData
): Promise<AxiosResponse<SignResult>> => {
    return await apiInstance.patch<SignResult>(
        `/api/v1/auth/reset-password/${resetToken}`,
        formData,
        {
            withCredentials: true
        }
    );
};
