import axios from 'axios'
import { useEffect, useState } from 'react'

export default function KonsultasiSiswa() {
    const [data, setData] = useState([])
    const [selectedGejala, setSelectedGejala] = useState([])

    const fetchData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/gejala`)
            setData(response.data)
        } catch (err) {
            alert("Error Fetching Data")
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleChange = (id_gejala) => {
        setSelectedGejala(prevSelectedGejala => {
            if (prevSelectedGejala.includes(id_gejala)) {
                return prevSelectedGejala.filter(id => id !== id_gejala)
            } else {
                return [...prevSelectedGejala, id_gejala]
            }
        })
    }

    console.log(selectedGejala)

    return (
        <div className='flex flex-col w-full h-20 gap-5 '>
            <div className='flex flex-col ml-6'>
                <p className='font-semibold text-lg'>Konsultasi</p>
                <p className='text-xs'>Home</p>
            </div>
            <div className='ml-6 mr-6 h-max flex flex-col gap-3'>
                <div className='w-full h-10 flex items-center justify-center'>
                    <p className='text-primary text-sm sm:text-xl font-semibold'>
                        Silahkan Jawab Pertanyaan berikut ini untuk memeriksa gejala yang anda rasakan
                    </p>
                </div>
                {data.map((items, index) => (
                    <div className='flex items-center gap-2' key={index}>
                        <div className='flex items-center h-10 w-10 justify-center'>
                            <input 
                                type="checkbox" 
                                onChange={() => handleChange(items.id_gejala)}
                            />
                        </div>
                        <p className='text-lg'>{items.nm_gejala}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
