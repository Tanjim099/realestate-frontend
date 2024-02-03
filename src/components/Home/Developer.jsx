import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from 'swiper/modules';
import { images } from '../../Constants/developerImage';

function Developer() {
    return (
        <div>
            <div className="max-w-[1200px] mx-auto my-14 px-4 lg:px-0 overflow-hidden">
                <h2 className="border-b-2 border-primary pb-4 my-10 text-[22px] lg:text-3xl text-primary font-[600] lg:font-semibold">
                    Developer Group
                </h2>
                <Swiper
                    slidesPerView={7}
                    spaceBetween={20}
                    autoplay={{ delay: 2000, disableOnInteraction: false }}
                    modules={[Autoplay]}
                    className='flex gap-10 min-w-[1100px]'
                >
                    {
                        images.map((image, idx) => (
                            <SwiperSlide key={idx}>
                                <div className='bg-primary flex items-center justify-center p-2 rounded-md min-w-[100px]'>
                                    <img className='   w-full h-[60px] rounded-md cursor-pointer' src={image.url} alt='DeveloperImage' />
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    )
}

export default Developer