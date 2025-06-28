import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import { BsCart2 } from "react-icons/bs";
import useCart from '../Hooks/useCart';

const Navber = () => {
  const { user, logOut } = useAuth()
  const [cart] = useCart()

  const handleLogOut = () => {
    logOut()
      .then(() => { })
      .catch(error => error.message)
  }
  return (
    <div>
      <div className="navbar fixed z-10 max-w-screen-xl bg-opacity-40 bg-black text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-orange-400 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li><Link to={'/'}>Home</Link></li>
              <li><Link to={'/menu'}>Menu</Link></li>
              <li><Link to={'/order/salad'}>Order Food</Link></li>

              <li> <Link to={'/dashboard/cart'}>
              <button  className="btn bg-none">
              <BsCart2 /><div className="badge badge-sm badge-secondary">+{cart.length}</div>
            </button>
              </Link></li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">Food Fast</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><Link to={'/'}>Home</Link></li>
            <li><Link to={'/menu'}>Menu</Link></li>
            <li><Link to={'/order/salad'}>Order Food</Link></li>
            <li>
              <Link to={'/dashboard/cart'}>
              <button  className="btn bg-none">
              <BsCart2 /><div className="badge badge-sm badge-secondary">+{cart.length}</div>
            </button>
              </Link>
            </li>

          </ul>
        </div>
        <div className="navbar-end">
          {user ?

            <Link onClick={handleLogOut} className="btn">Logout</Link> :
            <Link to={'/login'}>Login</Link>}
        </div>
      </div>
    </div>
  );
};

export default Navber;