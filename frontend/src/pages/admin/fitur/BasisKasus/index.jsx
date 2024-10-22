import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Link } from 'react-router-dom';

export default function BasisKasus() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const MySwal = withReactContent(Swal);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/basisKasus`);
            setData(response.data);
        } catch (err) {
            alert("Error fetching data");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const btnDeleteClick = async (kd_penyakit) => {
        const fetchDelete = async () => {
            try {
                const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/basisKasus/${kd_penyakit}`);
                if (response.status === 200) {
                    fetchData(); 
                }
            } catch (err) {
                MySwal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to delete data',
                });
            }
        };

        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "Apakah Yakin Untuk Menghapus Basis Kasus",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        });

        if (result.isConfirmed) {
            fetchDelete()
        }
    };

    const handleEditClick = (id) => {
        console.log(`Edit item with ID: ${id}`);
    };

    // Filter data based on search term
    const filteredData = data.filter(row =>
        row.penyakit.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='flex flex-col w-full h-max gap-5'>
            <div className='flex flex-col ml-6'>
                <p className='font-semibold text-lg'>Basis Kasus</p>
                <p className='text-xs'>Data Basis Kasus</p>
            </div>
            <div className='ml-6 mr-6 h-max'>
                <div className='flex items-center justify-between mb-3'>
                    <input
                        type="text"
                        placeholder="Cari Nama Penyakit"
                        className="h-8 w-52 border border-gray-300 rounded text-sm indent-3 focus:outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} 
                    />

                    <Link to={'/admin/basisKasus/tambah'}>
                        <div className='h-10 w-52 flex items-center justify-center text-primary hover:text-white bg-transparent hover:bg-primary gap-2 rounded cursor-pointer'>
                            <FontAwesomeIcon icon={faAdd} className='' />
                            <p className='text-sm'>Tambah Basis Kasus</p>
                        </div>
                    </Link>
                </div>
                <div className="relative overflow-x-auto">
                    <div className="table-container">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Penyakit</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gejala</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredData.map((row) => (
                                    <tr key={row.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.penyakit}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <ul className='list-disc ml-5'>
                                                {row.gejala.map((item, index) => (
                                                    <li key={index}>{item}</li>
                                                ))}
                                            </ul>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className='flex gap-2'>
                                                <button 
                                                    className='w-8 h-8 bg-green-500 hover:bg-green-400 rounded'
                                                    onClick={() => handleEditClick(row.id)}
                                                >
                                                    <FontAwesomeIcon icon={faPen} className='text-white' />
                                                </button>
                                                <button 
                                                    className='w-8 h-8 bg-red-500 hover:bg-red-400 rounded'
                                                    onClick={() => btnDeleteClick(row.kd_penyakit)}
                                                >
                                                    <FontAwesomeIcon icon={faTrash} className='text-white' />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
