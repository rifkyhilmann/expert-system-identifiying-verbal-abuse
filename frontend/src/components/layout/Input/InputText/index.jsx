
export default function InputText({text, value, onChange}) {
    return (
        <input 
            type="text"
            value={value}
            onChange={onChange}
            placeholder={text}
            className='w-full h-10 text-sm indent-3 focus:outline-none rounded' 
        />
    )
}
