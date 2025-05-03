import React from 'react'
import NavTitle from './navTitle'

const Topbar = () => {

    return (
        <div className='navbar border-b-1 border-neutral-800'>
            <div className='navbar-start'>
                {/* <p>Navbar start</p> */}
            </div>
            <div className='navbar-center'>
                <NavTitle/>
            </div>
            <div className='navbar-end'>
                {/* <p>Navbar end</p> */}
            </div>
        </div>
    )
}

export default Topbar