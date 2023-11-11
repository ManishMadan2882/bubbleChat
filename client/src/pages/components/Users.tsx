import Image from 'next/image'
import { MoonLoader } from 'react-spinners'
import React, { ChangeEvent, useEffect, useState } from 'react'
import Search from '@mui/icons-material/Search'
import { searchUsers, loadConversations } from '../api/loadUsers'
import { blueGrey } from '@mui/material/colors'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useCookies } from 'react-cookie'
import authContext from '@/context/userContext'
import { useContext } from 'react'
import Sidebar from './Sidebar'
import { IsoSharp } from '@mui/icons-material'
//@ts-ignore
const Users = ({ currentUser, setCurrentUser }) => {
    const [cookies, setCookie, removeCookie] = useCookies(['session-token'])
    const auth = useContext(authContext)
    const token = cookies['session-token']
    const [list, setList] = useState<any>()
    const [chats, setChats] = useState<any>()
    const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [isSearching, setIsSearching] = useState<boolean>(false)
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [searchLoad, setSearchLoad] = useState<boolean>(false)
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => setSearchQuery(event.target.value);

    const activeSearch = () => {
        setIsSearching(true)
    }
    const deactiveSearch = () => {
        setIsSearching(false);
        setSearchLoad(false);
    }
    useEffect(() => {
        setSearchLoad(true);
        if (searchQuery.length > 0)
            searchUsers(searchQuery).then((data) => {
                setList(data)
                setSearchLoad(false)
            })
        else deactiveSearch();
    }, [searchQuery])
    useEffect(() => {
        loadConversations(token).then((data) => {
            setChats(data)
            setSearchLoad(false)
        })
    }, [])

    return (
        <div className={`m-0 `}>
            <aside className={`h-[89vh]  overflow-scroll transition-all backdrop:blur-lg bg-black/20 p-2 rounded-lg`}>
            <button onClick={()=>setSidebarOpen(!isSidebarOpen)}>
            <KeyboardArrowRightIcon  fontSize='large' sx={{ color: blueGrey[200] }} />
            </button>
                {isSidebarOpen &&
                <div>
                    <label>
                        <Search sx={{ color: blueGrey[200] }} />
                    </label>
                    <input
                        id='search'
                        onFocus={activeSearch}
                        value={searchQuery}
                        onChange={handleSearchChange}
                        type='text'
                        placeholder={`Search bubble`}
                        className='mx-2 rounded-full border-2 sm:w-auto pl-4 pr-8 py-2 w-48 border-blue-500 text-blue-500'
                    />
                    
                </div>}
                {(searchLoad || list?.length === 0) ?
                    <div className='flex justify-center'>

                        {list?.length === 0 && !searchLoad &&
                            <span className='text-gray-500 mt-10'>No results</span>}{
                            searchLoad && <MoonLoader color='white' loading={searchLoad} cssOverride={{
                                marginTop: '20px'
                            }} />}
                    </div>
                    : (
                        isSearching ? list?.map((element: any, key: number) => {
                            return (
                                <div onClick={() => setCurrentUser(element._id)} className={"p-2 mt-2 text-white rounded-md blur-none  flex justify-start h-100 bg-gradient-to-r from-slate-800 to-gray-900"}>
                                    <Image className="inline rounded-full" src={element.profilePicture} width={50} height={50} alt="image" />
                                    <div className="md:grid ml-3 grid-cols-1">
                                        <span className="">
                                            {element.username}
                                        </span>

                                    </div>

                                </div>
                            )
                        })
                            : (chats?.map((elem: any, key: number) => {
                                const member = (elem.members?.filter((item: any) => item._id != auth?.userId))
                                console.log("elem", elem)
                                const latestMsg = elem.messages[0].text
                                return (
                                    <div
                                        onClick={() => setCurrentUser(member[0]._id)}
                                        className={`p-2  mt-2 text-white rounded-md blur-none  flex justify-start h-100 bg-gray-800 hover:bg-slate-700 border border-black ${(member[0]._id == currentUser) ? 'bg-slate-900 border-white' : 'bg-gray-800'}`}>
                                        <Image className="inline rounded-full" src={member[0].profilePicture} width={50} height={50} alt="image" />
                                        <div className={` ml-3  ${!isSidebarOpen ? 'hidden' : 'grid grid-cols-1'} `}>
                                            <span className="">
                                                {member[0].username}
                                            </span>
                                            <span className="text-xs overflow-hidden h-4">
                                                {latestMsg}
                                            </span>
                                        </div>

                                    </div>)
                            })

                            )
                    )
                }
                {(!isSearching && chats?.length == 0) &&
                    <h1 className='text-gray-200 text-center mt-8 '>
                        Find users and start a new Conversation
                    </h1>}
            </aside>

        </div>
    )
}

export default Users