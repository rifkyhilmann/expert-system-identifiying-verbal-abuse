import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import axios from 'axios'
import InputText from '../../../../../../components/layout/Input/InputText'

export default function UpdateDataAdmin() {
    const { id_admin} = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState('')
    const [namaValue, setNamaValue] = useState('')
    const [usernameValue, setUsernameValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')

    const fetchData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/${id_admin}`)
            setData(response.data[0])
        } catch (err) {
            alert(err)
        }
    }

    const updateData = async () => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/admin/${id_admin}`, {
                nm_admin : namaValue,
                username : usernameValue,
                password : passwordValue
            })
            if(response.status === 200){
                navigate('/admin/data-admin')
            }
        } catch (err) {
            alert(err)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        setNamaValue(data.nm_admin ? data.nm_admin : '')
        setUsernameValue(data.username ? data.username : '')
        setPasswordValue(data.password ? data.password : '')
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
                <p className='text-xs'>Update Data Admin</p>
            </div>
            <div className='ml-6 mr-6 h-max flex flex-col  gap-3'>
                <div className="flex flex-col gap-1">
                    <p className="text-sm">Nama :</p>
                    <InputText 
                        value={namaValue}
                        onChange={(e) => setNamaValue(e.target.value)}
                    />
                </div>
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
                <div className='w-full h-10 flex  mt-5'>
                    <div className="w-10/12 max-w-96 h-10 grid grid-cols-2 gap-3">
                        <button 
                            onClick={btnClick}
                            className="bg-blue-500 hover:bg-blue-400 text-white rounded w-full h-full">
                            Submit
                        </button>
                        <Link to={'/admin/data-admin'}>
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
