import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function DataSiwa() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const MySwal = withReactContent(Swal);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/siswa`);
            setData(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const result = data.filter(item =>
            item.nm_lengkap.toLowerCase().includes(search.toLowerCase()) 
        );
        setFilteredData(result);
    }, [search, data]);

    const btnDeleteClick = (id_user) => {
        const fetchDelete = async () => {
            try {
                const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/siswa/${id_user}`);
                if (response.status === 200) {
                    fetchData(); 
                    MySwal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Data successfully deleted',
                    });
                }
            } catch (err) {
                MySwal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to delete data',
                });
            }
        };
        
        fetchDelete();
    };

    const columns = [
        {
            name: 'ID',
            selector: (row) => row.id_user,
            sortable: true,
        },
        {
            name: 'Username',
            selector: (row) => row.username, // Adjust field name
            sortable: true,
        },
        {
            name: 'Password',
            selector: (row) => row.password, // Adjust field name
            sortable: true,
        },
        {
            name: 'Nama Lengkap',
            selector: (row) => row.nm_lengkap, // Adjust field name
            sortable: true,
        },
        {
            name: 'Jenis Kelamin',
            selector: (row) => row.jns_kelamin, // Adjust field name
            sortable: true,
        },
        {
            name: 'Alamat',
            selector: (row) => row.alamat, // Adjust field name
            sortable: true,
        },
        {
            name: 'No Hp',
            selector: (row) => row.no_hp, // Adjust field name
            sortable: true,
        },
        {
            name: 'Aksi',
            cell: (row) => (
                <div className='flex gap-2'>
                    <Link to={`/admin/data-siswa/update/${row.id_user}`}>
                        <button className='w-8 h-8 bg-green-500 hover:bg-green-400 rounded'>
                            <FontAwesomeIcon icon={faPen} className='text-white' />
                        </button>
                    </Link>
                    <button 
                        className='w-8 h-8 bg-red-500 hover:bg-red-400 rounded'
                        onClick={() => btnDeleteClick(row.id_user)}
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
                <p className='font-semibold text-lg'>Master Data</p>
                <p className='text-xs'>Data Siswa</p>
            </div>
            <div className='ml-6 mr-6 h-max'>
                <div className='flex items-center justify-between mb-3'>
                    <input
                        type="text"
                        placeholder="Search Name..."
                        className="h-8 w-52 border border-gray-300 rounded text-sm indent-3 focus:outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Link to={'/admin/data-siswa/tambah'}>
                        <div className='h-10 w-52 flex items-center justify-center text-primary hover:text-white bg-transparent hover:bg-primary gap-2 rounded cursor-pointer'>
                            <FontAwesomeIcon icon={faAdd} />
                            <p className='text-sm'>Tambah Siswa</p>
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
