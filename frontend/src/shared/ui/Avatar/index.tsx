import Image from 'next/image';
import clsx from 'clsx';

type AvatarProps = {
    src: string;
    className?: string;
};

export const Avatar = ({src, className}: AvatarProps) => {
    return (
        <div
            className={clsx(
                'relative rounded-full overflow-hidden w-12 h-12',
                className
            )}
        >
            <Image src={src} fill={true} sizes="50vw" alt="Avatar" />
        </div>
    );
};
