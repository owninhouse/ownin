import React from 'react';
import { OwnInScrollbars } from '@ownin';
import Logo from 'app/ownin-layout/shared-components/Logo';
import Navigation from 'app/ownin-layout/shared-components/Navigation';
import UserMenu from 'app/ownin-layout/shared-components/UserMenu';
import { useSelector } from 'react-redux';

function NavbarLayout() {

    const user = useSelector(({ auth }) => auth.user);

    return (
        <div className="flex flex-auto items-center w-full h-full container p-0 lg:px-24">

            <div className="flex flex-shrink-0 items-center pl-8 pr-16">
                <Logo />
            </div>

            <OwnInScrollbars className="flex ml-auto h-full items-center">
                <Navigation className="w-full" layout="horizontal" dense />
            </OwnInScrollbars>

            {user.data &&
                <div className="flex">
                    <UserMenu />
                </div>
            }
        </div>
    );
}

export default NavbarLayout;


