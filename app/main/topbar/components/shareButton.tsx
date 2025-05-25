"use client";
import { useAuth } from '@/app/core/auth/AuthContext';
import { useNoteStore } from '@/app/core/global/useNoteStore';
import React, { useState } from 'react';

const ShareButton = () => {
    const { user } = useAuth() ?? null;
    const title = useNoteStore((state) =>
        user ? state.getNoteTitle(user.uid) : null
    );
    const [selectedMenu, setSelectedMenu] = useState<number>(0);
    const [copyConfirmed, setCopyConfirmed] = useState<boolean>(false);
    const [url] = useState<string>("https://notes.app/shared/5w751alub3w?note=1&permission=editor");
    return (
        <>
            <button
                className="btn btn-ghost btn-sm"
                onClick={() => {
                    const modal = document.getElementById('my_modal_2') as HTMLDialogElement | null;
                    if (modal) {
                        modal.showModal();
                    }
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                </svg>
                Share
            </button>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box  border-neutral-800 border-1">
                    <div className='flex justify-between'>
                        <div>
                            <h3 className="font-bold text-lg">Share Note</h3>
                            <p className='text-sm text-gray-400'>&quot;{title}&quot;</p>
                        </div>
                        <form method="dialog">
                            <button className="btn btn-ghost btn-circle">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </form>
                    </div>
                    <div className="divider mb-0"></div>
                    <div className='flex justify-around p-2'>
                        <button className={`btn btn-ghost flex-1/3 rounded-none ${selectedMenu == 0 ? 'btn-active' : null}`} onClick={() => setSelectedMenu(0)}>Share link</button>
                        <button className={`btn btn-ghost flex-1/3 rounded-none ${selectedMenu == 1 ? 'btn-active' : null}`} onClick={() => setSelectedMenu(1)}>Invite People</button>
                        <button className={`btn btn-ghost flex-1/3 rounded-none ${selectedMenu == 2 ? 'btn-active' : null}`} onClick={() => setSelectedMenu(2)}>Manage Access</button>
                    </div>
                    {selectedMenu == 0 ?
                        <div className='p-4 flex flex-col gap-3'>
                            <div className='flex justify-between items-center'>
                                <p className='text-sm'>Link access</p>
                                <label className='swap swap-rotate'>
                                    <input type="checkbox" />
                                    <div className='swap-on font-bold border-1 border-gray-500 p-2 bg-gray-950 rounded-sm text-sm flex justify-center items-center gap-1'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                        </svg>

                                        Private
                                    </div>
                                    <div className="swap-off font-bold border-1 border-gray-500 p-2 bg-gray-950 rounded-sm text-sm flex justify-center items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                                        </svg>

                                        Public
                                    </div>

                                </label>
                            </div>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Permission Level</legend>
                                <select defaultValue="Pick a browser" className="select w-full">
                                    <option disabled={true}>Permission Level</option>
                                    <option>Can edit</option>
                                    <option>Can view</option>
                                </select>
                            </fieldset>
                            <div>
                                <fieldset className="fieldset flex">
                                    <legend className="fieldset-legend">Share link</legend>

                                    <label className="input validator w-full">
                                        <input id="url" value={url} readOnly={true} className="w-full" required />
                                    </label>
                                    <div className="validator-hint hidden">Enter valid email address</div>
                                    <button
                                        className="btn btn-primary btn-square"
                                        onClick={() => {
                                            navigator.clipboard.writeText((document.getElementById("url") as HTMLInputElement)!.value);
                                            setCopyConfirmed(true);
                                            setTimeout(() => {
                                                setCopyConfirmed(false);
                                            }, 5000);
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                                        </svg>

                                    </button>
                                </fieldset>
                                <p className={`text-green-500 text-xs transition-opacity duration-500 ease-in-out ${copyConfirmed ? 'opacity-100' : 'opacity-0'
                                    }`}>Link copied to clipboard!</p>
                            </div>

                            <div className='flex gap-2'>
                                <button className='btn flex-1/2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                    </svg>

                                    Email
                                </button>
                                <button className='btn flex-1/2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                    </svg>
                                    Share
                                </button>
                            </div>
                        </div>
                        : selectedMenu == 1 ?
                            <div>

                            </div>
                            :
                            <div>
                            </div>}
                    <form method="dialog" className='flex justify-between items-center'>
                        <p className='text-xs text-gray-400'>Changes are saved automatically and synced in real-time</p>

                        <button className="btn btn-primary"> Done
                        </button>
                    </form>
                </div>

                <form method="dialog" className="modal-backdrop">
                    <button className='hover:cursor-default'>close</button>
                </form>
            </dialog>
        </>
    );
};

export default ShareButton;