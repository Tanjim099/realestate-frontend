import React, { useState } from 'react'
import buy1 from '../../assets/buy_icon.svg'
import buy2 from '../../assets/buy_icon_1.svg'
import buy3 from '../../assets/buy_icon_3.svg'
import buy4 from '../../assets/imgpsh_fullsize_anim.png'
import buy5 from '../../assets/vastu.svg'
import buy6 from '../../assets/legal-assistant2.png';

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom'

import { BsCaretLeftFill, BsCaretRightFill } from 'react-icons/bs';

function Section_3() {
    const [nextEl, setNextEl] = useState(null);
    const [prevEl, setPrevEl] = useState(null);
    const classNames = 'hover:bg-dry absolute flex items-center justify-center transitions text-sm rounded w-8 h-8 flex-colo bg-primary text-white';
    return (
        <div>
            <div className="mx-auto px-5 lg-p-0 relative max-w-[1200px] mt-16 mb-10 ">
                <div className="text-center">
                    <h2 className="font-semibold text-2xl">Why buy with us ?</h2>
                    <p className="text-xl text-gray-500 mt-5">Aspects that make 360 Realtors India's leading Real Estate Advisory</p>
                </div>
                <Swiper
                    navigation={{ nextEl, prevEl }}
                    spaceBetween={12}
                    slidesPerView={1}
                    loop={true}
                    className="text-center my-10"
                    autoplay={{ delay: 2000, disableOnInteraction: false }}
                    modules={[FreeMode, Pagination, Navigation, Autoplay]}
                    breakpoints={{
                        700: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                >
                    <SwiperSlide className="flex items-center justify-center flex-col">
                        <div className="w-[100px] h-[100px]">
                            <img src={buy1} alt="buy_1" className="w-full h-full" />
                        </div>
                        <div>
                            <h3 className="font-semibold my-3 text-lg">Real Estate Consulting</h3>
                            <p className="text-sm">Those days are now passé when purchasing a home used to be a very arduous task and buyers had to run from pillar to post to get everything in place...</p>
                            <p className="text-primary my-3">
                                <Link>Read More</Link>
                            </p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="flex items-center justify-center flex-col">
                        <div className="w-[100px] h-[100px]">
                            <img src={buy2} alt="buy_2" className="w-full h-full" />
                        </div>
                        <div>
                            <h3 className="font-semibold my-3 text-lg">Home Loan Consultation</h3>
                            <p className="text-sm">Attractive home loans have made purchasing property very convenient as buyers do not have to pay everything upfront. Our expertise in impartial loan advisory services...</p>
                            <p className="text-primary my-3">
                                <Link >Read More</Link>
                            </p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="flex items-center justify-center flex-col">
                        <div className="w-[100px] h-[100px]">
                            <img src={buy3} alt="buy_3" className="w-full h-full" />
                        </div>
                        <div>
                            <h3 className="font-semibold my-3 text-lg">NRI Services</h3>
                            <p className="text-sm">TInvestment inflows from the Indian diaspora have been rising at astounding rates. However, the ascent has slowed down as many NRIs are still dissuaded due to the lack of geographical ...</p>
                            <p className="text-primary my-3">
                                <Link>Read More</Link>
                            </p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="flex items-center justify-center flex-col">
                        <div className="w-[100px] h-[100px]">
                            <img src={buy4} alt="buy_4" className="w-full h-full" />
                        </div>
                        <div>
                            <h3 className="font-semibold my-3 text-lg">After sales assistance</h3>
                            <p className="text-sm">Our services do not stop once the deal is closed. We are committed to assisting our customers in every possible way. We have been pushing the realms of client servicing in Indian realty ... </p>
                            <p className="text-primary my-3">
                                <Link>Read More</Link>
                            </p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="flex items-center justify-center flex-col">
                        <div className="w-[100px] h-[100px]">
                            <img src={buy5} alt="buy_5" className="w-full h-full" />
                        </div>
                        <div>
                            <h3 className="font-semibold my-3 text-lg">Vastu Consultation</h3>
                            <p className="text-sm">Vaastu is a subtle way of bringing in harmony and channelizing energy in and around the home. We provide Vaastu consulting to make a home Vaastu -compliant</p>
                            <p className="text-primary my-3">
                                <Link>Read More</Link>
                            </p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="flex items-center justify-center flex-col">
                        <div className="w-[100px] h-[100px]">
                            <img src={buy6} alt="buy_6" className="w-full h-full" />
                        </div>
                        <div>
                            <h3 className="font-semibold my-3 text-lg">Legal Consultation</h3>
                            <p className="text-sm">360 Realtors are not limited to supporting purchase/selling transactions in the real-estate domain. We walk with our clients all the way, assisting them with all the aspects ...</p>
                            <p className="text-primary my-3">
                                <Link>Read More</Link>
                            </p>
                        </div>
                    </SwiperSlide>
                </Swiper>
                <div className='flex justify-between gap-10'>
                    <button
                        className={`${classNames} top-[50%] cursor-pointer`}
                        ref={(node) => setPrevEl(node)}
                    >
                        <BsCaretLeftFill />
                    </button>
                    <button
                        className={`${classNames} top-[50%] right-4 cursor-pointer`}
                        ref={(node) => setNextEl(node)}
                    >
                        <BsCaretRightFill />
                    </button>

                </div>
            </div>
        </div>
    )
}

export default Section_3