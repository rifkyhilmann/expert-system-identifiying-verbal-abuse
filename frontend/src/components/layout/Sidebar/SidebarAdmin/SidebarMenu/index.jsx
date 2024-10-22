import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function SidebarMenu({text, to, icons, url}) {
    const location = useLocation()

    return (
        <Link to={to}>
            <div className={`sidebar-menu ${location.pathname === url ? 'bg-second' : 'bg-transparent'} w-full h-12 cursor-pointer flex items-center gap-3  rounded font-poppins hover:bg-second`}>
                <div className='w-10 h-10 rounded ml-2 flex items-center justify-center'>
                    <img 
                        src={icons}  
                        alt="" 
                        className='w-5 h-5'
                    />
                </div>
                <p className='text-md font-medium '>{text}</p>
            </div>
        </Link>
    )
}
