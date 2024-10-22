import React, { useState } from 'react'
import InputText from '../../../../../components/layout/Input/InputText'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

export default function TambahPenyakit() {
    const [kodePenyakit, setKodePenyakit] = useState('')
    const [namaPenyakit, setNamaPenyakit] = useState('')
    const [keteranganPenyakit, setKeteranganPenyakit] = useState('')
    const [solusi, setSolusi] = useState('')
    const navigate = useNavigate()
    const MySwal = withReactContent(Swal)
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

    const fetchAdd = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/penyakit` , {
                kd_penyakit : kodePenyakit,
                nm_penyakit : namaPenyakit,
                ket : keteranganPenyakit,
                solusi : solusi
            })
            if (response.status === 200) {
                navigate('/admin/penyakit')
                Toast.fire({
                    icon: 'success',
                    title: 'Tambah Penyakit Berhasil'
                })
            } else {
                MySwal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Gagal Tambah Penyakit'
                });
            }
        } catch (err) {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error'
            });
        }
    }

    const btnClick = () => {
        if (!namaPenyakit || !kodePenyakit || !keteranganPenyakit || !solusi) {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Tidak Boleh Kosong',
            }) 
        } else {
            fetchAdd()
        }
    }


    return (
        <div className='flex flex-col w-full h-max gap-7'>
            <div className='flex flex-col ml-6'>
                <p className='font-semibold text-lg'>Kelainan</p>
                <p className='text-xs'>Tambah Data Kelainan</p>
            </div>
            <div className='ml-6 mr-6 h-max flex flex-col items-center gap-3'>
                <InputText 
                    text="Masukan Kode Kelainan"
                    value={kodePenyakit}
                    onChange={(e) => setKodePenyakit(e.target.value)}
                />
                <InputText 
                    text="Masukan Nama Kelainan"
                    value={namaPenyakit}
                    onChange={(e) => setNamaPenyakit(e.target.value)}
                />
                <InputText 
                    text="Masukan Keterangan Kelainan"
                    value={keteranganPenyakit}
                    onChange={(e) => setKeteranganPenyakit(e.target.value)}
                />
                <InputText 
                    text="Masukan Solusi"
                    value={solusi}
                    onChange={(e) => setSolusi(e.target.value)}
                />
                <div className='w-full h-10 flex  mt-5'>
                    <div className="w-10/12 max-w-96 h-10 grid grid-cols-2 gap-3">
                        <button 
                            onClick={btnClick}
                            className="bg-blue-500 hover:bg-blue-400 text-white rounded w-full h-full">
                            Submit
                        </button>
                        <Link to={'/admin/penyakit'}>
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
