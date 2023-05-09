import clsx from 'clsx';
import {ReactNode} from 'react';
import Spin from '@/public/icons/tail-spin.svg';

type ButtoCtaProps = {
    variant?: 'transparent' | 'default';
    className?: string;
    isMenuOpen?: boolean;
    children: ReactNode;
    type?: JSX.IntrinsicElements['button']['type'];
    onClick?: () => void;
    isLoading?: boolean;
};

export const ButtonCta = ({
    variant = 'default',
    className,
    isMenuOpen,
    children,
    type,
    onClick,
    isLoading
}: ButtoCtaProps) => {
    return (
        <div>
            <button
                className={clsx(
                    `flex items-center justify-center rounded-md py-3 px-6 text-fill font-medium ${
                        variant === 'transparent'
                            ? 'text-fill dark:text-white'
                            : 'bg-primary'
                    } hover:opacity-80 transition-opacity duration-250`,
                    {'text-white': isMenuOpen},
                    className
                )}
                type={type}
                onClick={onClick}
            >
                {isLoading ? (
                    <Spin className="w-7 h-7" />
                ) : (
                    <span>{children}</span>
                )}
            </button>
        </div>
    );
};
