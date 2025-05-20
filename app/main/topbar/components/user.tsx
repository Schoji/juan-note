"use client";
import { useAuth } from '@/app/core/auth/AuthContext';
import React from 'react';
import LogoutButton from './logoutButton';

const UserSection = () => {
    const { user } = useAuth();
    if (user) {
        return (
            <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost h-auto p-2">
                    <div className='flex items-center gap-3'>
                        <div className='avatar'>
                            <div className="ring-primary ring-offset-base-100 w-8 rounded-full ring-2 ring-offset-2">
                                <img src={user!.photoURL || '/placeholder-image.png'} />
                            </div>
                        </div>
                        <div className='text-left'>
                            <p className='text-sm font-bold'>{user.displayName}</p>
                            <p className='text-xs text-gray-300'>{user.email}</p>
                        </div>
                    </div>
                </div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-3 shadow-sm">
                    <LogoutButton/>
                </ul>
            </div>
        );
    }
    else {
        return (<div className='skeleton h-9 w-9 shrink-0 rounded-full'></div>);
    }
};

export default UserSection;