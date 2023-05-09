import {useFormContext, SubmitHandler, FieldValues} from 'react-hook-form';
import {ReactNode} from 'react';
import clsx from 'clsx';

export type FormLayoutProps<T extends object> = {
    onSubmit: SubmitHandler<T>;
    children?: ReactNode;
    className?: string;
};

export const FormLayout = <T extends object>({
    className,
    children,
    onSubmit
}: FormLayoutProps<T>) => {
    const {handleSubmit} = useFormContext();

    return (
        <form
            className={clsx('w-full', className)}
            onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
        >
            {children}
        </form>
    );
};
