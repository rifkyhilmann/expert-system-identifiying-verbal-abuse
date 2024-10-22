import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import axios from 'axios'
import InputText from '../../../../../../components/layout/Input/InputText'

export default function UpdateDataSiswa() {
    const {id_user} = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState('')
    const [usernameValue, setUsernameValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [namaValue, setNamaValue] = useState('')
    const [jenisKelaminValue, setJenisKelaminValue] = useState('')
    const [alamatValue, setAlamatValue] = useState('')
    const [noHpValue, setNoHpValue] = useState('')

    const fetchData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/siswa/${id_user}`)
            setData(response.data[0])
        } catch (err) {
            alert(err)
        }
    }

    const updateData = async () => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/siswa/${id_user}`, {
                username : usernameValue,
                password : passwordValue,
                nm_lengkap : namaValue,
                jns_kelamin : jenisKelaminValue,
                alamat : alamatValue,
                no_hp : noHpValue
            })
            if(response.status === 200){
                navigate('/admin/data-siswa')
            }
        } catch (err) {
            alert(err)
        }
    }


    useEffect(() => {
        fetchData()
        console.log(id_user)
    }, [id_user])

    useEffect(() => {
        setUsernameValue(data.username ? data.username : '')
        setPasswordValue(data.password ? data.password : '')
        setNamaValue(data.nm_lengkap ? data.nm_lengkap : '')
        setJenisKelaminValue(data.jns_kelamin ? data.jns_kelamin : '')
        setAlamatValue(data.alamat ? data.alamat : '')
        setNoHpValue(data.no_hp ? data.no_hp : '')
    }, [data])

    const btnClick = () => {
        if(!namaValue || !usernameValue || !passwordValue) {
            alert("tidak boleh kosong")
        } else {
            updateData()
        }
    }

    return (
        <div className='flex flex-col w-full h-max gap-5'>
            <div className='flex flex-col ml-6'>
                <p className='font-semibold text-lg'>Master Data</p>
                <p className='text-xs'>Update Data Siswa</p>
            </div>
            <div className='ml-6 mr-6 h-max flex flex-col  gap-3'>
                
                <div className="flex flex-col gap-1">
                    <p className="text-sm">Username :</p>
                    <InputText 
                        value={usernameValue}
                        onChange={(e) => setUsernameValue(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-sm">Password :</p>
                    <InputText 
                        value={passwordValue}
                        onChange={(e) => setPasswordValue(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-sm">Nama :</p>
                    <InputText 
                        value={namaValue}
                        onChange={(e) => setNamaValue(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-sm">Jenis Kelamin :</p>
                    <InputText 
                        value={jenisKelaminValue}
                        onChange={(e) => setJenisKelaminValue(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-sm">Alamat :</p>
                    <InputText 
                        value={alamatValue}
                        onChange={(e) => setAlamatValue(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-sm">No Hp :</p>
                    <InputText 
                        value={noHpValue}
                        onChange={(e) => setNoHpValue(e.target.value)}
                    />
                </div>
                <div className='w-full h-10 flex  mt-5'>
                    <div className="w-10/12 max-w-96 h-10 grid grid-cols-2 gap-3">
                        <button 
                            onClick={btnClick}
                            className="bg-blue-500 hover:bg-blue-400 text-white rounded w-full h-full">
                            Submit
                        </button>
                        <Link to={'/admin/data-siswa'}>
                            <button className="bg-red-500 hover:bg-red-400 text-white rounded w-full h-full">
                                Cancel
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
