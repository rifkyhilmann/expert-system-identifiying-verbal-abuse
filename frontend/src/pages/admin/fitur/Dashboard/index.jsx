import { faDollar, faUser, faMedkit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function DashboardAdmin() {
  const [countSiswa, setCountSiswa] = useState('')
  const [countAdmin, setCountAdmin] = useState('')
  
  const fetchCount = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/siswa-count`)
      setCountSiswa(response.data.total)
    } catch (e) {
      alert("Error getting")
    } 
  }
  const fetchCountAdmin = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/count`)
      setCountAdmin(response.data.total)
    } catch (e) {
      alert("Error getting")
    } 
  }
  
  useEffect(() => {
    fetchCount()
    fetchCountAdmin()
  }, [])

  return (
      <div className='flex flex-col w-full h-20 gap-5 '>
          <div className='flex flex-col ml-6'>
              <p className='font-semibold text-lg'>Dashboard</p>
              <p className='text-xs'>Home</p>
          </div>
          <div className='ml-6 mr-6 h-max  grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5'>
          <div className='bg-white h-52 rounded shadow-lg flex gap-3 flex-col items-center justify-center '>
              <div className='h-14 w-14 bg-gray-300 rounded-full  flex items-center justify-center'>
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div className='flex flex-col items-center gap-1'>
                <p className='text-lg font-semibold'>{countSiswa}</p>
              </div>
              <p className='text-primary font-semibold text-sm'>Jumlah Siswa</p>
          </div>
          <div className='bg-white h-52 rounded shadow-lg flex gap-3 flex-col items-center justify-center '>
              <div className='h-14 w-14 bg-gray-300 rounded-full  flex items-center justify-center'>
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div className='flex flex-col items-center gap-1'>
                <p className='text-lg font-semibold'>{countAdmin ? countAdmin : ''}</p>
              </div>
              <p className='text-primary font-semibold text-sm'>Jumlah Admin</p>
          </div>
          <div className='bg-white h-52 rounded shadow-lg flex gap-3 flex-col items-center justify-center '>
              <div className='h-14 w-14 bg-gray-300 rounded-full  flex items-center justify-center'>
                <FontAwesomeIcon icon={faMedkit} />
              </div>
              <div className='flex flex-col items-center gap-1'>
                <p className='text-lg font-semibold'>5</p>
              </div>
              <p className='text-primary font-semibold text-sm'>Total Konsultasi</p>
          </div>
      </div>
      </div>
    )
}
