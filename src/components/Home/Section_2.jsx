import React from 'react'
import { MdOutlineHomeWork, MdOutlineSecurity } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

function Section_2() {
    const navigate = useNavigate();
    return (
        <div>
            <div className="bg-white lg:min-h-[400px] px-5 lg:p-0 max-w-[1200px] items-center mx-auto my-5 grid grid-cols-1 lg:grid-cols-3">
                <div className="col-span-1 text-black mb-10 lg:mb-0">
                    <h2 className="text-3xl">Explore by Property Type</h2>
                    <p className="text-md my-5">Get started by choosing from one of our pre-built page templates to showcase your properties</p>
                    <button onClick={() => navigate("/projects/page/1")} className="bg-primary hover:bg-[#a7076a] transition-all duration-300 ease-in-out text-white font-semibold px-5 py-3 rounded ">View All Property</button>
                </div>
                <div className="col-span-2 rounded grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-white p-5 h-screen md:h-[600px] lg:h-[200px] bg-primary">
                    <div className="flex flex-col col-span-1 items-center justify-center lg:border-r-2 p-2">
                        <span className="text-5xl"><MdOutlineHomeWork /></span>
                        <p>Home & Appartment</p>
                    </div>
                    <div className="flex flex-col col-span-1 items-center justify-center lg:border-r-2 p-2">
                        <span className="text-5xl"><MdOutlineHomeWork /></span>
                        <p>Home & Appartment</p>
                    </div>
                    <div className="flex flex-col col-span-1 items-center justify-center lg:border-r-2 p-2">
                        <span className="text-5xl"><MdOutlineHomeWork /></span>
                        <p>Home & Appartment</p>
                    </div>
                    <div className="flex flex-col col-span-1 items-center justify-center p-2">
                        <span className="text-5xl"><MdOutlineHomeWork /></span>
                        <p>Home & Appartment</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Section_2