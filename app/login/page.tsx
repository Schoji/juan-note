import Link from 'next/link'
import React from 'react'
import GoogleButton from './components/googleButton'
import { AuthGuard } from '../core/auth/AuthGuard'
import { AlreadyLogged } from './components/alreadyLogged'

const LoginPage = (destination?: string) => {
    return (
        <div className='h-screen flex justify-center items-center'>
            <div className='p-10 flex flex-col border-1 border-gray-800 text-center gap-3 w-1/4 '>
                <h1 className='text-2xl font-bold'>Notes</h1>
                <p className='text-base text-gray-400'>Sign in to access your notes</p>
                <fieldset className='fieldset'>
                    <legend className='fieldset-legend text-left'>Email address</legend>
                    <label className='input input-lg w-full'>
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </g>
                        </svg>
                        <input placeholder='name@example.com' />
                    </label>
                </fieldset>
                <fieldset className='fieldset'>
                    <legend className='fieldset-legend text-left'>Password</legend>
                    <label className='input input-lg w-full'>
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <path
                                    d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                                ></path>
                                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                            </g>
                        </svg>
                        <input placeholder='......' />
                    </label>
                </fieldset>
                <button className='btn btn-primary'>Sign with Email</button>
                <div className="divider">or continue with</div>
                <GoogleButton/>
                <button className="btn bg-black text-white border-black">
                    <svg aria-label="Apple logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1195 1195"><path fill="white" d="M1006.933 812.8c-32 153.6-115.2 211.2-147.2 249.6-32 25.6-121.6 25.6-153.6 6.4-38.4-25.6-134.4-25.6-166.4 0-44.8 32-115.2 19.2-128 12.8-256-179.2-352-716.8 12.8-774.4 64-12.8 134.4 32 134.4 32 51.2 25.6 70.4 12.8 115.2-6.4 96-44.8 243.2-44.8 313.6 76.8-147.2 96-153.6 294.4 19.2 403.2zM802.133 64c12.8 70.4-64 224-204.8 230.4-12.8-38.4 32-217.6 204.8-230.4z"></path></svg>
                    Login with Apple
                </button>
                <p className='text-base text-gray-400'>Don't have an account? <Link className='link' href={""}>Sign up</Link></p>
            </div>
            <AuthGuard/>
            <AlreadyLogged/>
        </div>
    )
}

export default LoginPage