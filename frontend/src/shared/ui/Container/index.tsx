import clsx from 'clsx';

type ContainerProps = {
    children: React.ReactNode;
    className?: string;
};

export const Container = ({children, className}: ContainerProps) => {
    return (
        <div
            className={clsx(
                'px-6 sm:px-10 lg:px-16 xl:px-20 mx-auto max-w-screen-xl w-full',
                className
            )}
        >
            {children}
        </div>
    );
};
