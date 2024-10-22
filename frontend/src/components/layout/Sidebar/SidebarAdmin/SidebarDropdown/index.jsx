import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { Link, useLocation } from 'react-router-dom'
import iconsData from '../../../../../assets/icons/data.png'

export default function SidebarDropdown() {
    const [isActive, setIsActive] = useState(false)
    const location = useLocation()

    return (
        <div className={`w-full h-max min-h-12 flex flex-col `}>
            <div 
                onClick={() => setIsActive(!isActive)}
                className={`w-full h-12 cursor-pointer flex items-center gap-3  rounded font-poppins hover:bg-second relative`}>
                <div className='w-10 h-10 rounded ml-2 flex items-center justify-center'>
                    <img 
                        src={iconsData}
                        alt="" 
                        className='w-5 h-5'
                    />
                </div>
                <p className='text-md font-medium '>Master Data</p>
                <FontAwesomeIcon 
                    icon={isActive ? faChevronUp : faChevronDown} 
                    className='text-xs absolute right-4'
                />
            </div>
            <div className={`${isActive ? 'flex' : 'hidden'} flex flex-col gap-2 w-full h-max my-2`}>
                <Link to={'/admin/data-admin'}>
                    <div className={`${location.pathname === '/admin/data-admin' ? 'bg-second' : 'bg-transparent' } w-full h-12 cursor-pointer  flex items-center gap-3  rounded font-poppins hover:bg-second`}>
                        <p className='text-sm font-medium ml-14 '>Data Admin</p>
                    </div>
                </Link>
                <Link to={'/admin/data-siswa'}>
                    <div className={`${location.pathname === '/admin/data-siswa' ? 'bg-second' : 'bg-transparent' } w-full h-12 cursor-pointer  flex items-center gap-3  rounded font-poppins hover:bg-second`}>
                        <p className='text-sm font-medium ml-14 '>Data Siswa</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}
