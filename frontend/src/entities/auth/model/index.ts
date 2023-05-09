import {ResetPasswordFormData} from '@/src/entities/auth/forms/ResetPasswordForm';
import {makeAutoObservable} from 'mobx';
import {createContext} from 'react';
import {throwErrorToast} from '@/src/shared/lib/toastify';
import {FailedResponse} from '@/src/shared/model';
import {
    signIn,
    signUp,
    signOut,
    refreshTokens,
    googleSignIn,
    forgotPassword,
    resetPassword
} from '../api';
import {SignInFormData} from '@/src/entities/auth/forms/SignInForm';
import {SignUpFormData} from '@/src/entities/auth/forms/SignUpForm';
import {ForgotPasswordFormData} from '@/src/entities/auth/forms/ForgotPasswordForm';
import {GoogleFormData} from '@/src/entities/auth/model/types';

class AuthStore {
    private _accessToken: string | null = null;
    private _isAuth: boolean = false;
    private _isLoading: boolean = true;
    private _isEmailSent: boolean = false;
    private _errorMessage: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    private setFailureError = (message: string) => {
        this._errorMessage = message;
    };

    private setEmailSent = (flag: boolean) => {
        this._isEmailSent = flag;
    };

    private setAuth = (flag: boolean) => {
        this._isAuth = flag;
        this._isAuth
            ? localStorage.setItem('persist', `${this._isAuth}`)
            : localStorage.removeItem('persist');
    };

    public get isPersist() {
        return typeof window !== 'undefined' && localStorage.getItem('persist');
    }

    public get isUnauthorised() {
        return !this._isAuth && !this.isPersist;
    }

    public get accessToken() {
        return this._accessToken;
    }

    public get isAuth() {
        return this._isAuth;
    }

    public get isLoading() {
        return this._isLoading;
    }

    public get isEmailSent() {
        return this._isEmailSent;
    }

    public setLoading = (flag: boolean) => {
        this._isLoading = flag;
    };

    public signUp = async (data: SignUpFormData) => {
        this.setLoading(true);

        try {
            const response = await signUp(data);
            this._accessToken = response.data.accessToken;
            this.setAuth(true);
        } catch (err) {
            const error = err as FailedResponse;
            throwErrorToast(error.response?.data.message!);
            this.setFailureError(error.response?.data.message!);
        } finally {
            this.setLoading(false);
        }
    };

    public signIn = async (data: SignInFormData) => {
        this.setLoading(true);

        try {
            const response = await signIn(data);
            this._accessToken = response.data.accessToken;
            this.setAuth(true);
        } catch (err) {
            const error = err as FailedResponse;
            throwErrorToast(error.response?.data.message!);
            this.setFailureError(error.response?.data.message!);
            this.setAuth(false);
        } finally {
            this.setLoading(false);
        }
    };

    public signOut = async () => {
        try {
            await signOut();
            this.setAuth(false);
            localStorage.removeItem('persist');
        } catch (err) {
            const error = err as FailedResponse;
            this.setFailureError(error.response?.data.message!);
        }
    };

    public googleSignIn = async (tokenResponse: GoogleFormData) => {
        try {
            const response = await googleSignIn(tokenResponse);
            this._accessToken = response.data.accessToken;
            this.setAuth(true);
        } catch (err) {
            const error = err as FailedResponse;
            this.setFailureError(error.response?.data.message!);
            this.setAuth(false);
        }
    };

    public checkAuth = async () => {
        try {
            const response = await refreshTokens();
            this._accessToken = response.data.accessToken;
            this.setAuth(true);
        } catch (err) {
            const error = err as FailedResponse;
            this.setFailureError(error.response?.data.message!);
            this.setAuth(false);
        } finally {
            this.setLoading(false);
        }
    };

    public forgotPassword = async (data: ForgotPasswordFormData) => {
        this.setLoading(true);

        try {
            await forgotPassword(data);
            this.setEmailSent(true);
        } catch (err) {
            const error = err as FailedResponse;
            throwErrorToast(error.response?.data.message!);
            this.setFailureError(error.response?.data.message!);
            this.setEmailSent(false);
        } finally {
            this.setLoading(false);
        }
    };

    public resetPassword = async (
        resetToken: string,
        data: ResetPasswordFormData
    ) => {
        this.setLoading(true);

        try {
            const response = await resetPassword(resetToken, data);
            this._accessToken = response.data.accessToken;
            this.setAuth(true);
        } catch (err) {
            const error = err as FailedResponse;
            throwErrorToast(error.response?.data.message!);
            this.setFailureError(error.response?.data.message!);
            this.setAuth(false);
        } finally {
            this.setLoading(false);
        }
    };
}

export const AuthStoreInstance = new AuthStore();

export const authStore = createContext(AuthStoreInstance);
