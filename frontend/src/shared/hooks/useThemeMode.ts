import {useLocalStorage} from '@/src/shared/hooks/useLocalStorage';
import {useEffect} from 'react';

export type ThemeModeProps = 'dark' | 'light';

export const useThemeMode = () => {
    const [themeMode, setThemeMode] = useLocalStorage<ThemeModeProps>(
        'theme',
        'dark'
    );

    useEffect(() => {
        const className = 'dark';
        const documentClasses = window.document.body.classList;

        themeMode === className
            ? documentClasses.add(className)
            : documentClasses.remove(className);
    }, [themeMode, setThemeMode]);

    return [themeMode, setThemeMode] as const;
};
