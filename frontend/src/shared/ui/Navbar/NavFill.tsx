import clsx from 'clsx';

type NavFillProps = {
    isMenuOpen?: boolean;
};

export const NavFill = ({isMenuOpen}: NavFillProps) => {
    return (
        <div
            className={clsx(
                'fixed z-10 inset-0 opacity-0 max-h-0 bg-fill [transition:opacity_0.35s,max-height_0s_0.3s] lg:hidden',
                {
                    'max-h-full [transition:opacity_0.35s,max-height_0s_0s] opacity-100':
                        isMenuOpen
                }
            )}
        />
    );
};
