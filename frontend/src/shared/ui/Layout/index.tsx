import {ReactNode, useContext, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {NextFont} from 'next/dist/compiled/@next/font';

import {Navbar} from '../Navbar';
// import {Footer} from '../Footer';
import {Container} from '../Container';
import {Line} from '../Line';
import {Switcher} from '../Switcher';
import {Notification} from '../Notification';
import {useThemeMode} from '@/src/shared/hooks/useThemeMode';
import {menuItems} from '@/src/shared/lib/menu-items';

import 'react-toastify/dist/ReactToastify.css';

type LayoutProps = {
    children: ReactNode;
    fonts: NextFont;
};

const Layout = ({children, fonts}: LayoutProps) => {
    const {asPath} = useRouter();
    const isAuthPage =
        asPath === '/sign-in/' ||
        asPath === '/sign-up/' ||
        asPath.includes('/reset-password/');
    const [themeMode, setThemeMode] = useThemeMode();
    const [checked, setChecked] = useState(false);

    const handleThemeMode = () => {
        setThemeMode(themeMode === 'dark' ? 'light' : 'dark');
        setChecked(!checked);
    };

    useEffect(() => {
        setChecked(themeMode !== 'dark');
    }, [themeMode]);

    return (
        <div className={fonts.className}>
            <Notification themeMode={themeMode} />
            {!isAuthPage && (
                <>
                    <Navbar items={menuItems} />
                    <Container className="fixed bottom-8 left-0 right-0 sm:bottom-9 xl:bottom-10 pointer-events-none text-right">
                        <Switcher
                            onChange={handleThemeMode}
                            checked={checked}
                            ariaLabel="Switch between Dark and Light mode"
                        />
                    </Container>
                    {/*<Line left="16.6666%" />*/}
                    {/*<Line left="33%" className="phone:hidden" />*/}
                    {/*<Line left="50%" />*/}
                    {/*<Line left="66.6666%" className="phone:hidden" />*/}
                    {/*<Line left="83.2%" />*/}
                </>
            )}
            <main>{children}</main>
            {/*<Footer />*/}
        </div>
    );
};

export default Layout;
