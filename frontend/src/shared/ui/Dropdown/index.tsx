import clsx from 'clsx';
import {forwardRef} from 'react';

export type DropdownItem = {
    link?: string;
    action?: () => void;
    title: string;
};

type DropdownProps = {
    isOpen: boolean;
    items: DropdownItem[]
    className?: string;
};

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(({isOpen, items, className}, ref) => {
    if(!isOpen) return null;

    return (
        <div ref={ref} className={clsx(
            'absolute mt-2 right-0 z-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700',
            className
        )}>
            <ul className='py-2 text-sm text-gray-700 dark:text-gray-200'
                aria-labelledby='dropdownDefaultButton'>
                {
                    items.map((item: DropdownItem, index) => (
                        <li className="cursor-pointer" key={index}>
                            {
                                item.link ? (
                                    <a href={item.link}
                                       className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>{item.title}</a>
                                ) : (
                                    <span onClick={item.action}
                                       className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>{item.title}</span>
                                )
                            }
                        </li>
                    ))
                }
            </ul>
        </div>
    )
});
