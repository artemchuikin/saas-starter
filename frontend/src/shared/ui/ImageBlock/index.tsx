import Image from 'next/image';

interface ImageBlock {
    src: string;
    width?: number;
    height?: number;
    sizes?: string;
    priority?: boolean;
    fill?: boolean;
    quality?: number;
    className?: string;
    alt?: string;
}

export const ImageBlock = ({
    src,
    width,
    height,
    sizes = '100vw',
    priority,
    fill,
    quality = 75,
    alt = 'Image',
    className
}: ImageBlock) => (
    <Image
        src={src}
        width={width}
        height={height}
        fill={fill}
        sizes={sizes}
        priority={priority}
        quality={quality}
        alt={alt}
        className={className}
    />
);
