import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import { FaChevronRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const ResponsiveMenu = ({ openNav, setOpenNav }) => {
    const {user} = useUser()
    return (
        <div className={`${openNav ? "left-0" : "-left-[100%]"} fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white px-8 pb-6 pt-16 text-black md:hidden rounded-r-xl shadow-md transition-all`}>
            <div>
                <div className='flex items-center justify-start gap-3'>
                    {
                        user ? <UserButton size={50} className="h-24 w-24 "/> : <FaUserCircle size={50} className='' />
                    }
                    
                    <div>
                        <h1 className=''>Hello, {user?.fullName}</h1>
                        <h1 className='text-sm text-slate-500'>Premium User</h1>
                    </div>
                </div>
                <nav className='mt-12'>
                    <ul className='flex flex-col gap-7 text-lg font-semibold '>
                        <Link to="/" onClick={()=>setOpenNav(false)}><li className='cursor-pointer'>Home</li></Link>
                        <Link to="/products" onClick={()=>setOpenNav(false)}><li className='cursor-pointer'>Products</li></Link>
                        <Link to="/about" onClick={()=>setOpenNav(false)}><li className='cursor-pointer' >About</li></Link>
                        <Link to="/contact" onClick={()=>setOpenNav(false)}><li className='cursor-pointer' >Contact</li></Link>
                        {/* <Link href="#project"><li className='cursor-pointer' >Projects</li></Link> */}
                        <SignedOut>
                            <SignInButton className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer" />
                        </SignedOut>
                        <SignedIn>
                            {/* <UserButton /> */}
                        </SignedIn>
                    </ul>
                </nav>
            </div>
            <div className=''>
                <h1>
                    Made with ❤️ by Rohit
                </h1>
            </div>
        </div>
    )
}

export default ResponsiveMenu