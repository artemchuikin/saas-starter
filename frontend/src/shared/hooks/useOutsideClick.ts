import {RefObject, useEffect} from 'react';

type Handler = (event: MouseEvent) => void;

export const useOutsideClick = <T extends HTMLElement = HTMLElement>(
    ref: RefObject<T>,
    handler: Handler,
    isOpen: boolean
): void => {
    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const el = ref?.current;

            if (!el || el.contains(event.target as Node)) {
                return;
            }

            if (isOpen) handler(event);
        };

        document.addEventListener('click', handleClick, true);

        return () => {
            document.removeEventListener('click', handleClick, true);
        };
    }, [isOpen, handler, ref]);
};
