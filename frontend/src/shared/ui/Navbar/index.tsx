import {authStore} from '@/src/entities/auth/model';
import {observer} from 'mobx-react-lite';
import {useState, useEffect, useContext, useRef} from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import {IMenuItems} from '@/src/shared/lib/menu-items';
import {ButtonCta} from '@/src/shared/ui/Button/ButtonCta';
import {useWindowSize} from '@/src/shared/hooks/useWindowSize';
import {NavFill} from '../Navbar/NavFill';
import {NavMenu} from '../Navbar/NavMenu';
import {NavItem} from '../Navbar/NavItem';
import {Container} from '../Container';
import {ButtonMenu} from '../Button';
import {Logo} from '../Logo';
import {Avatar} from '../Avatar';
import {Dropdown} from '../Dropdown';
import {useOutsideClick} from '@/src/shared/hooks/useOutsideClick';

interface INavbar {
    items: IMenuItems[];
}

export const Navbar = observer(({items}: INavbar) => {
    const {isAuth, isLoading, signOut} = useContext(authStore);
    const dropdwonRef = useRef<HTMLDivElement | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const {width} = useWindowSize();

    const toggleMenu = () => {
        setIsMenuOpen((current) => !current);
    };

    const closeMenu = () => setIsMenuOpen(false);

    const toggleDropdown = () => {
        setIsDropdownOpen((current) => !current);
    };

    const closeDropdown = () => setIsDropdownOpen(false);

    useEffect(() => {
        if (width! >= 1200 && isMenuOpen) closeMenu();
    }, [width, isMenuOpen]);

    useOutsideClick(dropdwonRef, closeDropdown, isDropdownOpen);

    return (
        <nav>
            <NavFill isMenuOpen={isMenuOpen} />
            <div
                className={clsx(
                    'absolute py-8 sm:py-9 xl:py-10 z-10 w-full text-fill dark:text-white',
                    {
                        'inset-y-0 text-white': isMenuOpen
                    }
                )}
            >
                <Container>
                    <div className='flex items-center justify-between'>
                        <div>
                            <Logo />
                            <NavMenu isMenuOpen={isMenuOpen}>
                                {items.map((item) => (
                                    <NavItem href={item.url} key={item.label}>
                                        <span>{item.label}</span>
                                    </NavItem>
                                ))}
                            </NavMenu>
                        </div>
                        <div>
                            {isLoading ? null : isAuth ? (
                                <div className='relative inline-block align-middle ml-2 tablet:hidden'>
                                    <div className='cursor-pointer inline-block' onClick={toggleDropdown}>
                                        <Avatar src='/img/1.jpg' />
                                    </div>
                                    <Dropdown
                                        isOpen={isDropdownOpen}
                                        items={[
                                            {
                                                link: '/',
                                                title: 'Settings'
                                            },
                                            {
                                                action: signOut,
                                                title: 'Sign out'
                                            }
                                        ]}
                                        ref={dropdwonRef}
                                    />
                                </div>
                            ) : (
                                <>
                                    <div className='relative inline-block align-middle ml-2 tablet:hidden'>
                                        <Link href='/sign-in'>
                                            <ButtonCta
                                                variant='transparent'
                                                isMenuOpen={isMenuOpen}
                                            >
                                                Sign in
                                            </ButtonCta>
                                        </Link>
                                    </div>
                                    <div className='relative inline-block align-middle ml-2 tablet:hidden'>
                                        <Link href='/sign-up'>
                                            <ButtonCta>Get started</ButtonCta>
                                        </Link>
                                    </div>
                                </>
                            )}
                            <div className='relative inline-block align-middle lg:hidden'>
                                <ButtonMenu
                                    onClick={toggleMenu}
                                    isMenuOpen={isMenuOpen}
                                    ariaLabel='Toggle menu'
                                />
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </nav>
    );
});
