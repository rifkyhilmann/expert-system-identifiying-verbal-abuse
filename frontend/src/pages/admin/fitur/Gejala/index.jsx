import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import DataTable from 'react-data-table-component';

export default function Gejala() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const MySwal = withReactContent(Swal);

    const fetchUser = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/gejala`);
            setData(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        // Filter data based on search input
        const result = data.filter(item =>
            item.nm_gejala.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredData(result);
    }, [search, data]);

    const btnDeleteClick = (id_gejala) => {
        const fetchDelete = async () => {
            try {
                const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/gejala/${id_gejala}`);
                if (response.status === 200) {
                    fetchUser(); 
                    MySwal.fire({
                        icon: 'succes',
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
    };

    const columns = [
        {
            name: 'ID',
            selector: (row) => row.id_gejala,
            sortable: true,
        },
        {
            name: 'Kode Gejala',
            selector: (row) => row.kd_gejala,
            sortable: true,
        },
        {
            name: 'Nama Gejala',
            selector: (row) => row.nm_gejala,
            sortable: true,
        },
        {
            name: 'Question',
            selector: (row) => row.question,
            sortable: true,
        },
        {
            name: 'B1',
            selector: (row) => row.b1,
            sortable: true,
        },
        {
            name: 'B2',
            selector: (row) => row.b2,
            sortable: true,
        },
        {
            name: 'B3',
            selector: (row) => row.b3,
            sortable: true,
        },
        {
            name: 'B4',
            selector: (row) => row.b4,
            sortable: true,
        },
        {
            name: 'B5',
            selector: (row) => row.b5,
            sortable: true,
        },
        {
            name: 'Aksi',
            cell: (row) => (
                <div className='flex gap-2'>
                    <Link to={`/admin/gejala/update/${row.id_gejala}`}>
                        <button className='w-8 h-8 bg-green-500 hover:bg-green-400 rounded'>
                            <FontAwesomeIcon icon={faPen} className='text-white' />
                        </button>
                    </Link>
                    <button 
                        className='w-8 h-8 bg-red-500 hover:bg-red-400 rounded'
                        onClick={() => btnDeleteClick(row.id_gejala)}
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
                <p className='font-semibold text-lg'>Gejala</p>
                <p className='text-xs'>Data Gejala</p>
            </div>
            <div className='ml-6 mr-6 h-max'>
                <div className='flex items-center justify-between mb-3'>
                    <input
                        type="text"
                        placeholder="Cari Nama..."
                        className="h-8 w-52 border border-gray-300 rounded text-sm indent-3 focus:outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Link to={'/admin/gejala/tambah'}>
                        <div className='h-10 w-52 flex items-center justify-center text-primary hover:text-white bg-transparent hover:bg-primary gap-2 rounded cursor-pointer'>
                            <FontAwesomeIcon icon={faAdd} />
                            <p className='text-sm'>Tambah Gejala</p>
                        </div>
                    </Link>
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
