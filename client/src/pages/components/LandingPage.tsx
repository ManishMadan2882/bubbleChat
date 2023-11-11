import Image from 'next/image'
import logo from '../assets/logo.png'
import img1 from '../assets/img1.svg'
import hamburger from '../assets/icons8-menu.svg'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import Link from 'next/link'
const inter = Inter({
  subsets: ['greek'],
  variable: '--font-inter',
  weight: "500"
})
const LandingPage: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen)
  }
  return (
    <div className={`image ` + `${inter.className}` + ` h-screen bg-gradient`}>
      <nav className="hidden m-4 bg-transparent p-5 rounded-full md:flex flex-row justify-between">
        <div
          className='bg-white inline px-2 rounded-full'
        >
          <Image
            className='inline' src={logo} width={'40'} height={'40'} alt={''}
          />Bubble</div>

        <div className='flex-row  justify-between'>
          <Link href={`#features`} scroll={true} className='mx-3 hover:border-b text-indigo-400 cursor-pointer border-indigo-800 hover:delay-200'>Features</Link>
          <Link href={'#gettingStarted'} className='mx-3 hover:border-b  text-indigo-400 cursor-pointer border-indigo-800 hover:delay-200'>Getting Started</Link>
          <span className='mx-3 hover:border-b  text-indigo-400 cursor-pointer border-indigo-800 hover:delay-200'>Pricing</span>
          <span className='mx-3 hover:border-b   text-indigo-400 cursor-pointer border-indigo-800 hover:delay-200'>About Us</span>

        </div>
        <div className='text-md'>
          <Link href='/login' className='bg-white text-black mx-3 p-2 rounded-full hover:bg-rose-900 shadow-xl hover:text-white'>Login</Link>
          <Link href='/signup' className='bg-white text-black mx-3 p-2 rounded-full hover:bg-rose-900 shadow-xl hover:text-white'>Sign up</Link>
        </div>
      </nav>
      <nav className='md:hidden p-4'>
        <div
          className='bg-white inlnie px-2 rounded-full'
        >
          <Image
            className='inline' src={logo} width={'40'} height={'40'} alt={''}
          />Bubble</div>
          {!isSidebarOpen &&  <button className='float-right' onClick={toggleSidebar}>
          
          <Image src={hamburger} className='bg-white rounded-full p-2' width={35} alt='sidebar' />
        </button>
          }
      </nav>
      {isSidebarOpen && 
      <aside className='md:hidden right-0 text-xl top-0 absolute z-10 shadow-xl'>
        <button onClick={toggleSidebar} className='p-4h w-full'>

          <Image
            className='bg-indigo-300 rounded-full p-2 float-right'
            width={35}
            alt='Sidebar'
            src={hamburger}
          />
        </button>
        <ul className=' hamburger  text-indigo-400'>
          <li className='p-2 mx-3 hover:border-b cursor-pointer border-indigo-800 hover:delay-200'>
            <button>Login</button>
          </li>
          <li className='p-2 mx-3 hover:border-b cursor-pointer border-indigo-800 hover:delay-200'>
            <button>Sign up</button>
          </li>
          <li className='p-2 mx-3 hover:border-b cursor-pointer border-indigo-800 hover:delay-200'>Features</li>
          <li className='p-2 mx-3 hover:border-b cursor-pointer border-indigo-800 hover:delay-200'>Getting Started</li>
          <li className='p-2 mx-3 hover:border-b cursor-pointer border-indigo-800 hover:delay-200'>Pricing</li>
          <li className='p-2 mx-3 hover:border-b cursor-pointer border-indigo-800 hover:delay-200'>About Us</li>

        </ul>
      </aside>}
      <div className='flex justify-center flex-wrap'>
        <h1 className='text-indigo-200 md:w-1/2 text-3xl leading-normal md:leading-relaxed md:text-5xl m-4 p-4'>
          Chat freely with Real time messaging in Bubble, get Started Today and connect easily with your peers
        </h1>
        <Image src={img1} width={500} alt='100' />
      </div>
      <div id='features' className='mt-4 text-center items-center justify-center w-full p-10'>
        <h1 className='text-5xl text-indigo-400 mb-20'>Highlights</h1>
        <div className='flex flex-col  justify-around lg:flex-row'>
          <div className='hamburger mt-4 p-6 '>
            <h1 className='text-3xl pb-2 text-indigo-400 font-mono font-extrabold'>Easy To Use</h1>
            <ul>
              <li className=' text-xl font-bold pt-2 pb-2 text-indigo-200'>Instant Communication</li>
              <li className='text-xl font-bold pt-2 pb-2 text-indigo-200'>Connect with Peers</li>
              <li className='text-xl font-bold pt-2 pb-2 text-indigo-200'>Intutive UI</li>
            </ul>
          </div>
          <div className='hamburger mt-4 p-5'>
          <h1 className='text-3xl pb-2 text-indigo-400 font-mono font-extrabold' >Versatile</h1>
            <ul>
              <li className='text-xl font-bold pt-2 pb-2 text-indigo-200'>One-One Chat</li>
              <li className='text-xl font-bold pt-2 pb-2 text-indigo-200' >Group Discussions</li>
              <li className='text-xl font-bold pt-2 pb-2 text-indigo-200' >Room Creations</li>
            </ul>
          </div>
          <div className='hamburger mt-4 p-5'>
          <h1 className='text-3xl pb-2 text-indigo-400 font-mono font-extrabold' >Feature Packed</h1>
            <ul>
              <li className='text-xl font-bold pt-2 pb-2 text-indigo-200' >Share Media</li>
              <li className='text-xl font-bold pt-2 pb-2 text-indigo-200' >Share Emojis</li>
              <li className='text-xl font-bold pt-2 pb-2 text-indigo-200' >Responsive UI</li>
            </ul>
          </div>
        </div>
      </div>
      <div id='gettingStarted'  className='mt-4 text-center items-center sm:flex-nowrap flex-wrap justify-center w-full p-10'>
        <h1 className='text-5xl text-indigo-400 mb-5'>Getting Started</h1>
        <div className='hamburger  p-5 max-w-full'>
          <p className='text-2xl text-indigo-300 mb-5 font-bold'>Start Using Bubble in Just Two Easy Steps.</p>
          <div className='flex flex-wrap flex-row justify-center'>

          <div className='flex rounded-lg w-full p-4 sm:w-auto flex-col items-center'>
          <h1 className='text-2xl text-red-800 font-bold mr-2'>Create a Room :</h1>
          <p className='text-xl text-indigo-200 font-medium pt-1 mb-2'>  Create Room. Share the ID</p>
          <button className='bg-white text-black mx-3 p-2 rounded-md hover:bg-rose-900 shadow-xl hover:text-white w-20'>Create</button>
          </div>

          <div className='flex w-full p-4 sm:w-auto flex-col items-center'>
          <h1 className='text-2xl text-red-800 font-bold mr-2'>Join a Room :</h1>
          <p className='text-xl text-indigo-200 font-medium pt-1 mb-2'> Have a Room ID Join Now !!! </p>
          <button className='bg-white text-black mx-3 p-2 rounded-md hover:bg-rose-900 shadow-xl hover:text-white w-20'>Join</button>
          </div>
          </div>

        </div>
      </div>

      <div id='pricing'  className='mt-4 text-center items-center justify-center w-full p-10'>
      <h1 className='text-5xl text-indigo-400 mb-5'>Pricing</h1>
      <div>
        <p className='text-2xl font-bold text-indigo-300 mt-10 mb-5'>Enjoy the Services with our free tier that covers it all..</p>
        <p className='text-indigo-300'>Be on lookout for Premium Services rolling out soon</p>
      </div>
      </div>
      <div id='about' className='bg-zinc-800 p-4 sm:p-20 flex-wrap flex flex-row justify-around' >
        <div className='border-r w-full border-indigo-400 sm:w-1/2 '>

      <span
          className='bg-white px-2 rounded-full p-4'
          >
          <Image
            className='inline' src={logo} width={'40'} height={'40'} alt={''}
            />Bubble</span>

            <h1 className='mt-5 mb-5 text-white'>Powered By Bright Minds</h1>
            <h1 className='text-white'>Made In India</h1>
            <h1 className='text-white'>© 2023 A & M LLC</h1>
        
      </div>

      <div className='w-full sm:w-1/2 flex flex-row justify-evenly'>
      <div className='p-4 sm:p-0'>
        <h1 className='text-2xl text-white mb-3'>Our Offices</h1>
        <h1 className='text-xl text-white mb-1 hover:border-b cursor-pointer border-indigo-800 hover:delay-200'>Bengaluru</h1>
        <h1 className='text-xl text-white mb-1 hover:border-b cursor-pointer border-indigo-800 hover:delay-200'>Mumbai</h1>
        <h1 className='text-xl text-white mb-1 hover:border-b cursor-pointer border-indigo-800 hover:delay-200'>Lucknow</h1>
      </div>

      <div className='p-4 sm:p-0'>
        <h1 className='text-2xl text-white mb-3 '>Quick Links</h1>
        <h1 className='text-xl text-white mb-1 hover:border-b cursor-pointer border-indigo-800 hover:delay-200'>Contact Us</h1>
        <h1 className='text-xl text-white mb-1 hover:border-b cursor-pointer border-indigo-800 hover:delay-200'>Business</h1>
        <h1 className='text-xl text-white mb-1 hover:border-b cursor-pointer border-indigo-800 hover:delay-200'>Careers</h1>
        <h1 className='text-xl text-white mb-1 hover:border-b cursor-pointer border-indigo-800 hover:delay-200'>Partnership</h1>
      </div>
      </div>

    </div>
    </div>);
}
export default LandingPage