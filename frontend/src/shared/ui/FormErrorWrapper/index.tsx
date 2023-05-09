import clsx from 'clsx';
import {ReactNode} from 'react';

export type FormErrorWrapperProps = {
    label?: string;
    error?: string | boolean;
    children?: ReactNode;
    className?: string;
    hideLabel?: boolean;
    hideErrorLabel?: boolean;
    required?: boolean;
};

export type FormErrorWrapperParentProps = Omit<
    FormErrorWrapperProps,
    'className' | 'error'
>;

export const FormErrorWrapper = ({
    label,
    error,
    children,
    className,
    hideLabel,
    hideErrorLabel,
    required
}: FormErrorWrapperProps) => (
    <label className={clsx('relative w-full', className)}>
        {!hideLabel && label && (
            <div className="block text-sm text-gray-text mb-2">
                {label}
                {required && <span className="text-primary"> *</span>}
            </div>
        )}
        {children}
        {!hideErrorLabel && error && (
            <span className="block mt-2 text-error font-light text-sm">
                {error}
            </span>
        )}
    </label>
);
