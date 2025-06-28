import React from 'react';
import { BsCart2, } from 'react-icons/bs';
import { IoHomeOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { NavLink, Outlet } from 'react-router-dom';
import { MdOutlineReviews } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import { MdRestaurantMenu } from "react-icons/md";



const Dashboard = () => {
    return (
        <div className="h-full flex p-3 space-y-2 w-60dark:text-gray-800">

            <div className="divide-y min-h-full dark:divide-gray-300  bg-orange-400 ">
                <div className="flex items-center p-2 space-x-4">
                    <img src="https://source.unsplash.com/100x100/?portrait" alt="" className="w-12 h-12 rounded-full dark:bg-gray-500" />
                    <div>
                        <h2 className="text-lg font-semibold">Leroy Jenkins</h2>
                        <span className="flex items-center space-x-1">
                            <a rel="noopener noreferrer" href="#" className="text-xs hover:underline dark:text-gray-600">View profile</a>
                        </span>
                    </div>
                </div>
                <ul className="pt-2 pb-4 space-y-1 text-sm">
                    <li className="dark:bg-gray-100 dark:text-gray-900">
                        <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-600">
                                <path d="M68.983,382.642l171.35,98.928a32.082,32.082,0,0,0,32,0l171.352-98.929a32.093,32.093,0,0,0,16-27.713V157.071a32.092,32.092,0,0,0-16-27.713L272.334,30.429a32.086,32.086,0,0,0-32,0L68.983,129.358a32.09,32.09,0,0,0-16,27.713V354.929A32.09,32.09,0,0,0,68.983,382.642ZM272.333,67.38l155.351,89.691V334.449L272.333,246.642ZM256.282,274.327l157.155,88.828-157.1,90.7L99.179,363.125ZM84.983,157.071,240.333,67.38v179.2L84.983,334.39Z"></path>
                            </svg>
                            <span>Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/userHome'} className="flex items-center p-2 space-x-3 rounded-md">

                            <IoHomeOutline className="w-5 h-5 fill-current dark:text-gray-600" />  <span>User Home</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/reservation'} className="flex items-center p-2 space-x-3 rounded-md">

                            <FaRegCalendarAlt className="w-5 h-5 fill-current dark:text-gray-600" />  <span>Reservation</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to={'/dashboard/cart'} className="flex items-center p-2 space-x-3 rounded-md">
                            <BsCart2 className="w-5 h-5 fill-current dark:text-gray-600" />  <span>My Cart</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/review'} className="flex items-center p-2 space-x-3 rounded-md">

                            <MdOutlineReviews className="w-5 h-5 fill-current dark:text-gray-600" />  <span>Add Review</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/bookings'} className="flex items-center p-2 space-x-3 rounded-md">

                            <TbBrandBooking className="w-5 h-5 fill-current dark:text-gray-600" />  <span>My Booking</span>
                        </NavLink>
                    </li>

                </ul>
                <ul className="pt-4 pb-2 space-y-1 text-sm">
                    <NavLink to={'/'} className="flex items-center p-2 space-x-3 rounded-md">

                        <IoHomeOutline className="w-5 h-5 fill-current dark:text-gray-600" />  <span>Home</span>
                    </NavLink>
                    <li>
                        <li>
                            <NavLink to={'/order/salad'} className="flex items-center p-2 space-x-3 rounded-md">

                                <MdRestaurantMenu className="w-5 h-5 fill-current dark:text-gray-600" />  <span>Menu</span>
                            </NavLink>
                        </li>
                        <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-600">
                                <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z"></path>
                                <rect width="32" height="64" x="256" y="232"></rect>
                            </svg>
                            <span>Logout</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;


