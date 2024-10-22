import React, { useState } from 'react'
import InputText from '../../../../components/layout/Input/InputText'
import InputPass from '../../../../components/layout/Input/InputPass'
import ButtonSubmit from '../../../../components/layout/Button/ButtonSubmit'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import { useUser } from '../../../../providers/userContext'
import axios from 'axios'

export default function AdminLogin() {
    const [usernameValue, setUsernameValue] = useState()
    const [passwordValue, setPasswordValue] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const MySwal = withReactContent(Swal)
    const {setUsername} = useUser()
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

    const fetchLogin = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin`, {
                username: usernameValue,
                password: passwordValue
            });

            if (response.status === 200) {
                setUsernameValue(usernameValue);
                Toast.fire({
                    icon: 'success',
                    title: 'Login berhasil'
                });
                navigate('/admin');
                setUsername(usernameValue)
            } else {
                throw new Error('Login gagal');
            }
        } catch (err) {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Username dan Password Salah'
            });
        }
    };

    const btnClick = () => {
        if(!usernameValue || !passwordValue) {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Username Dan Password Tidak Boleh Kosong',
            }) 
        } else {
            setIsLoading(true)
            setTimeout(() => {
                setIsLoading(false)
                fetchLogin()
            }, 1000);
        }
        setUsernameValue('')
        setPasswordValue('')
        
    }

    return (
        <div className='h-screen w-full bg-white flex items-center justify-center font-poppins'>
            <div className='login-container  shadow-lg flex flex-col items-center bg-gray-50 relative '>
                <div className='h-24 w-[80%] font-poppins font-semibold mt-5 text-xl flex items-center justify-center text-center '>
                    <p>
                        SISTEM PAKAR IDENTIFIKASI VERBAL ABUSE
                    </p>
                </div>
                <p className='font-bold text-xl'>SIGN IN ADMIN</p>
                <div className='w-10/12 h-max mt-10 flex flex-col gap-5 '>
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
                    <div className='w-full flex items-center mt-4'>
                        <ButtonSubmit 
                            title="Sign In"
                            onClick={btnClick}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
