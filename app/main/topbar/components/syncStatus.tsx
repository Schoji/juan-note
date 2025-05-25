"use client";
import { useSyncStore } from '@/app/core/global/useSyncStore';
import React from 'react';


const SyncStatus = () => {
    const { syncStatus } = useSyncStore();
    if (syncStatus == "Not synced")
        return (
            <div className='animate-pulse flex items-center'>
                <p className='text-gray-500 text-sm'>Syncing</p>

            </div>
        );
    else if (syncStatus == "Synced") {
        return <div className='flex items-center gap-1'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3 text-gray-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
            <p className='text-gray-500 text-sm'>{syncStatus}</p>
        </div>;
    }
    else {
        return <p>Error</p>;
    }

};

export default SyncStatus;