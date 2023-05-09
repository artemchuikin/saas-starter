import clsx from 'clsx';
import {SvgIcon} from '@/src/shared/ui/SvgIcon';

type ButtonAuthProps = {
    Icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
    label: string;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const ButtonAuth = ({
    Icon,
    label,
    className,
    onClick
}: ButtonAuthProps) => {
    return (
        <button
            className={clsx(
                'px-8 h-12 text-sm flex items-center justify-center bg-transparent border border-solid border-white/10 rounded-xl font-medium hover:border-white/25 transition-border-width duration-250 leading-none',
                className
            )}
            onClick={onClick}
        >
            {Icon && (
                <span
                    className={clsx(
                        'w-[18px] h-[18px] inline-block align-middle mr-3',
                        `${label === 'Apple' && '-mt-0.5'}`
                    )}
                >
                    <SvgIcon className="w-full h-full" Icon={Icon} />
                </span>
            )}
            <span className="inline-block align-middle">
                Continue with {label}
            </span>
        </button>
    );
};
