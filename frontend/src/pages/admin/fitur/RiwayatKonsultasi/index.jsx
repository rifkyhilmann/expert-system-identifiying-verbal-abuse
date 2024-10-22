import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import DataTable from 'react-data-table-component';

export default function RiwayatKonsultasi() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const MySwal = withReactContent(Swal);

    const fetchUser = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/konsultasi`);
            setData(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        const result = data.filter(item =>
            item.nama_siswa.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredData(result);
    }, [search, data]);

    const btnDeleteClick = (id_konsultasi) => {
        const fetchDelete = async () => {
            try {
                const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/konsultasi/${id_konsultasi}`);
                if (response.status === 200) {
                    fetchUser(); 
                    MySwal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Berhasil Hapus Data',
                    });
                }
            } catch (err) {
                MySwal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Hapus Data Gagal',
                });
            }
        };
        
        fetchDelete();
        alert(id_konsultasi)
    };

    const columns = [
        {
            name: 'Id',
            selector: (row) => row.id_konsultasi,
            sortable: true,
        },
        {
            name: 'Nama Siswa',
            selector: (row) => row.nama_siswa,
            sortable: true,
        },
        {
            name: 'Tanggal Konsultasi',
            selector: (row) => row.tgl_konsultasi,
            sortable: true,
        },
        {
            name: 'Nilai',
            selector: (row) => row.nilai,
            sortable: true,
        },
        {
            name: 'Aksi',
            cell: (row) => (
                <div className='flex gap-2'>
                   
                    <button 
                        className='w-8 h-8 bg-red-500 hover:bg-red-400 rounded'
                        onClick={() => btnDeleteClick(row.id_konsultasi)}
                    >
                        <FontAwesomeIcon icon={faTrash} className='text-white' />
                    </button>
                </div>
            ),
        },
    ];

    const customStyles = {
        header: {
            style: {
                minHeight: '56px',
                backgroundColor: 'transparent',
                color: '#333',
            },
        },
        headRow: {
            style: {
                backgroundColor: 'transparent',
                borderBottomWidth: '1px',
                borderBottomColor: '#ccc',
            },
        },
        headCells: {
            style: {
                color: '#000',
                fontWeight: 'bold',
            },
        },
        rows: {
            style: {
                minHeight: '72px',
                backgroundColor: 'transparent',
                '&:not(:last-of-type)': {
                    borderBottomWidth: '1px',
                    borderBottomColor: '#ccc',
                },
            },
        },
        cells: {
            style: {
                color: '#333',
            },
        },
    };

    return (
        <div className='flex flex-col w-full h-max gap-5'>
            <div className='flex flex-col ml-6'>
                <p className='font-semibold text-lg'>Riwayat Konsultasi</p>
                <p className='text-xs'>Data Riwayat Konsultasi</p>
            </div>
            <div className='ml-6 mr-6 h-max'>
                <div className='grid grid-cols-2 justify-between w-full mb-5'>
                    <input
                        type="text"
                        placeholder="Cari Nama Siswa..."
                        className="h-8 w-52 border border-gray-300 rounded text-sm indent-3 focus:outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className='flex items-center justify-end '>
                        <input
                            type="date"
                            className="h-8 w-52 border border-gray-300 rounded text-sm indent-3 focus:outline-none"
                            
                        />
                    </div>
                </div>
                <div className="relative overflow-x-auto max-h-[calc(100vh-200px)]">
                    <DataTable
                        columns={columns}
                        data={filteredData}
                        pagination
                        highlightOnHover
                        pointerOnHover
                        customStyles={customStyles}
                    />
                </div>
            </div>
        </div>
    );
}
