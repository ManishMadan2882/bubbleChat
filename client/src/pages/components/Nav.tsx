import Image from "next/image"
import logo from '../assets/logo.png'
import SearchIcon from '@mui/icons-material/Search';
import { ChangeEvent, useState } from "react";
import SearchUsers from "./SearchUsers";
import userContext from "@/context/userContext";
import { useContext } from "react";
const Nav = () => {
  const currentUser = useContext(userContext)
    return (
        <div className="text-white h-[10vh] bg-black p-2 flex justify-between">
            <div
          className='bg-white text-black inline px-2 rounded-full'
        >
          <Image
            className='inline' src={logo} width={'40'} height={'40'} alt={''}
          /></div>
            

            <div className="float-right px-2 rounded-full">
                <Image className="inline rounded-full "
                    src={currentUser?.imgUrl as string} alt="manish"
                    width={50} height={40} />
                <span className="p-2  md:visible">
                    {currentUser?.username}
                </span>
            </div>
        </div>
    )
}

export default Nav