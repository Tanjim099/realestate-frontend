import { useEffect, useState } from "react";
import HomeLayout from "../components/HomeLayout";
import SimilarProjectCard from "../components/SimilarProjectCard";
import "../styles/ProjectViewPage.css";
import { useDispatch, useSelector } from "react-redux";
import { createContact } from "../redux/store";
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';
import { NavLink, json, useParams } from "react-router-dom";
import { getProject, getSimilarProject } from "../redux/slices/projectSlice";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineLocationCity } from "react-icons/md";
import { BsCaretLeftFill, BsCaretRightFill } from 'react-icons/bs';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import Form from "../components/Form";
import { FaStar } from "react-icons/fa";
import { createRatingReview } from "../redux/slices/ratingReview";
import StarRating from "../components/StarRating";
import GetAvgRating from "../helper/avgRating";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";

function ProjectViewPage() {

    const dispatch = useDispatch();
    const { similarProject } = useSelector((state) => state?.project);
    const similarProjectData = similarProject.filter((data) => {
        return data.checkStatus == "yes";
    })
    // const { _id } = useSelector((state) => state?.auth?.data);
    const getUserData = JSON.parse(localStorage.getItem("data"));
    // console.log(getUserData._id);
    // console.log(_id);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [nextEl, setNextEl] = useState(null);
    const [prevEl, setPrevEl] = useState(null);
    const [count, setCount] = useState(null);

    useEffect(() => {
        const res = GetAvgRating(data?.ratingandreview);
        setCount(res);
    }, [data]);

    const [ratingReview, setRatingReview] = useState({
        rating: '',
        review: '',
        id: getUserData?._id,
    });

    const [hover, setHover] = useState(null);
    const [userInput, setUserInput] = useState({
        name: '',
        phone: '',
        email: '',
        interested: '',
    });

    const handelInput = (e) => {
        const { value, name } = e.target;
        setUserInput((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();
        const res = await dispatch(createContact(userInput));

    }

    const { slug } = useParams();
    async function onLoadGetData() {
        setIsLoading(true)
        const response = await dispatch(getProject(slug));
        if (response?.payload?.success) {
            setData(response?.payload?.data)
            setIsLoading(false);
        }
    }


    useEffect(() => {
        onLoadGetData();
        fetchSimilarProjects();
    }, [slug])

    async function fetchSimilarProjects() {
        const response = await dispatch(getSimilarProject([data?.developer, data?.city]));
    }

    async function onReviewFormSubmit(e) {
        e.preventDefault();
        try {
            const res = dispatch(createRatingReview([ratingReview, getUserData?._id]));
            setRatingReview((prev) => ({
                ...prev,
                rating: '',
                review: '',
                id: getUserData?._id,
            }))

            setHover(null);

        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchSimilarProjects();
    }, [data]);
    const classNames = 'hover:bg-dry absolute flex items-center justify-center transitions text-sm rounded w-8 h-8 flex-colo bg-primary text-white';
    return (
        <HomeLayout
            title={data?.name || "Project View Page"}
            description={data?.description || "Best Flat in New Delhi"}
            keywords={data?.keywords}
        >
            {/* =================== */}
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box p-1 w-[90%] md:w-[50%] lg:w-[25%] rounded-md bg-cyan-900">
                    <form method="dialog" className="modal-backdrop">
                        <button className="btn btn-sm btn-circle btn-ghost absolute text-black right-2 top-2 z-50">✕</button>
                    </form>
                    <Form projectName={data?.name} />
                </div>
            </dialog>
            {/* =================== */}

            {/* {
                isLoading ? <Spinner /> : ( */}
            <div className="projectviewpage_container w-[100%] lg:w-[80%] mx-auto px-2 py-5 mt-1">
                {data.length !== 0 ? (
                    <div className="w-full flex flex-col lg:flex-row gap-6">
                        <div className="w-[100%] lg:w-[70%] md:w-[100%]">
                            <Swiper
                                slidesPerView={1}
                                spaceBetween={20}
                                loop={true}
                                autoplay={{ delay: 2000, disableOnInteraction: false }}
                                modules={[FreeMode, Pagination, Navigation, Autoplay]}
                                className="carousel w-full rounded-md"
                            >
                                <SwiperSlide id="slide1" className="carousel-item relative w-full rounded-md">
                                    <img src={data?.gallery[0]?.secure_url} className="w-full object-cover sm:h-[350px] h-[200px] md:h-[400px] lg:h-[500px] rounded" />
                                </SwiperSlide>
                                <SwiperSlide id="slide2" className="carousel-item relative w-full rounded-md">
                                    <img src={data?.gallery[1]?.secure_url} className="w-full object-cover h-[200px] sm:h-[350px] md:h-[400px] lg:h-[500px] rounded" />
                                </SwiperSlide>
                                <SwiperSlide id="slide3" className="carousel-item relative w-full rounded-md">
                                    <img src={data?.gallery[2]?.secure_url} className="w-full object-cover h-[200px] sm:h-[350px] md:h-[400px] lg:h-[500px] rounded" />
                                </SwiperSlide>

                            </Swiper>
                            <div className="bg-gradient-to-r from-indigo-200 p-2 rounded-md w-full mt-3">
                                <div className="flex items-center justify-between">
                                    <h1 className="py-2 px-2 lg:text-3xl text-xl lg:font-semibold font-medium">{data?.name}</h1>
                                    <div className="flex gap-1">
                                        <span>
                                            {(count)}
                                        </span>
                                        <StarRating Review_Count={count} />
                                        <span>
                                            ({(data?.ratingandreview?.length)} Review)
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col lg:flex-row lg:items-center gap-3 justify-between mt-3">
                                    <div className="flex lg:flex-row flex-col gap-3">
                                        <div className="flex items-center gap-1 text-sm">
                                            <MdOutlineLocationCity />
                                            <p>By {data?.developer}</p>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm">
                                            <IoLocationSharp />
                                            <p>{data?.location}</p>
                                        </div>
                                    </div>
                                    <div className="flex lg:flex-row flex-col gap-3">
                                        <div className="flex items-center gap-1 text-sm">
                                            <MdOutlineLocationCity />
                                            <p>By {data?.pricing?.startingFrom}</p>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm">
                                            <IoLocationSharp />
                                            <p>4787 - 10985 SQ. FT.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* === */}
                            <div className="my-8 shadow-[0_0_3px_gray] p-3 rounded-md sticky top-[66px] bg-white z-30">
                                <ul className="flex items-center justify-between gap-6 overflow-x-auto">
                                    <li className="cursor-pointer"><ScrollLink to="overflow" smooth={true} duration={500}>Overview</ScrollLink></li>
                                    <li className="cursor-pointer"><ScrollLink to="about" smooth={true} duration={500}>About</ScrollLink></li >
                                    <li className="cursor-pointer"><ScrollLink to="specification" smooth={true} duration={500}>Specification</ScrollLink></li>
                                    <li className="cursor-pointer"><ScrollLink to="floor-plan" smooth={true} duration={500}>FloorPlan</ScrollLink></li>
                                    <li className="cursor-pointer"><ScrollLink to="gallery" smooth={true} duration={500}>Gallery</ScrollLink></li>
                                    <li className="cursor-pointer"><ScrollLink to="amenities" smooth={true} duration={500}>Amenities</ScrollLink></li>
                                    <li className="cursor-pointer"><ScrollLink to="location" smooth={true} duration={500}>Location</ScrollLink></li>
                                </ul>
                            </div>

                            <div className="bg-gradient-to-l from-indigo-200 p-2 rounded-md w-full mt-3" id="overflow">
                                <h2 className="py-2 px-2 lg:text-3xl text-xl lg:font-semibold font-medium">Overview of {data?.name}</h2>
                                <div className="lg:grid lg:grid-cols-3 md:grid md:grid-cols-3 flex flex-col gap-4 mt-3">
                                    <div className="border-2 border-white py-2 px-3">
                                        <p className="text-sm">Project Area</p>
                                        <p className="font-medium">{data?.projectArea}</p>
                                    </div>
                                    <div className="border-2 border-white py-2 px-3">
                                        <p className="text-sm">Project Type</p>
                                        <p className="font-medium">{data?.projectType}</p>
                                    </div>
                                    <div className="border-2 border-white py-2 px-3">
                                        <p className="text-sm">Project Status</p>
                                        <p className="font-medium">{data?.status}</p>
                                    </div>
                                    <div className="border-2 border-white py-2 px-3">
                                        <p className="text-sm">Possession On</p>
                                        <p className="font-medium">{data?.possessionOn}</p>
                                    </div>
                                    <div className="border-2 border-white py-2 px-3">
                                        <p className="text-sm">Configurations</p>
                                        <p className="font-medium">{data?.projectArea}</p>
                                    </div>
                                    <div className="border-2 border-white py-2 px-3">
                                        <p className="text-sm">RERA No</p>
                                        <p className="font-medium">{data?.reraNo}</p>

                                    </div>
                                </div>
                            </div>
                            <div className="mt-8" id="about">
                                <h1 className="py-2 px-2 lg:text-3xl text-xl lg:font-semibold font-medium">{data?.name}</h1>
                                <div className=" content01 p-2 rounded-md w-full max-h-[500px] overflow-y-auto" dangerouslySetInnerHTML={{ __html: data?.content }}>
                                </div>
                            </div>

                            {/* ================= */}
                            <div className="content05   mt-5 p-2 rounded-md" id="specification">
                                <h2 className="py-2 px-2 lg:text-3xl text-xl lg:font-semibold font-medium">Specification of {data?.name}</h2>
                                <div dangerouslySetInnerHTML={{ __html: data?.specifications }}>

                                </div>
                            </div>

                            <div className="content04  relative mt-5 py-4 px-2  rounded-md" id="floor-plan">
                                <h2 className="py-2 px-2 lg:text-3xl text-xl lg:font-semibold font-medium">Complete View of Floor Plans &amp; Pricing</h2>
                                <Swiper
                                    navigation={{ nextEl, prevEl }}
                                    slidesPerView={1}
                                    spaceBetween={20}
                                    loop={true}
                                    autoplay={{ delay: 2000, disableOnInteraction: false }}
                                    modules={[FreeMode, Pagination, Navigation]}
                                    className="carousel w-full rounded-md shadow-[0_0_1px_gray] mt-6"
                                >
                                    {
                                        data?.floorPlan?.map((item, idx) => {
                                            return (
                                                <SwiperSlide key={idx} id="slide3" className=" bg-white carousel-item relative w-[100%] rounded-md">
                                                    <div className="flex flex-col-reverse md:flex-row w-[100%]">
                                                        <div className="lg:w-[40%] md:w-[40%] w-[100%]">
                                                            <div className="lg:p-4 md:p-3 sm:p-2">
                                                                <p className="text-sm">Types</p>
                                                                <p className="mt-2 font-medium">{item?.types}</p>
                                                            </div>
                                                            <hr />
                                                            <div className="p-4">
                                                                <p className="text-sm">Build up Aread</p>
                                                                <p className="mt-2 font-medium">{item?.dimensions}</p>
                                                            </div>
                                                            <hr />
                                                            <div className="p-4">
                                                                <p className="text-sm">Base Selling Price</p>
                                                                <p className="mt-2 font-medium">{item?.floorPrice}</p>
                                                            </div>
                                                            <hr />
                                                            <div className="lg:p-4 p-2 flex items-center justify-center">
                                                                <button className=" bg-primary text-white px-4 py-2 rounded-md" onClick={() => document.getElementById('my_modal_2').showModal()}>Price Sheet</button>
                                                            </div>
                                                        </div>
                                                        <div className="lg:w-[60%] md:w-[60%] w-[100%]">
                                                            <div className="w-full flex items-center justify-center">
                                                                <img className="w-[100%]" src={item?.image?.secure_url} alt="" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            )
                                        })
                                    }
                                </Swiper>
                                <div className='flex justify-between gap-10 z-20'>
                                    <button
                                        className={`${classNames} top-[50%] left-[-3%] z-20`}
                                        ref={(node) => setPrevEl(node)}
                                    >
                                        <BsCaretLeftFill />
                                    </button>
                                    <button
                                        className={`${classNames} right-[-3%] top-[50%] z-20`}
                                        ref={(node) => setNextEl(node)}
                                    >
                                        <BsCaretRightFill />
                                    </button>
                                </div>
                            </div>






                            {/* ==================== */}

                            <div id='gallery' className="content06 mt-5 p-2 rounded-md">
                                <h2 className="py-2 px-2 lg:text-3xl text-xl lg:font-semibold font-medium">Gallery</h2>
                                <div className="gallery mt-4 grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2 gap-2">
                                    {
                                        data?.gallery?.map((img, idx) => {
                                            return <img key={idx} className="lg:w-[200px] h-full rounded-sm cursor-pointer" onClick={() => document.getElementById('my_modal_2').showModal()} src={img?.secure_url} alt />
                                        })
                                    }
                                </div>
                            </div>
                            <div className="content07 bg-gradient-to-r from-cyan-100 to-blue-10 mt-5 p-2 rounded-md" id="amenities">
                                <h2 className="py-2 px-2 lg:text-3xl text-xl lg:font-semibold font-medium">Amenities You Would Love to Use</h2>
                                <div className="Amenities grid lg:grid-cols-6 md:grid-cols-6 grid-cols-3 gap-2">
                                    {data?.amenities?.map((item, idx) => {
                                        return (
                                            <div key={idx} className=" bg-white p-2 rounded-md flex flex-col items-center shadow-md">
                                                <img className="w-[30px] " src={item?.image?.secure_url} width="30px" alt />
                                                <p className=" text-center" >{item?.name}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="content05  mt-5 p-2 rounded-sm" id="virtualsitetour">
                                <h2 className="py-2 px-2 lg:text-3xl text-xl lg:font-semibold font-medium">Virtual Site Tour</h2>
                                <iframe className="w-full lg:h-[400px] md:h-[400px] h-[200px]" src="https://www.youtube.com/embed/nlo2_mQ5nA4" title="YouTube video player" frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowfullscreen></iframe>
                            </div>

                            <div className="content09 bg-gradient-to-r from-cyan-100 to-blue-10 mt-5 p-2 rounded-md " id="location">
                                <h2 className="py-2 px-2 lg:text-3xl text-xl lg:font-semibold font-medium">Location Of {data?.name}</h2>
                                <iframe className=" w-full lg:h-[450px] md:h-[450px] h-[200px] rounded-md" src={data?.map || "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7011.287631511752!2d77.23265872911378!3d28.52036222486543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1684832604572!5m2!1sen!2sin"} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                            </div>
                            <div className="mt-5 p-2">
                                <div className=" lg:hidden">
                                    <Form />
                                </div>
                            </div>
                            {/* Rating and review */}
                            <div>
                                <form onSubmit={onReviewFormSubmit} className="w-full border p-4">
                                    <h2 className="border-b-2 border-primary pb-2 my-10 text-2xl text-primary font-semibold">
                                        Rating & Review
                                    </h2>
                                    <div className="flex gap-5">
                                        {
                                            [...Array(5)].map((item, idx) => {
                                                let currentRating = idx + 1;
                                                return (
                                                    <label key={idx}>
                                                        <input
                                                            type="radio"
                                                            name="rating"
                                                            className="cursor-pointer text-sm hidden"
                                                            value={currentRating}
                                                            onChange={() => setRatingReview((prev) => ({
                                                                ...prev,
                                                                rating: currentRating
                                                            }))}
                                                        />
                                                        <FaStar
                                                            className="cursor-pointer text-sm"
                                                            size={20}
                                                            color={currentRating <= (hover || ratingReview.rating) ? "#ffc107" : "#e4e5e9"}
                                                            onMouseEnter={() => setHover(currentRating)}
                                                            onMouseLeave={() => setHover(null)}
                                                        />
                                                    </label>
                                                )
                                            })
                                        }
                                    </div>
                                    <div>
                                        <textarea
                                            className="border w-full h-[150px] placeholder:uppercase px-5 py-2 mt-5 resize-none outline-0"
                                            placeholder="Enter Review"
                                            value={ratingReview.review}
                                            onChange={(e) => setRatingReview((prev) => ({
                                                ...prev,
                                                review: e.target.value
                                            }))}
                                        />
                                    </div>
                                    <div className='flex justify-end'>
                                        <button
                                            type='submit'
                                            className='bg-primary text-lg px-3 inline-block text-white rounded h-[40px] mt-3 hover:bg-[#7f1639]'
                                        >
                                            Added
                                        </button>
                                    </div>
                                </form>
                            </div>
                            {/* similar project card section */}
                            <div className="mt-5 rounded-md">
                                <h2 className="border-b-2 border-primary pb-2 my-10 text-2xl text-primary font-semibold">
                                    Similar Project
                                </h2>
                                <Swiper
                                    navigation={{ nextEl, prevEl }}
                                    slidesPerView={1}
                                    spaceBetween={20}
                                    loop={true}
                                    autoplay={{ delay: 2000, disableOnInteraction: false }}
                                    modules={[FreeMode, Pagination, Navigation, Autoplay]}
                                    breakpoints={{
                                        700: {
                                            slidesPerView: 2,
                                        },
                                        1024: {
                                            slidesPerView: 4,
                                        },
                                    }}
                                    className="max-h-[30rem]"
                                >
                                    {
                                        similarProjectData && (
                                            similarProjectData.map((data, idx) => (
                                                <SwiperSlide key={idx} className=" min-w-[300px] max-w-[300px]  mb-5">
                                                    <SimilarProjectCard data={data} />
                                                </SwiperSlide>
                                            ))
                                        )
                                    }
                                </Swiper>
                                {
                                    similarProject && similarProject.length > 4 && (
                                        <div className='flex justify-between gap-10'>
                                            <button
                                                className={`${classNames} top-[50%] left-[-3%]`}
                                                ref={(node) => setPrevEl(node)}
                                            >
                                                <BsCaretLeftFill />
                                            </button>
                                            <button
                                                className={`${classNames} top-[50%]`}
                                                ref={(node) => setNextEl(node)}
                                            >
                                                <BsCaretRightFill />
                                            </button>
                                        </div>
                                    )
                                }
                            </div>

                        </div>
                        {/* =============================== */}
                        <div className=" sm:w-[100%] md:w-[30%] h-[100%] sticky top-24 z-10 hidden lg:flex  flex-col gap-6">
                            <div>
                                {/* ============================= */}
                                <div className="main02_right sticky top-10">
                                    <Form projectName={data?.name} />
                                </div>

                                {/* ============================= */}
                            </div>
                        </div>
                    </div>
                ) : (

                    <h1>Not Found</h1>
                )}
            </div>
            {/* )
            } */}
        </HomeLayout>
    )
}

export default ProjectViewPage