import { useParams } from "react-router-dom";
import HomeLayout from "../components/HomeLayout";
import ProjectCard from "../components/ProjectCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProjects } from "../redux/slices/projectSlice";
import Form from "../components/Form";

function City() {
    const dispatch = useDispatch();
    const { cityname } = useParams();
    const { projects } = useSelector((state) => state.project);
    async function onLoadGetData() {
        await dispatch(getAllProjects());
    }
    const filterProject = projects?.filter((project) => {
        return cityname === project?.city?.toLowerCase();
    });
    useEffect(() => {
        onLoadGetData()
    }, [])
    return (
        <HomeLayout>
            <div className="w-[100%] md:w-[100%] lg:w-[80%] m-auto">
                <div className="flex gap-2 my-5">
                    <div className="w-[100%] md:w-[100%] lg:w-[72%] flex flex-col gap-4">
                        {
                            filterProject.length > 1 ? (

                                filterProject?.map((p, i) => {
                                    return <ProjectCard
                                        key={i}
                                        name={p.name}
                                        developer={p.developer}
                                        price={p?.pricing?.startingFrom}
                                        description={p.description}
                                        status={p.status}
                                        city={p.city}
                                        image={p?.gallery[0]?.secure_url}
                                        data={p}
                                    />
                                })

                            ) : (
                                <>
                                    <div className=" flex items-center justify-center h-[100vh]">
                                        <h4 className=" text-center">Not Found Results</h4>
                                    </div>
                                </>
                            )
                        }
                    </div>
                    <div className="w-[0%] lg:w-[28%] hidden lg:block">
                        <div className="main02_right">
                            <Form />
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}

export default City;