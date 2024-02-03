import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllProjects } from "../redux/slices/projectSlice";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import Bangalore from '../assets/bangalore.png';
import chennai from '../assets/chennai.png';
import hyderabad from '../assets/hyderabad.png';
import mumbai from '../assets/mumbai.png';
import kolkata from '../assets/kolkata.png';
import delhi from '../assets/delhi.png';
import { NavLink } from "react-router-dom";
import '../styles/CityCard.css';

function CityCard() {
    const dispatch = useDispatch();
    const [city, setCity] = useState([]);
    const { projects } = useSelector((state) => state.project);

    return (
        <div className="flex city justify-between overflow-x-auto w-full gap-3">
            <NavLink to="/city/bangalore">
                <div className=" bg-white rounded-lg border w-[170px] h-[110px] gap-2 flex flex-col items-center justify-center text-center">
                    <img src={Bangalore} className="w-[50px] h-[50px]" alt="CityImage" />
                    <h4 className=" text-center text-primary">Bangalore</h4>
                </div>
            </NavLink>
            <NavLink to="/city/chennai">
                <div className=" bg-white rounded-lg border w-[170px] h-[110px] gap-2 flex flex-col items-center justify-center text-center">
                    <img src={chennai} className="w-[50px] h-[50px]" alt="CityImage" />
                    <h4 className=" text-center text-black">Chennai</h4>
                </div>
            </NavLink>
            <NavLink to="/city/hyderabad">
                <div className=" bg-white rounded-lg border w-[170px] h-[110px] gap-2 flex flex-col items-center justify-center text-center">
                    <img src={hyderabad} className="w-[50px] h-[50px]" alt="CityImage" />
                    <h4 className=" text-center text-black">Hyderabad</h4>
                </div>
            </NavLink>
            <NavLink to="/city/mumbai">
                <div className=" bg-white rounded-lg border w-[170px] h-[110px] gap-2 flex flex-col items-center justify-center text-center">
                    <img src={mumbai} className="w-[50px] h-[50px]" alt="CityImage" />
                    <h4 className=" text-center text-black">Mumbai</h4>
                </div>
            </NavLink>
            <NavLink to="/city/kolkata">
                <div className=" bg-white rounded-lg border w-[170px] h-[110px] gap-2 flex flex-col items-center justify-center text-center">
                    <img src={kolkata} className="w-[50px] h-[50px]" alt="CityImage" />
                    <h4 className=" text-center text-black">Kolkata</h4>
                </div>
            </NavLink>
            <NavLink to="/city/delhi">
                <div className=" bg-white rounded-lg border w-[170px] h-[110px] gap-2 flex flex-col items-center justify-center text-center">
                    <img src={delhi} className="w-[50px] h-[50px]" alt="CityImage" />
                    <h4 className=" text-center text-black">Delhi</h4>
                </div>
            </NavLink>
        </div>
    )
}


export default CityCard;