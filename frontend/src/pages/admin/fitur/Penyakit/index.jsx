import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import DataTable from 'react-data-table-component';

export default function PenyakitAdmin() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const MySwal = withReactContent(Swal);
    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
        },
    });

    const fetchUser = async () => {
        try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/penyakit`);
        setData(response.data);
        setFilteredData(response.data);
        } catch (err) {
        console.log(err);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        const result = data.filter(item =>
        item.nm_penyakit.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredData(result);
    }, [search, data]);

    const btnDeleteClick = (kd_penyakit) => {
        const fetchDelete = async () => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/penyakit/${kd_penyakit}`);
            if (response.status === 200) {
                fetchUser(); // Refresh data after deletion
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
    };

    const columns = [
        {
        name: 'Kode Kelainan',
        selector: (row) => row.kd_penyakit,
        sortable: true,
        },
        {
        name: 'Nama Kelainan',
        selector: (row) => row.nm_penyakit,
        sortable: true,
        },
        {
        name: 'Keterangan Kelainan',
        selector: (row) => row.ket,
        sortable: true,
        },
        {
        name: 'Solusi',
        selector: (row) => row.solusi,
        sortable: true,
        },
        {
        name: 'Aksi',
        cell: (row) => (
            <div className='flex gap-2'>
            <Link to={`/admin/penyakit/update/${row.kd_penyakit}`}>
                <button className='w-8 h-8 bg-green-500 hover:bg-green-400 rounded'>
                <FontAwesomeIcon icon={faPen} className='text-white' />
                </button>
            </Link>
            <button 
                className='w-8 h-8 bg-red-500 hover:bg-red-400 rounded'
                onClick={() => btnDeleteClick(row.kd_penyakit)}>
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
                <p className='font-semibold text-lg'>Kelainan</p>
                <p className='text-xs'>Data Kelainan</p>
            </div>
            <div className='ml-6 mr-6 h-max'>
                <div className='flex items-center justify-between mb-3'>
                    <input
                        type="text"
                        placeholder="Cari Nama..."
                        className="h-8 w-52 border border-gray-300 rounded text-sm indent-3  focus:outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Link to={'/admin/penyakit/tambah'}>
                        <div className='h-10 w-52 flex items-center justify-center text-primary hover:text-white bg-transparent hover:bg-primary gap-2 rounded cursor-pointer'>
                        <FontAwesomeIcon icon={faAdd} className='' />
                        <p className='text-sm'>Tambah Kelainan</p>
                        </div>
                    </Link>
                </div>
                <div className="relative overflow-x-auto">
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
