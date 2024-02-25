import { TiThMenu } from "react-icons/ti"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { AiFillCloseCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { FaRegUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { FiLogIn } from "react-icons/fi";
import { FaUserPlus } from "react-icons/fa6";
import { topCities } from "../Constants/cityName";
import { useState } from "react";
import { MdAddIcCall } from "react-icons/md";
function Navbar() {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [cityValue, setCityValue] = useState('');

    const handelSubmitValue = (e) => {
        setCityValue(e.target.value);
        navigate(`/city/${e.target.value.split(" ").join("-").toLowerCase()}`);
    }

    const hideDrawer = () => {
        const element = document.getElementsByClassName('drawer-toggle');
        element[0].checked = false;
    }

    const { data, role } = useSelector((state) => state.auth);

    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn)
    const handelLogout = async (e) => {
        const res = await dispatch(logout());
        if (res?.payload?.success) {
            window.location.reload();
            navigate('/');
        };
    }

    return (
        <div className="navbar bg-primary z-20 sticky top-0 left-0 right-0">
            <div className="flex-1">

                <div>
                    <div className="drawer flex items-center z-20">
                        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            {/* Page content here */}
                            <label htmlFor="my-drawer" className=" btn  h-auto text-white text-3xl bg-transparent border-0 hover:bg-transparent  drawer-button"><TiThMenu /></label>
                        </div>
                        <div className="drawer-side">
                            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu p-4 w-[270px] min-h-full bg-base-200 text-base-content ">
                                <div className="flex items-center justify-center border-b-2 pb-3 border-black">
                                    <Link to="/" className=" text-3xl font-semibold">Homes<span className=" text-primary">Zy</span></Link>
                                </div>
                                <li className='w-fit absolute right-0 top-3 z-50'>
                                    <button>
                                        <AiFillCloseCircle
                                            size={"24px"}
                                            onClick={hideDrawer}
                                        />
                                    </button>
                                </li>
                                {/* Sidebar content here */}
                                <li><Link to={'/'} className=" mt-4 active:bg-red-500">Home</Link></li>
                                <li><Link to="/projects/page/1">All Property</Link></li>
                                <li><Link to="/blog">Blogs</Link></li>
                                <li><Link to="/about">About Us</Link></li>
                                <li><Link to="/contact">Contact Us</Link></li>
                                <li><Link to="/careees"> Careers</Link></li>
                            </ul>
                        </div>
                        <div className="flex gap-5 items-center">
                            <Link to={'/'} className=" font-medium text-white p-0 text-2xl sm:text-4xl">Homeszy</Link>
                            <div className="mt-1">
                                <select value={cityValue} onChange={handelSubmitValue} className="bg-transparent outline-0 text-white">
                                    {topCities && (
                                        topCities.sort((city1, city2) => city1.name.localeCompare(city2.name)).map((topCitie, idx) => (
                                            <option key={idx} value={topCitie.name} className="text-black">
                                                {topCitie.name}
                                            </option>
                                        ))
                                    )}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-none">
                <div className="dropdown dropdown-end text-white">
                    <label tabIndex={0} className=" btn-circle avatar">
                        <div className="w-10 h-10 object-cover rounded-full">
                            {
                                isLoggedIn ? (<img alt="User Image" src={data?.avatar?.secure_url} />) : (<FaRegUser className="text-3xl mt-1" />)
                            }
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu dropdown-content   mt-3 z-[1] p-2 shadow bg-base-100 w-52 text-black hover:bg-none active:bg-none">
                        {!isLoggedIn ? (
                            <>
                                <li className="bg-transparent flex flex-row items-center border-b-2 text-black">
                                    <p className="text-black">
                                        <FiLogIn className="text-black text-lg" />
                                    </p>
                                    <NavLink to="/login" className="bg-transparent text-lg text-black active:bg-transparent">
                                        Login
                                    </NavLink>
                                </li>
                                <li className="flex flex-row items-center text-black">
                                    <p className="">
                                        <FaUserPlus className=" text-black text-lg" />
                                    </p>
                                    <NavLink className="text-lg text-black hover:bg-none" to="/register" >
                                        Register
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="border-b-2 border-primary">
                                    <p className="text-primary italic text-md">Hey</p>
                                    <span className="font-bold text-lg capitalize">{data?.firstName}</span>
                                </li>
                                <li className="flex flex-row items-center active:bg-none">
                                    <p className="">
                                        <FaRegUser className="text-lg" />
                                    </p>
                                    <NavLink className="text-lg active:none bg-none border-none" to={'/user-profile'}>My Profile</NavLink>
                                </li>
                                {
                                    isLoggedIn && role === 'ADMIN' && (
                                        <li className="flex flex-row items-center">
                                            <p>
                                                <MdDashboard className="text-lg" />
                                            </p>
                                            <NavLink className="text-lg" to={'/admin/dashboard'}>Dashboard </NavLink>
                                        </li>
                                    )
                                }
                                <li className="flex flex-row items-center">
                                    <p>
                                        <IoIosLogOut className="text-lg" />
                                    </p>
                                    <Link className="text-lg" onClick={handelLogout}>Logout</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar;