import { useNavigate } from "react-router-dom";
import HomeLayout from "./HomeLayout";

function ProjectCard({ name, developer, price, description, status, city, image, area, data }) {
    const navigate = useNavigate();
    return (
        <div className="w-[100%]flex items-center ">
            <div className="flex flex-col md:flex-row lg:flex-row gap-2  bg-white p-3 rounded-md shadow">
                <div className="w-[100%] md:w-[30%] lg:w-[30%]">
                    <img className="w-full h-[100%] rounded-md" src={image || "https://assets-news.housing.com/news/wp-content/uploads/2022/03/15102726/Vastu-for-flats-in-apartments.jpg"} alt="" />
                </div>
                <div className="w-[100%] md:w-[70%]  lg:w-[70%]">
                    <h3 className=" text-lg">{(name).substring(0, 70)} ...</h3>
                    <h4 className=" font-medium text-gray-500">{developer}</h4>
                    <h4 className=" font-medium my-1"> Starting at ₹ {price}</h4>
                    <p className=" text-sm hidden lg:block">{(description).substring(0, 250)} <span onClick={() => navigate(`/project/${data.slug}`, { state: data })} className="underline underline-offset-1 cursor-pointer">View more</span></p>
                    <div className="lg:flex lg:justify-between grid grid-cols-3 mt-1 gap-y-2">
                        <div>
                            <p className="font-medium text-sm">Appartments</p>
                            <p className="font-medium text-gray-500 text-xs">2,3 BHK</p>
                        </div>
                        <div>
                            <p className="font-medium text-sm">Area</p>
                            <p className="font-medium text-gray-500 text-xs">{area}</p>
                        </div>
                        <div>
                            <p className="font-medium text-sm">Status</p>
                            <p className="font-medium text-gray-500 text-xs">{status}</p>
                        </div>
                        <div>
                            <p className="font-medium text-sm">City</p>
                            <p className="font-medium text-gray-500 text-xs">{city}</p>
                        </div>
                        <div className=" flex items-center">
                            <button
                                className=" bg-primary px-2 py-1 border-2 text-white rounded-md hover:bg-transparent hover:text-black"
                                onClick={() => navigate(`/project/${data.slug}`, { state: data })}
                            >
                                View Details
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProjectCard;