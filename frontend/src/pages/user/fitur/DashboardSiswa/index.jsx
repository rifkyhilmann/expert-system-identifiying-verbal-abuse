import { useUser } from "../../../../providers/userContext"

export default function DashboardSiswa() {
    const {username} = useUser()

    return (
        <div className='flex flex-col w-full h-20 gap-5 '>
            <div className='flex flex-col ml-6'>
              <p className='font-semibold text-lg'>Dashboard</p>
              <p className='text-xs'>Home</p>
            </div>
            <div className='ml-6 mr-6 h-max'>
                <p className="text-lg">Selamat Datang {username ? username : ''}!</p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo soluta necessitatibus, nulla quasi magnam recusandae ipsa aspernatur est esse hic, ducimus aperiam ipsam! Nesciunt praesentium, iure explicabo perspiciatis ab libero.
                </p>
            </div>
        </div>
    )
}
