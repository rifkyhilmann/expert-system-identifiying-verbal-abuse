import React from 'react'
import { useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import SidebarMenuUser from './SidebarMenuUser'
import { dashboardWhite, konsultasi, logout, hasilKonsul } from '../../../../assets'

export default function SidebarUser({isActive, setIsActive}) {
    const location = useLocation()

    return (
        <div className={`${isActive ? 'fixed sidebar-container' : 'hidden sidebar-active'} bg-white h-screen w-64  z-50 flex items-center justify-center`}>
            <div className='sidebar-siswa bg-blue-500 rounded-xl font-poppins flex flex-col items-center'>
                <div className='w-full h-20 text-3xl text-white flex items-center justify-center'>
                    <p>SISPAK</p>
                </div>
                <div className="flex flex-col w-11/12 gap-3 justify-center">
                    <SidebarMenuUser 
                        to="/user"
                        url="/user"
                        text = "Dashboard"
                        icons={dashboardWhite}
                    />
                    <SidebarMenuUser 
                        to="/user/konsultasi"
                        url="/user/konsultasi"
                        text = "Konsultasi"
                        icons={konsultasi}
                    />
                    <SidebarMenuUser 
                        to="/user/hasilKonsultasi"
                        url="/user/hasilKonsultasi"
                        text = "Hasil Konsultasi"
                        icons={hasilKonsul}
                    />
                    <SidebarMenuUser 
                        to="/"
                        url="/"
                        text = "Logout"
                        icons={logout}
                    />
                </div>
            </div>
        </div>
    )
}
