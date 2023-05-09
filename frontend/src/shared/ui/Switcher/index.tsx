import clsx from 'clsx';
import SunIcon from '@/public/icons/sun.svg';
import MoonIcon from '@/public/icons/moon.svg';

export type SwitcherProps = {
    onChange: React.HTMLProps<HTMLInputElement>['onChange'];
    checked: boolean;
    ariaLabel?: string;
    isMenuOpen?: boolean;
};

export const Switcher = ({
    onChange,
    checked,
    ariaLabel,
    isMenuOpen
}: SwitcherProps) => {
    return (
        <label className="relative inline-flex items-center cursor-pointer pointer-events-auto">
            <input
                type="checkbox"
                className="sr-only peer"
                checked={checked}
                onChange={onChange}
                aria-label={ariaLabel}
            />
            <span
                className={clsx(
                    'w-9 h-9 lg:w-11 lg:h-11 rounded-full bg-gray-200 dark:bg-primary flex justify-center items-center text-lg lg:text-xl text-fill dark:text-white hover:opacity-90 transition-opacity [transition:transform_0.5s_cubic-bezier(0.34,_1.56,_0.64,_1)] active:scale-110',
                    {
                        'dark:bg-gray-100': isMenuOpen
                    }
                )}
            >
                {checked ? <MoonIcon /> : <SunIcon />}
            </span>
        </label>
    );
};
