import { useEffect, useState } from "react"
import InputText from "../../../../../components/layout/Input/InputText"
import { useParams, Link, useNavigate } from "react-router-dom"
import axios from "axios"
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

export default function UpdatePenyakit() {
    const [kodePenyakit, setKodePenyakit] = useState('')
    const [namaPenyakit, setNamaPenyakit] = useState('')
    const [keteranganPenyakit, setKeteranganPenyakit] = useState('')
    const [solusi, setSolusi] = useState('')
    const [data, setData] = useState('')
    const {kd_penyakit} = useParams()
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

    const fetchData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/penyakit/${kd_penyakit}`)
            setData(response.data[0])
        } catch (err) {
            alert(err)
        }
    }

    const updateData = async () => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/penyakit/${kd_penyakit}`, {
                nm_penyakit : namaPenyakit,
                ket : keteranganPenyakit,
                solusi : solusi
            })
            if(response.status === 200){
                navigate('/admin/penyakit')
                Toast.fire({
                    icon: 'success',
                    title: 'Update Penyakit Berhasil'
                })
            } else {
                MySwal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Gagal Update Penyakit'
                });
            }
        } catch (err) {
            alert(err)
        }
    }



    useEffect(() => {
        fetchData()
    }, [])
    
    useEffect(() => {
        setKodePenyakit(data.kd_penyakit ?  data.kd_penyakit : '')
        setNamaPenyakit(data.nm_penyakit  ?  data.nm_penyakit : '')
        setKeteranganPenyakit(data.ket ? data.ket : '')
        setSolusi(data.solusi ? data.solusi : '')
    }, [data])

    const btnClick = () => {
        updateData()
    }

    return (
        <div className='flex flex-col w-full h-max gap-7'>
            <div className='flex flex-col ml-6'>
                <p className='font-semibold text-lg'>Kelainan</p>
                <p className='text-xs'>Update Data Kelainan</p>
            </div>
            <div className='ml-6 mr-6 h-max flex flex-col  gap-3'>
                <div className="flex flex-col gap-1">
                    <p className="text-sm">Kode Kelainan :</p>
                    <InputText 
                        value={kodePenyakit}
                        onChange={(e) => setKodePenyakit(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-sm">Nama Kelainan :</p>
                    <InputText 
                        value={namaPenyakit}
                        onChange={(e) => setNamaPenyakit(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-sm">Keterangan Kelainan :</p>
                    <InputText 
                        value={keteranganPenyakit}
                        onChange={(e) => setKeteranganPenyakit(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-sm">Solusi :</p>
                    <InputText 
                        value={solusi}
                        onChange={(e) => setSolusi(e.target.value)}
                    />
                </div>
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
