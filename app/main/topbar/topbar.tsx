import React from 'react'
import NavTitle from './components/navTitle'
import LogoutButton from './components/logoutButton'
import UserSection from './components/user'

const Topbar = () => {
    return (
        <div className='navbar border-b-1 border-neutral-800'>
            <div className='navbar-start'>
                <UserSection/>
            </div>
            <div className='navbar-center'>
                <NavTitle/>
            </div>
            <div className='navbar-end'>
                <LogoutButton/>
            </div>
        </div>
    )
}

export default Topbar;