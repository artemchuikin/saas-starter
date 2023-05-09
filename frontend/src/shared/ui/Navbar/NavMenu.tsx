import clsx from 'clsx';

type NavMenuProps = {
    children: React.ReactNode;
    isMenuOpen?: boolean;
};

export const NavMenu = ({children, isMenuOpen}: NavMenuProps) => {
    return (
        <div
            className={clsx(
                'tablet:invisible tablet:absolute tablet:top-2/4 tablet:opacity-0 tablet:pointer-events-none tablet:-translate-y-2/4 tablet:transition-opacity tablet:duration-350 ml-8 sm:ml-14 lg:-mx-4 lg:ml-20 lg:inline-block lg:align-middle',
                {
                    'tablet:opacity-100 tablet:pointer-events-auto tablet:!visible':
                        isMenuOpen
                }
            )}
        >
            {children}
        </div>
    );
};
