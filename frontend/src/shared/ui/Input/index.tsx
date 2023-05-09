import clsx from 'clsx';
import {ChangeEvent, forwardRef} from 'react';
import {getValue} from './lib/getValue';

export type InputProps = {
    className?: string;
    type: 'text' | 'email' | 'password';
    name?: string;
    value?: string | number | null;
    placeholder?: string;
    autoFocus?: boolean;
    autoComplete?: string;
    isDisabled?: boolean;
    hidden?: boolean;
    required?: boolean;
    isError?: boolean;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onFocus?: VoidFunction;
    onBlur?: VoidFunction;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            type,
            name,
            placeholder,
            value,
            autoFocus,
            autoComplete,
            isDisabled,
            hidden,
            required,
            isError = false,
            onChange,
            onFocus,
            onBlur
        },
        ref
    ) => {
        const _onChange: InputProps['onChange'] = (e) => {
            onChange?.(e);
        };

        const inputStyle = clsx(
            'w-full text-sm text-white block h-12 px-5 bg-transparent border border-white/10 rounded-xl placeholder:text-white/50 hover:border-white/25 focus:border-white/25 transition-border-width duration-250',
            className
        );

        return (
            <input
                className={inputStyle}
                type={type}
                name={name}
                placeholder={placeholder}
                value={getValue(value)}
                autoFocus={autoFocus}
                autoComplete={autoComplete}
                disabled={isDisabled}
                hidden={hidden}
                required={required}
                onChange={_onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                ref={ref}
            />
        );
    }
);
