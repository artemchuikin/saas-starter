import {useCallback, useEffect} from 'react';

export const useEscapeKey = (handleClose: () => void, isOpen: boolean) => {
    const handleEscKey = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                if (isOpen) handleClose();
            }
        },
        [handleClose, isOpen]
    );

    useEffect(() => {
        document.addEventListener('keyup', handleEscKey, false);

        return () => {
            document.removeEventListener('keyup', handleEscKey, false);
        };
    }, [handleEscKey]);
};
