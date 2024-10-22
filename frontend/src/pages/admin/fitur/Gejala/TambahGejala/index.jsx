import { useState } from "react"
import InputText from "../../../../../components/layout/Input/InputText"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

export default function TambahGejala() {
    const [kodeGejala, setKodeGejala] = useState('')
    const [namaGejala, setNamaGejala] = useState('')
    const [question, setQuestion] = useState('')
    const [b1, setB1] = useState('')
    const [b2, setB2] = useState('')
    const [b3, setB3] = useState('')
    const [b4, setB4] = useState('')
    const [b5, setB5] = useState('')
    const navigate = useNavigate()

    const fetchAdd = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/gejala`, {
                kd_gejala : kodeGejala,
                nm_gejala : namaGejala,
                question : question,
                b1 : b1,
                b2 : b2,
                b3 : b3,
                b4 : b4,
                b5 : b5,
            })
            if(response.status === 200) {
                navigate('/admin/gejala')
            } else {
                alert('test')
            }
        } catch (err) {

        }
    }

    const btnClick = () => {
        fetchAdd()
    } 

    return (
        <div className='flex flex-col w-full h-max gap-5'>
            <div className='flex flex-col ml-6'>
                <p className='font-semibold text-lg'>Gejala</p>
                <p className='text-xs'>Tambah Data Gejala</p>
            </div>
            <div className='ml-6 mr-6 h-max flex flex-col gap-4'>
                <div className="flex flex-col gap-1">
                    <p className="text-sm">Kode Gejala :</p>
                    <InputText 
                        value={kodeGejala}
                        onChange={(e) => setKodeGejala(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-sm">Nama Gejala :</p>
                    <InputText 
                        value={namaGejala}
                        onChange={(e) => setNamaGejala(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-sm">Pertanyaan Gejala :</p>
                    <InputText 
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-sm">Bobot Gejala pada Me-labelin anak (julukan) :</p>
                    <InputText 
                        value={b1}
                        onChange={(e) => setB1(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-sm">Bobot Gejala pada siswa tidak dianggap / ditolak :</p>
                    <InputText 
                        value={b2}
                        onChange={(e) => setB2(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-sm">Bobot Gejala pada Mengancam anak / siswa diancam (Merasa Terancam) :</p>
                    <InputText 
                        value={b3}
                        onChange={(e) => setB3(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-sm">Bobot Gejala pada Menyalahkan anak :</p>
                    <InputText 
                        value={b4}
                        onChange={(e) => setB4(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-sm">Bobot Gejala pada Depresi :</p>
                    <InputText 
                        value={b5}
                        onChange={(e) => setB5(e.target.value)}
                    />
                </div>
                <div className='w-full h-10 flex  mt-5'>
                    <div className="w-10/12 max-w-96 h-10 grid grid-cols-2 gap-3">
                        <button 
                            onClick={btnClick}
                            className="bg-blue-500 hover:bg-blue-400 text-white rounded w-full h-full">
                            Submit
                        </button>
                        <Link to={'/admin/gejala'}>
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
