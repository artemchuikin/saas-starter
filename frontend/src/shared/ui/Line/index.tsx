import clsx from 'clsx';

type LineProps = {
    left?: string;
    className?: string;
};

export const Line = ({left, className}: LineProps) => {
    return (
        <div
            style={{left}}
            className={clsx(
                'fixed h-screen w-px dark:bg-white bg-fill dark:opacity-5 opacity-10',
                className
            )}
        ></div>
    );
};
