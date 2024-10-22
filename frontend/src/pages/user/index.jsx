import React, { useState } from 'react'
import SidebarUser from '../../components/layout/Sidebar/SidebarUser'
import Navbar from '../../components/layout/Navbar'
import { Route, Routes } from 'react-router-dom'
import DashboardSiswa from './fitur/DashboardSiswa'
import KonsultasiSiswa from './fitur/KonsultasiSiswa'

export default function PagesUser() {
    const [sidebarIsActive, setSidebarIsActive] = useState(true)

    return (
        <div className='flex items-center w-full min-h-screen h-max '>
            <SidebarUser 
                isActive={sidebarIsActive}
                setIsActive={setSidebarIsActive}
            />
            <div className={`${sidebarIsActive ? 'content' : 'content-active'} h-max min-h-screen w-full flex flex-col items-center bg-white`}>
                <div className='mt-3 w-full  h-max'>
                    <Routes>
                        <Route path='/' element={<DashboardSiswa />} />
                        <Route path='/konsultasi' element={<KonsultasiSiswa />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}
