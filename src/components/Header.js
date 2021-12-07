import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { logout } from "../store/auth.store";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const userNavigation = [
    { name: 'Sign out' },
]

const navigation = [
    { name: 'Solutions', href: '#' },
    { name: 'Pricing', href: '#' },
    { name: 'Docs', href: '#' },
    { name: 'Company', href: '#' },
]

export default function Header() {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    return (
        <header className="bg-indigo-600">
            <nav className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
                <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
                    <div className="flex items-center">
                        <a href="#">
                            <span className="sr-only">Workflow</span>
                            <img
                                className="h-10 w-auto"
                                src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                                alt=""
                            />
                        </a>
                        <div className="hidden ml-10 space-x-8 lg:block">
                            {navigation.map((link) => (
                                <a key={link.name} href={link.href} className="text-base font-medium text-white hover:text-indigo-50">
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    {user
                        ? <Menu as="div" className="ml-3 relative">
                            <div>
                                <Menu.Button className="group w-full bg-indigo-600 rounded-md px-3.5 py-2 text-sm text-left font-medium text-gray-700 hover:bg-indigo-600 focus:outline-none">
                                    <span className="flex w-full justify-between items-center">
                                        <span className="flex min-w-0 items-center justify-between space-x-3">
                                            <img
                                                className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
                                                src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                                                alt=""
                                            />
                                            <span className="flex-1 flex flex-col min-w-0">
                                                <span className="text-white text-sm font-medium truncate">{user.userInfo.name}</span>
                                                <span className="text-gray-400 text-sm truncate">{user.userInfo.phone_number}</span>
                                            </span>
                                        </span>
                                    </span>
                                </Menu.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    {userNavigation.map((item) => (
                                        <Menu.Item key={item.name}>
                                            {({ active }) => (
                                                <a
                                                    className={classNames(
                                                        active ? 'bg-gray-100' : '',
                                                        'block px-4 py-2 text-sm text-gray-700'
                                                    )}
                                                    onClick={() => dispatch(logout())}
                                                >
                                                    {item.name}
                                                </a>
                                            )}
                                        </Menu.Item>
                                    ))}
                                </Menu.Items>
                            </Transition>
                        </Menu>
                        : <div className="ml-10 space-x-4">
                            <Link
                                to='login'
                                className="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
                            >
                                Sign in
                            </Link>
                            <Link
                                to='register'
                                className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50"
                            >
                                Sign up
                            </Link>
                        </div>
                    }



                </div>
                <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
                    {navigation.map((link) => (
                        <a key={link.name} href={link.href} className="text-base font-medium text-white hover:text-indigo-50">
                            {link.name}
                        </a>
                    ))}
                </div>
            </nav>
        </header>
    )
}