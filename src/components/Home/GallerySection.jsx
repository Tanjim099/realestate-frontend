import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { useSelector } from 'react-redux';
import '../../styles/GalleryStyle.css'

function GallerySection() {
    const { projects } = useSelector((state) => state.project);

    const [model, setModel] = useState(false);
    const [tempingSrc, setTempingSrc] = useState('');

    const getImage = (image) => {
        setTempingSrc(image);
        setModel(true);
    }

    return (
        <div>
            <div className={`${model ? "model open" : "model"}`}>
                <img src={tempingSrc} alt='GalleryImage' />
                <span onClick={() => setModel(false)} className='text-white cursor-pointer absolute top-5 right-4 text-4xl'><IoMdClose /></span>
            </div>
            <div className="border-b  px-5 lg:p-0">
                <div className="max-w-[1200px] mx-auto my-10">
                    <h2 className="lg:text-4xl text-3xl font-semibold text-primary border-b-2 border-primary pb-4 my-10">Gallery</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 ">
                        {
                            projects && (
                                projects.slice(0, 20).map((project, idx) => (
                                    <div onClick={() => getImage(project.gallery[0]?.secure_url)} key={idx} className="group col-span-1 relative cursor-pointer">
                                        <img src={project?.gallery[0]?.secure_url} className="lg:h-[180px] h-[100px] w-full object-cover border rounded-md" alt={project?.name || 'Gallery'} />
                                        <div className="bg-gray-50 opacity-0 hover:opacity-[.6] transition-all duration-300 ease-in-out h-full w-full absolute top-0 flex items-center justify-center">
                                            <h2 className="text-sm text-black">{project?.name}</h2>
                                        </div>
                                    </div>
                                ))
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GallerySection