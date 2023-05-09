export enum RootRoute {
    HOME = '/',
    SERVICES = '/services/',
    ABOUT = '/about/',
    CONTACT = '/contact/',
    BLOG = '/blog/'
}

export interface IMenuItems {
    label: string;
    url: RootRoute;
}

export const menuItems: IMenuItems[] = [
    {
        label: 'Home',
        url: RootRoute.HOME
    },
    // {
    //     label: 'Services',
    //     url: RootRoute.SERVICES
    // },
    {
        label: 'About',
        url: RootRoute.ABOUT
    }
    // {
    //     label: 'Contact',
    //     url: RootRoute.CONTACT
    // },
    // {
    //     label: 'Blog',
    //     url: RootRoute.BLOG
    // }
];
