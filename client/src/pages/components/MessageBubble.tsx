import React from 'react'
import moment from 'moment'
import userContext from '@/context/userContext'
import { useContext } from 'react'
interface MsgProps {
    time: string,
    sender: string,
    msg: string
}

const MessageBubble: React.FC<MsgProps> = ({ sender, time, msg }): JSX.Element => {
    const timeFormatted = moment(time).format('hh:mm A')
    const user = useContext(userContext)
    return (
        <div className=' mt-7 block text-sm'>
            <div
                className={`relative max-w-[66%] p-2  mx-2 inline-block rounded-md text-black 
                ${(user?.userId === sender) ? 'float-right bg-green-200' : 'float-left bg-blue-200'}`}>
                <p className='inline mr-2'>{msg}</p>
                <span className='text-gray-500 text-[10px]'>{timeFormatted}</span>
            </div>

            <br />
        </div>
    )
}

export default MessageBubble