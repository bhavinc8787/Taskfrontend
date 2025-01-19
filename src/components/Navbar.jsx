import React, { useContext, useState } from 'react';
import { FaRegUser } from "react-icons/fa";
import { TfiMenuAlt } from "react-icons/tfi";
import { NavLink } from 'react-router-dom';
import { IoIosArrowDropdown } from "react-icons/io";
import { TaskContext } from '../context/TaskContext';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const { navigate, token, setToken } = useContext(TaskContext);
    const logout = () => {
        navigate('/login');
        localStorage.removeItem('token');
        setToken('');
        setCartItems({});
    };

    return (
        <div className='flex items-center justify-between py-5 px-6 font-medium shadow-md'>
            
            <h2 className="text-3xl font-semibold text-center text-blue-700 ml-4">
                Task Management App
            </h2>

            <ul className='hidden sm:flex gap-5 text-sm text-gray-700 ml-6'>
                <NavLink to='/' className='flex flex-col items-center gap-1'>
                    <p>HOME</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/about' className='flex flex-col items-center gap-1'>
                    <p>ABOUT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
            </ul>

            <div className='flex items-center gap-6'>
               
                <div className='group relative mr-4'>
                    <FaRegUser
                        className="w-5 h-5 cursor-pointer"
                        onClick={() => (token ? null : navigate('/login'))}
                    />
                    {token && 
                    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                        <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-blue-700 rounded'>
                            <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                        </div>
                    </div>}
                </div> 

                <TfiMenuAlt
                    className="w-5 h-5 cursor-pointer sm:hidden"
                    onClick={() => setVisible(true)}
                />
            </div>

            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <IoIosArrowDropdown className="h-4 w-4 rotate-180 cursor-pointer" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
