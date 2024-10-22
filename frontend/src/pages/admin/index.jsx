import Navbar from "../../components/layout/Navbar"
import { useState } from "react"
import SidebarAdmin from "../../components/layout/Sidebar/SidebarAdmin"
import { Route, Routes } from "react-router-dom"
import DashboardAdmin from "./fitur/Dashboard"
import PenyakitAdmin from "./fitur/Penyakit"
import TambahPenyakit from "./fitur/Penyakit/TambahPenyakit"
import UpdatePenyakit from "./fitur/Penyakit/UpdatePenyakit"
import Gejala from "./fitur/Gejala"
import TambahGejala from "./fitur/Gejala/TambahGejala"
import UpdateGejala from "./fitur/Gejala/UpdateGejala"
import BasisKasus from "./fitur/BasisKasus"
import TambahBasisKasus from "./fitur/BasisKasus/TambahBasisKasus"
import RiwayatKonsultasi from "./fitur/RiwayatKonsultasi"
import DataAdmin from "./fitur/MasterData/DataAdmin"
import DataSiswa from './fitur/MasterData/DataSiswa'
import TambahDataAdmin from "./fitur/MasterData/DataAdmin/TambahDataAdmin"
import UpdateDataAdmin from "./fitur/MasterData/DataAdmin/UpdateDataAdmin"
import TambahSiswa from "./fitur/MasterData/DataSiswa/TambahSiswa"
import UpdateDataSiswa from "./fitur/MasterData/DataSiswa/UpdateSiswa"

export default function PagesAdmin() {
    const [sidebarIsActive, setSidebarIsActive] = useState(true)
    
    return (
        <div className='flex items-center w-full min-h-screen h-max '>
            <SidebarAdmin 
                isActive={sidebarIsActive}
            />
            <div className={`${sidebarIsActive ? 'content' : 'content-active'} h-max min-h-screen w-full flex flex-col items-center bg-gray-100`}>
                <Navbar 
                    isActive={sidebarIsActive}
                    setIsActive={setSidebarIsActive}
                />
                <div className="mt-3 w-full h-max ">
                    <Routes>
                        <Route path="/" element={<DashboardAdmin />} />
                        <Route path="/penyakit" element={<PenyakitAdmin />} />
                        <Route path="/penyakit/tambah" element={<TambahPenyakit />} />
                        <Route path="/penyakit/update/:kd_penyakit" element={<UpdatePenyakit />} />
                        <Route path="/gejala" element={<Gejala />} />
                        <Route path="/gejala/tambah" element={<TambahGejala/>} />
                        <Route path="/gejala/update/:id_gejala" element={<UpdateGejala/>} />
                        <Route path="/basisKasus" element={<BasisKasus/>} />
                        <Route path="/basisKasus/tambah" element={<TambahBasisKasus/>} />
                        <Route path="/riwayatKonsultasi" element={<RiwayatKonsultasi/>} />
                        <Route path="/data-siswa" element={<DataSiswa/>} />
                        <Route path="/data-siswa/tambah" element={<TambahSiswa/>} />
                        <Route path="/data-siswa/update/:id_user" element={<UpdateDataSiswa/>} />
                        <Route path="/data-admin" element={<DataAdmin/>} />
                        <Route path="/data-admin/tambah" element={<TambahDataAdmin/>} />
                        <Route path="/data-admin/update/:id_admin" element={<UpdateDataAdmin/>} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}
