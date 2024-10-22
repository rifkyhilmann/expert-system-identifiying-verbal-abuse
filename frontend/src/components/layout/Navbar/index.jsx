import { faBars, faBarsStaggered } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Navbar({isActive, setIsActive}) {
    return (
        <div className='w-full h-12 bg-white grid grid-cols-2'>
            <div className='flex items-center'>
                <FontAwesomeIcon 
                    icon={isActive ? faBars : faBarsStaggered} 
                    className="text-xl ml-3 cursor-pointer z-50 "
                    onClick={() => setIsActive(!isActive)}
                />
            </div>
        </div>
    )
}
