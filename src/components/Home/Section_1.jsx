import React from 'react'
import image from '../../assets/section-bg1.jpg';
import { MdOutlineHomeWork } from "react-icons/md";

function Section_1() {
    return (
        <div>
            <div className="p-4 min-h-[700px] w-full my-10 flex items-center flex-col justify-center" style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                opacity: 0.9,
                transition: 'background 0.3s ease-in-out',
            }}>
                <h2 className="text-white text-4xl text-center">How we help people?</h2>
                <div className="bg-primary rounded grid col-span-1 md:flex md:justify-between mt-10 px-4 text-white min-h-[300px] w-[100%] md:w-[95%] lg:w-[80%]">
                    <div className="text-center md:w-[30%] flex flex-col items-center justify-center p-2">
                        <p className="text-[60px]"><MdOutlineHomeWork /></p>
                        <h3 className="text-xl my-3 font-bold">Sell home or office</h3>
                        <p className=" leading-6">Get started by choosing from one of our pre-built page templates to showcase your properties</p>
                    </div>
                    <div className="text-center md:w-[30%] flex flex-col items-center justify-center p-2">
                        <p className="text-[60px]"><MdOutlineHomeWork /></p>
                        <h3 className="text-xl my-3 font-bold">Rent home or office</h3>
                        <p className=" leading-6">Get started by choosing from one of our pre-built page templates to showcase your properties</p>
                    </div>
                    <div className="text-center md:w-[30%] flex flex-col items-center justify-center p-2">
                        <p className="text-[60px]"><MdOutlineHomeWork /></p>
                        <h3 className="text-xl my-3 font-bold">Find next</h3>
                        <p className=" leading-6">Get started by choosing from one of our pre-built page templates to showcase your properties</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Section_1