import {css} from '@emotion/css';
import clsx from 'clsx';

const spanStyling = (isMenuOpen: boolean | undefined) => css`
    position: relative;
    display: block;
    width: 24px;
    height: 2px;
    margin: 4px 0;
    top: 0;

    background: currentColor;
    transition: ${isMenuOpen
        ? 'top ease-out 0.12s, transform ease-out 0.12s 0.12s'
        : 'top ease-out 0.12s 0.12s, transform ease-out 0.12s 0s'};

    &:first-of-type {
        margin: 0 0 4px 0;
        top: ${isMenuOpen ? '6px' : '0'};
        transform: ${isMenuOpen ? 'rotate(45deg)' : 'rotate(0)'};
    }

    &:nth-of-type(2) {
        transition: opacity 0s 0.12s;
        opacity: ${isMenuOpen ? '0' : '1'};
    }

    &:last-of-type {
        margin: 4px 0 0 0;
        top: ${isMenuOpen ? '-6px' : '0'};
        transform: ${isMenuOpen ? 'rotate(-45deg)' : 'rotate(0)'};
    }
`;

export type ButtonMenuProps = {
    onClick?: React.HTMLProps<HTMLButtonElement>['onClick'];
    className?: string;
    isMenuOpen?: boolean;
    ariaLabel?: string;
};

export const ButtonMenu = ({
    className,
    onClick,
    isMenuOpen,
    ariaLabel
}: ButtonMenuProps) => {
    return (
        <button
            onClick={onClick}
            className={clsx(
                'w-6 before:content-none before:absolute before:-inset-2.5',
                className
            )}
            aria-label={ariaLabel}
        >
            <span className={spanStyling(isMenuOpen)} />
            <span className={spanStyling(isMenuOpen)} />
            <span className={spanStyling(isMenuOpen)} />
        </button>
    );
};
