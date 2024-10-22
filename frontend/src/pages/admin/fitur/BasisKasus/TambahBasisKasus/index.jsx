import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

export default function TambahBasisKasus() {
    const [data, setData] = useState([])
    const [dataGejala, setDataGejala] = useState([])
    const [kdPenyakitValue, setKdPenyakitValue] = useState('')
    const [selectedGejala, setSelectedGejala] = useState([])
    const MySwal = withReactContent(Swal)
    const navigate = useNavigate()
    const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
    })

    const fetchData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/penyakit`)
            setData(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    const fetchDataGejala = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/gejala`)
            setDataGejala(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    const addBasisKasus = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/basisKasus`, {
                kd_penyakit : kdPenyakitValue,
                id_gejala : selectedGejala
            })
            if(response.status === 200) {
                navigate('/admin/basisKasus')
                Toast.fire({
                    icon: 'success',
                    title: 'Tambah Basis Kasus Berhasil'
                })
            } else {
                MySwal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Gagal Tambah Basis Kasus'
                });
            }
        } catch (err) {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error Fetching Data'
            });
        }
    }

    useEffect(() => {
        fetchData()
        fetchDataGejala()
    }, [])

    const handleCheckboxChange = (id_gejala) => {
        setSelectedGejala(prevSelectedGejala => {
            if (prevSelectedGejala.includes(id_gejala)) {
                return prevSelectedGejala.filter(id => id !== id_gejala)
            } else {
                return [...prevSelectedGejala, id_gejala]
            }
        })
    }

    const btnSubmitClick = () => {
        if (!selectedGejala || !kdPenyakitValue) {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Tidak Boleh Kosong'
            });
        } else {
            addBasisKasus()
        }
    }

    return (
        <div className='flex flex-col w-full h-max gap-5'>
            <div className='flex flex-col ml-6'>
                <p className='font-semibold text-lg'>Basis Kasus</p>
                <p className='text-xs'>Tambah Data Basis Kasus</p>
            </div>
            <div className='ml-6 mr-6 h-max'>
                <select className='w-full h-12'
                    value={kdPenyakitValue}
                    onChange={(e) => setKdPenyakitValue(e.target.value)}    
                >
                    <option value="" disabled>Pilih Penyakit</option>
                    {data.map((items, index) => (
                        <option key={index} value={items.kd_penyakit}>{items.kd_penyakit} {items.nm_penyakit}</option>
                    ))}
                </select>
                <div className='checbox-gejala w-full flex flex-col gap-4 mt-5 overflow-y-auto pr-2 max-h-60'>
                    {dataGejala.map((items, index) => (
                        <div className="flex items-center gap-2" key={index}>
                            <input 
                                type="checkbox" 
                                onChange={() => handleCheckboxChange(items.id_gejala)}
                                checked={selectedGejala.includes(items.id_gejala)}
                            />
                            <p>{items.nm_gejala}</p>
                        </div>
                    ))}
                </div>
                <div className='w-full h-10 flex mt-9'>
                    <div className="w-10/12 max-w-96 h-10 grid grid-cols-2 gap-3">
                        <button 
                            onClick={btnSubmitClick}
                            className="bg-blue-500 hover:bg-blue-400 text-white rounded w-full h-full">
                            Submit
                        </button>
                        <Link to={'/admin/basisKasus'}>
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
