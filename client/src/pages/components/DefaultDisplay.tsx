import React from 'react'
import Image from 'next/image'
import defaultImg from '../assets/img1.svg'
export const DefaultDisplay = () => {
    return (
        <div className='overflow-scroll  backdrop:blur-lg bg-white/10 col-span-5 text-white sm:col-span-2'>
            <div className='w-full flex justify-center'>
                
                <Image src={defaultImg} width={400} height={400} alt='Welcome' />
            
            </div>
        </div>
    )
}
