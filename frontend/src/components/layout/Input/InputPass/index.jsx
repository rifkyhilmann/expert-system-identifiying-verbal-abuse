import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'

export default function InputPass({text, value, onChange}) {
    const [isAvailable, setIsAvailable] = useState(false)

    return (
        <div className='h-10 w-full flex items-center bg-white rounded'>
            <input 
                type={isAvailable ? 'text' : 'password'}
                value={value}
                onChange={onChange}
                placeholder={text}
                className='w-11/12 h-10 text-sm indent-3 focus:outline-none rounded bg-transparent' 
            />
            <FontAwesomeIcon 
                icon={isAvailable ? faEyeSlash : faEye}   
                className='cursor-pointer' 
                onClick={() => setIsAvailable(!isAvailable)}
            />
        </div>
    )
}
