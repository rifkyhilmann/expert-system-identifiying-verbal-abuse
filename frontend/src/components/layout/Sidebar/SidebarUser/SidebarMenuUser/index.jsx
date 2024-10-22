import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function SidebarMenuUser({to, text, url, icons}) {
    const location = useLocation()

    return (
        <Link to={to}>
            <div className={`${location.pathname === url ? 'bg-blue-400' : 'bg-transparent'}  w-full h-12 cursor-pointer rounded hover:bg-blue-400 text-white flex items-center gap-4`}>
                <div className='w-8 h-8 rounded  ml-5 flex items-center justify-center'>
                    <img 
                        src={icons}  
                        alt="" 
                        className='w-6 h-6'
                    />
                </div>
                <p>{text}</p>
            </div>
        </Link>
    )
}
