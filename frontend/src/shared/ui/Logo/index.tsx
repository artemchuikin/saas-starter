import Link from 'next/link';
import clsx from 'clsx';

type LogoProps = {
    className?: string;
};

export const Logo = ({className}: LogoProps) => {
    return (
        <Link
            href="/"
            className={clsx(
                'inline-block font-medium align-middle text-2xl lg:text-3xl transition-opacity hover:opacity-80',
                className
            )}
        >
            SAASkit
        </Link>
    );
};
