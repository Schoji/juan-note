"use client";
import { useAuth } from '@/app/core/auth/AuthContext'
import React from 'react'

const UserSection = () => {
    const { user } = useAuth();
    if (user) {
        return (
            <div className='flex items-center gap-2 p-2'>
                <div className='avatar'>
                    <div className="ring-primary ring-offset-base-100 w-8 rounded-full ring-2 ring-offset-2">
                        <img src={user!.photoURL || '/placeholder-image.png'} />
                    </div>
                </div>
                <div className=''>
                <p className='text-sm font-bold'>{user.displayName}</p>
                <p className='text-xs text-gray-300'>{user.email}</p>
                </div>
            </div>
        )
    }
    else {
        return (<div className='skeleton h-9 w-9 shrink-0 rounded-full'></div>)
    }
}

export default UserSection