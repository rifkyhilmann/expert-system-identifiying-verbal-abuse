import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import InputText from '../../../../components/layout/Input/InputText';
import InputPass from '../../../../components/layout/Input/InputPass';
import ButtonSubmit from '../../../../components/layout/Button/ButtonSubmit';
import axios from 'axios';

export default function RegisUser() {
    const [namaValue, setNamaValue] = useState('')
    const [usernameValue, setUsernameValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [jenisKelamin, setJenisKelamin] = useState('')
    const [alamatValue, setAlamatValue] = useState('')
    const [noHpValue, setNoHpValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)
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

    const fetchRegis = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/regis/siswa` , {
                username : usernameValue,
                password : passwordValue,
                nm_lengkap : namaValue,
                jns_kelamin : jenisKelamin,
                alamat : alamatValue,
                no_hp : noHpValue
            })
            if(response.status === 200) {
                Toast.fire({
                    icon: 'success',
                    title: 'Register Berhasil'
                })
                navigate('/')
            } else {
                MySwal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error'
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
        if(!usernameValue || !passwordValue || !alamatValue || !noHpValue || !namaValue || !jenisKelamin) {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Tidak Boleh Kosong',
            }) 
        } else {
            setIsLoading(true)
            setTimeout(() => {
                setIsLoading(false)
                fetchRegis()
            }, 1000);
        }
    }

    return (
        <div className='h-screen w-full bg-white flex items-center justify-center font-poppins'>
            <div className='login-container  shadow-lg flex flex-col items-center bg-gray-50 relative '>
                <div className='h-24 w-full font-playwrite font-bold text-2xl flex items-center justify-center'>
                    <p>SIPABUS</p>
                </div>
                <p className='font-bold text-xl'>SIGN UP</p>
                <div className='w-10/12 h-max mt-10 flex flex-col gap-5 '>
                    <InputText 
                        text="Masukan Nama Lengkap"
                        value={namaValue}
                        onChange={(e) => setNamaValue(e.target.value)}
                    />
                    <InputText 
                        text="Masukan Username"
                        value={usernameValue}
                        onChange={(e) => setUsernameValue(e.target.value)}
                    />
                    <InputPass 
                        text="Masukan Password"
                        value={passwordValue}
                        onChange={(e) => setPasswordValue(e.target.value)}
                    />
                    <InputText 
                        text="Masukan Jenis Kelamin"
                        value={jenisKelamin}
                        onChange={(e) => setJenisKelamin(e.target.value)}
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
                    <div className='w-full flex items-center mt-2 mb-20'>
                        <ButtonSubmit 
                            title="Sign In"
                            onClick={btnClick}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
                <div className='flex items-center absolute bottom-4 gap-3 text-sm'>
                    <p>Already Have Any Account?</p>
                    <Link to={'/'}>
                        <button className='text-blue-400 font-bold'>
                            Sign In
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
