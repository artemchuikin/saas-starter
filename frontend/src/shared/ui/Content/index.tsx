import clsx from 'clsx';

type ContentProps = {
    children: React.ReactNode;
    className?: string;
};

export const Content = ({children, className}: ContentProps) => {
    return <div className={clsx('py-5', className)}>{children}</div>;
};
