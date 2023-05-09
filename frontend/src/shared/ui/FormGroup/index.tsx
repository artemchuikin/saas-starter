import {ReactNode} from 'react';
import clsx from 'clsx';

export type FormGroupProps = {
    variant?: 'sm' | 'lg' | 'default';
    children: ReactNode;
    className?: string;
};

export const FormGroup = ({
    variant = 'default',
    children,
    className
}: FormGroupProps) => {
    return (
        <div
            className={clsx(
                `relative ${
                    variant === 'lg'
                        ? 'mb-7'
                        : variant === 'sm'
                        ? 'mb-3.5'
                        : 'mb-4'
                }`,
                className
            )}
        >
            {children}
        </div>
    );
};
