import EyeSvg from '@/public/icons/eye.svg';
import {useController} from 'react-hook-form';
import {Input, InputProps} from '@/src/shared/ui/Input';
import {
    FormErrorWrapper,
    FormErrorWrapperParentProps
} from '@/src/shared/ui/FormErrorWrapper';

type FormInputProps = Pick<
    InputProps,
    | 'className'
    | 'type'
    | 'placeholder'
    | 'autoFocus'
    | 'autoComplete'
    | 'isDisabled'
    | 'hidden'
    | 'required'
    | 'onFocus'
    | 'onBlur'
> &
    FormErrorWrapperParentProps & {
        name: string;
        defaultValue?: string | number;
        shouldUnregister?: boolean;
        togglePasswordVisibility?: () => void;
    };

export const FormInput = ({
    type,
    className,
    name,
    placeholder,
    autoFocus,
    autoComplete = 'off',
    isDisabled,
    hidden,
    required = true,
    defaultValue,
    shouldUnregister,
    togglePasswordVisibility,
    onFocus,
    onBlur,
    ...errorProps
}: FormInputProps) => {
    const {
        field,
        fieldState: {error}
    } = useController({
        name,
        defaultValue,
        shouldUnregister
    });

    return (
        <FormErrorWrapper
            className={className}
            error={error?.message}
            required={required}
            {...errorProps}
        >
            <Input
                type={type}
                placeholder={placeholder}
                autoFocus={autoFocus}
                autoComplete={autoComplete}
                isDisabled={isDisabled}
                hidden={hidden}
                {...field}
                onFocus={onFocus}
                onBlur={() => {
                    field.onBlur();
                    onBlur?.();
                }}
            />
            {name === 'password' && (
                <span
                    className="flex items-center absolute top-0 right-5 m-auto h-12 cursor-pointer opacity-50 hover:opacity-80 transition-opacity duration-150"
                    onClick={togglePasswordVisibility}
                >
                    <EyeSvg className="w-5 fill-current" />
                </span>
            )}
        </FormErrorWrapper>
    );
};
