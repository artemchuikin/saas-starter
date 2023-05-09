import {ReactNode} from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import {useRouter} from 'next/router';
import {RootRoute} from '@/src/shared/lib/menu-items';

type NavItem = {
    href: RootRoute;
    children: ReactNode;
    className?: string;
};

export const NavItem = ({href, children, className}: NavItem) => {
    const {asPath} = useRouter();
    const isActive = asPath === href;

    return (
        <Link
            href={href}
            className={clsx(
                'relative font-medium block text-2xl m-0 my-4 transition-[color,opacity] hover:opacity-80 sm:text-3xl sm:my-6 lg:my-0 lg:text-base lg:inline-block lg:px-4',
                {
                    'text-primary': isActive
                },
                className
            )}
        >
            {children}
        </Link>
    );
};
