import { useState } from "react"
import InputText from "../../../../../../components/layout/Input/InputText"
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"

export default function TambahSiswa() {
    const [usernameValue, setUsernameValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [namaValue, setNamaValue] = useState('')
    const [jenisKelaminValue, setJenisKelaminValue] = useState('')
    const [alamatValue, setAlamatValue] = useState('')
    const [noHpValue, setNoHpValue] = useState('')
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

    const fetchAdd = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/regis/siswa` , {
                username : usernameValue,
                password : passwordValue,
                nm_lengkap : namaValue,
                jns_kelamin : jenisKelaminValue,
                alamat : alamatValue,
                no_hp : noHpValue
            })
            if (response.status === 200) {
                navigate('/admin/data-siswa')
                Toast.fire({
                    icon: 'success',
                    title: 'Tambah Siswa Berhasil'
                })
            } else {
                MySwal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Gagal Tambah Siswa'
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
        if(!usernameValue || !passwordValue || !namaValue || !alamatValue || !jenisKelaminValue || !noHpValue) {
            MySwal.fire({
                icon: 'error',
                title: 'Tidak Boleh Kosong!',
            });
        } else {
            fetchAdd()
        }
    }

    return (
        <div className="flex flex-col w-full h-max gap-5">
            <div className='flex flex-col ml-6'>
                <p className='font-semibold text-lg'>Master Data</p>
                <p className='text-xs'>Tambah Data Siswa</p>
            </div>
            <div className='ml-6 mr-6 h-max flex flex-col items-center gap-3'>
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
                <InputText 
                    text="Masukan Nama Lengkap"
                    value={namaValue}
                    onChange={(e) => setNamaValue(e.target.value)}                
                />
                <InputText 
                    text="Masukan Jenis Kelamin"
                    value={jenisKelaminValue}
                    onChange={(e) => setJenisKelaminValue(e.target.value)}                
                />
                <InputText 
                    text="Masukan Alamat"
                    value={alamatValue}
                    onChange={(e) => setAlamatValue(e.target.value)}                
                />
                <InputText 
                    text="Masukan No Hp"
                    value={noHpValue}
                    onChange={(e) => setNoHpValue(e.target.value)}                
                />
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
