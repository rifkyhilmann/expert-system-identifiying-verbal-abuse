import ReactLoading from 'react-loading';

const ButtonSubmit = ({title, onClick, isLoading}) => {
    return (
        <div 
            onClick={onClick}
            className='w-full h-10 rounded bg-blue-400 flex items-center justify-center cursor-pointer hover:bg-blue-300 mt-5'>
            {isLoading ? (
                <ReactLoading type={'spin'} color={'#ffffff'} height={20} width={20} />
            ) : (
                <p className='text-white font-bold'>{title}</p>
            )}    
        </div>
    )
}

export default ButtonSubmit