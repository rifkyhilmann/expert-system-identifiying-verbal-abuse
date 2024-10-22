import React from 'react'
import SidebarMenu from './SidebarMenu'
import iconsDashboard from '../../../../assets/icons/dashboardWhite.png'
import iconsPenyakit from '../../../../assets/icons/penyakit.png'
import iconsLogout from '../../../../assets/icons/logoutWhite.png'
import iconsTime from '../../../../assets/icons/time.png'
import SidebarDropdown from './SidebarDropdown'

export default function SidebarAdmin({isActive}) {
    return (
        <div className={`${isActive ? 'fixed sidebar-container' : 'hidden sidebar-active'} flex flex-col items-center h-screen w-64 shadow-md z-50 bg-primary text-white`}>
            <div className=' min-h-20 w-full font-playwrite flex items-center justify-center text-xl mt-5'>
                <p className='text-center font-playwrite'>Sistem Pakar Identifikasi Verbal Abuse</p>
            </div>
            <div className='w-11/12 h-max mt-4 flex flex-col gap-1'>
                <SidebarMenu 
                    text="Dashboard"
                    icons={iconsDashboard} 
                    url={'/admin'}
                    to={'/admin'}
                />
                <SidebarDropdown 
                
                />
                <SidebarMenu 
                    text="Kelainan"
                    icons={iconsPenyakit} 
                    url={'/admin/penyakit'}
                    to={'/admin/penyakit '}
                />
                <SidebarMenu 
                    text="Gejala"
                    icons={iconsPenyakit} 
                    url={'/admin/gejala'}
                    to={'/admin/gejala '}
                />
                <SidebarMenu 
                    text="Basis Kasus"
                    icons={iconsPenyakit} 
                    url={'/admin/basisKasus'}
                    to={'/admin/basisKasus'}
                />
                <SidebarMenu 
                    text="Riwayat Konsultasi"
                    icons={iconsTime} 
                    url={'/admin/riwayatKonsultasi'}
                    to={'/admin/riwayatKonsultasi'}
                />
                <SidebarMenu 
                    text="Logout"
                    icons={iconsLogout} 
                    to={'/admin/login'}
                />
            </div>
        </div>
    )
}
