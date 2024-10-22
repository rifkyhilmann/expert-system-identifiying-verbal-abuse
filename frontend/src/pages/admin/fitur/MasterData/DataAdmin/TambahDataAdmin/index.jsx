import { useState } from "react"
import InputText from "../../../../../../components/layout/Input/InputText"
import { Link, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import axios from "axios";

export default function TambahDataAdmin() {
    const [namaValue, setNamaValue] = useState('')
    const [usernameValue, setUsernameValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
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

    const btnClick = () => {
        if (!namaValue || !usernameValue || !passwordValue) {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Tidak Boleh Kosong',
            }) 
        } else {
            fetchAdd()
        }
    }

    const fetchAdd = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/regis/admin` , {
                nm_admin : namaValue,
                username : usernameValue,
                password : passwordValue
            })
            if (response.status === 200) {
                navigate('/admin/data-admin')
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



    return (
        <div className='flex flex-col w-full h-max gap-5'>
            <div className='flex flex-col ml-6'>
                <p className='font-semibold text-lg'>Master Data</p>
                <p className='text-xs'>Tambah Data Admin</p>
            </div>
            <div className='ml-6 mr-6 h-max flex flex-col items-center gap-3'> 
                <InputText 
                    text="Masukan Nama"
                    value={namaValue}
                    onChange={(e) => setNamaValue(e.target.value)}
                />
                <InputText 
                    text="Masukan Username"
                    value={usernameValue}
                    onChange={(e) => setUsernameValue(e.target.value)}
                />
                <InputText 
                    text="Masukan Password"
                    value={passwordValue}
                    onChange={(e) => setPasswordValue(e.target.value)}
                />
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
