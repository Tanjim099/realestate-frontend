import React from 'react'
import CityCard from '../CityCard'

function CitySection() {
    return (
        <div>
            <div className="my-5 mx-auto px-5 lg:p-0 lg:max-w-[1200px]">
                <h2 className="border-b-2 border-primary pb-4 my-10 text-[22px] lg:text-3xl text-primary font-[600] lg:font-semibold" >
                    Top Cities In India
                    <p className="text-xs lg:text-sm">Best places to live in India</p>
                </h2>
                <div className="w-full relative">
                    <CityCard />
                </div>
            </div>
        </div>
    )
}

export default CitySection