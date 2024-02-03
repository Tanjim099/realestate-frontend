import { NavLink, useParams } from "react-router-dom";
import HomeLayout from "../components/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../redux/slices/authSlice";
import { useEffect } from "react";
import { ImBlog } from "react-icons/im";
import { FaLinkedin, FaInstagramSquare, FaFacebookSquare } from "react-icons/fa";
import { MdEditLocationAlt } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaCalendarAlt } from "react-icons/fa";
import { getBlogsByUserId } from "../redux/slices/blogSlice";
import dateFormeter from "../helper/dateFormeter";


function Author() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { userData } = useSelector((state) => state?.auth);
    const { userBlog } = useSelector((state) => state?.blog);
    async function getUserData() {
        const response = await dispatch(getUserProfile(id));
    }

    async function fetchUserBlog() {
        const response = await dispatch(getBlogsByUserId(id))
    }
    useEffect(() => {
        getUserData();
        fetchUserBlog();
    }, [id]);
    return (
        <HomeLayout>
            <div className=" h-16">
                <img className=" h-[280px] w-full" src="https://www.marthastewart.com/thmb/E_wOXQrYuq2-lUcQe_GK5vESNlw=/1500x375/filters:no_upscale():max_bytes(200000):strip_icc()/design--decor-banner-0323-9991afc2f0c34f57aef1d7e7a728eca7.jpg" alt="" />
            </div>
            <div className="w-[100%] sm:w-[90%] lg:w-[70%] m-auto">
                <div className="w-[100%] flex flex-col lg:flex-row gap-4 my-4">
                    <div className="w-[90%] lg:w-[30%] m-auto h-fit sticky top-10 flex items-center flex-col bg-white shadow-[0_0_2px_gray] rounded-md py-10">
                        <div>
                            <img className="w-[100px] h-[100px] rounded-full" src={userData?.avatar?.secure_url || "https://superadmin.homes247.in/images/bloggerprofile/1699344848-WhatsApp%20Image%202023-11-07%20at%201.43.03%20PM.jpeg"} alt="" />
                        </div>
                        <div className="my-5">
                            <h2 className="text-xl">{(userData?.firstName)?.toUpperCase()} {(userData?.lastName)?.toUpperCase()}</h2>
                        </div>
                        <div className="w-[60%] border-b-2 border-gray-500"></div>
                        <div className="my-5 flex items-center gap-2">
                            <ImBlog />
                            <h3>{userBlog?.length} Blogs</h3>
                        </div>
                        <div className="w-[60%] border-b-2 border-gray-500"></div>
                        <div className="my-5 flex items-center gap-2">
                            <MdEditLocationAlt />
                            <h3>Calicut, Kerala</h3>
                        </div>
                        <div className="w-[60%] border-b-2 border-gray-500"></div>
                        <div className="flex gap-2 text-xl mt-5">
                            <NavLink>
                                <FaLinkedin />
                            </NavLink>
                            <NavLink>
                                <FaInstagramSquare />
                            </NavLink>
                            <NavLink>
                                <FaFacebookSquare />
                            </NavLink>
                        </div>
                    </div>
                    <div className="lg:w-[70%] w-[90%] m-auto lg:mt-60">
                        <div className="lg:grid lg:grid-cols-2 lg:gap-4">
                            {
                                userBlog?.map((blog) => {
                                    return (
                                        <div className="border-2">
                                            <NavLink to={`/blog/${blog?.slug}`}>
                                                <div className="w-full h-[200px]">
                                                    <img src={blog?.image?.secure_url || "https://res.cloudinary.com/dmz316wxm/image/upload/v1701973109/Real_Estate/nuynw7p9csk7x8grvwcm.jpg"} className="h-full w-full object-cover" />
                                                </div>
                                                <div className="p-3">
                                                    <h3 className="font-medium text-lg mt-1">{(blog?.title).substring(0, 60)}...</h3>
                                                    <p className="text-sm text-gray-500">{(blog?.description).substring(0, 125)} <span className=" text-red-400 underline"> more</span></p>
                                                </div>
                                                <hr />
                                                <div className='flex items-center justify-between p-2'>
                                                    <div className='flex items-center gap-1  p-1 text-xs rounded-sm'>
                                                        <CgProfile />Cate:
                                                        <p>{blog?.category}</p>
                                                    </div>
                                                    <div className='flex items-center gap-1  p-1 text-xs rounded-sm'>
                                                        <FaCalendarAlt />
                                                        <p>{dateFormeter(blog?.createdAt)}</p>
                                                    </div>
                                                </div>
                                            </NavLink>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}

export default Author;