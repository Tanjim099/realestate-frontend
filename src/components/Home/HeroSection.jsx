import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import CountUp from 'react-countup';
import { ImLocation2 } from "react-icons/im";
import { getSuggestions, searchProject, setQuery } from '../../redux/slices/projectSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../styles/CityCard.css'

function HeroSection() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState();
    const { query, results, suggestions, status, error } = useSelector((state) => state?.project);
    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setSearchQuery(inputValue)
        dispatch(setQuery(searchQuery));
    };

    const handleSearch = async () => {
        const response = await dispatch(searchProject(query));
        if (response?.payload?.length > 1) {
            navigate("/search");
            const emptyStr = ""
            setSearchQuery(emptyStr);
        }
    };

    useEffect(() => {
        if (query) {
            dispatch(getSuggestions(query));
        }

    }, [query, dispatch]);

    const handleSuggestionClick = (suggestion) => {
        dispatch(setQuery(suggestion));
        dispatch(searchProject(suggestion));
    }

    return (
        <div>
            {/* Hero Section */}
            <div className="hero_section">
                <div className="hero gradiantColor  min-h-[360px] sm:h-[200px] md:h-[300px] lg:min-h-[550px]"
                >
                    <div className="bg-opacity-60"></div>
                    <div className="hero-content overflow-hidden h-full text-neutral-content w-[100%]">
                        <div className="flex flex-col h-full w-full justify-around lg:items-center">
                            <div className="text-white flex flex-col justify-end h-full text-center mt-12 w-full md:w-[75%] lg:w-[60%] md:m-auto">
                                <h1 className=" lg:text-3xl text-xl md:text-lg lg:font-medium">Discover Properties in India</h1>
                                <p className="text-sm lg:my-5 my-2">We help you find your new home</p>
                                {/* ====================== */}
                                <div className="">
                                    <div className="flex items-center gap-2 w-full h-[40px] lg:h-[50px]">
                                        <div className="relative flex flex-col items-center w-full h-[40px] lg:h-[50px]">
                                            <div className='w-full h-[40px] lg:h-[50px]'>
                                                <input
                                                    type="text"
                                                    placeholder="Enter Location builder, project"
                                                    name="query"
                                                    value={query}
                                                    id="query"
                                                    className="border border-gray-200 shadow-sm outline-0 text-black h-full w-full p-3 pl-10 placeholder:text-xs lg:placeholder:text-lg"
                                                    onChange={handleInputChange}
                                                />
                                                <span className="absolute z-10 top-3 lg:top-4 left-4 text-gray-400"><FaSearch /></span>
                                            </div>
                                            <ul className='w-full'>
                                                {suggestions?.map((suggestion) => (
                                                    <li className={`${query === '' ? '' : 'bg-white'} max-h-[500px] overflow-y-auto text-black text-left w-full px-4 py-2 cursor-pointer`} key={suggestion} onClick={handleSearch}>

                                                        {
                                                            query === ''
                                                                ? '' :
                                                                (<div className='flex items-center gap-2'>
                                                                    <ImLocation2 />
                                                                    {suggestion}
                                                                </div>)
                                                        }
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <button onClick={handleSearch} className="bg-primary w-[100px] h-full flex items-center justify-center text-white hover:text-black right-7 top-6">Search</button>
                                    </div>
                                    {status === 'loading' && <p>Loading...</p>}
                                    {status === 'failed' && <p>Error: {error}</p>}
                                    <div>
                                        <ul>
                                            {results?.map((project) => (
                                                <li key={project._id}>{project.projectName}</li>
                                                // Display other project details as needed...
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex justify-end items-end h-full">
                                <div className="flex min-w-full text-center city overflow-x-auto scroll-smooth">
                                    <div className="min-w-[200px] lg:w-full">
                                        <span className="lg:text-4xl font-semibold text-white">
                                            <CountUp start={0} end={50} duration={2} delay={0} />
                                        </span>
                                        <p className='text-sm'>YEARS OF EXPERIENCED</p>
                                    </div>
                                    <div className="lg:text-3xl flex items-center">|</div>
                                    <div className="min-w-[200px] lg:w-full">
                                        <span className="lg:text-4xl font-semibold text-white">
                                            <CountUp start={0} end={210} duration={2} delay={0} />K+
                                        </span>
                                        <p className='text-sm'>TOTAL PROPERTIES</p>
                                    </div>
                                    <div className="lg:text-3xl flex items-center">|</div>
                                    <div className="min-w-[200px] lg:w-full">
                                        <span className="lg:text-4xl font-semibold text-white">
                                            <CountUp start={0} end={450} duration={2} delay={0} />
                                        </span>
                                        <p className='text-sm'>QUALIFIED REALTORS</p>
                                    </div>
                                    <div className="lg:text-3xl flex items-center">|</div>
                                    <div className="min-w-[200px] lg:w-full">
                                        <span className="lg:text-4xl font-semibold text-white">
                                            <CountUp start={0} end={100} duration={2} delay={0} />
                                        </span>
                                        <p className='text-sm'>TOTAL BRANCHES</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default HeroSection