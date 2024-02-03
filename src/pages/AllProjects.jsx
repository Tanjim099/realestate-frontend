import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAllProjectsByPage } from "../redux/slices/projectSlice";
import HomeLayout from "../components/HomeLayout";
import ProjectCard from "../components/ProjectCard";
import Form from "../components/Form";

function AllProjects() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { page } = useParams();
    const [limit, setLimit] = useState(10);
    const { projectByPage } = useSelector((state) => state?.project);
    async function fetchData() {
        const response = await dispatch(getAllProjectsByPage({ data: parseInt(page) || 1, data: limit }));
    }

    const handleNextPage = () => {
        const nextPage = parseInt(page) + 1;
        dispatch(getAllProjectsByPage({ page: nextPage, limit }));
        navigate(`/projects/page/${nextPage}`);
    };


    const handlePrevPage = () => {
        const prevPage = parseInt(page) - 1;
        dispatch(getAllProjectsByPage({ page: prevPage, limit }));
        navigate(`/projects/page/${prevPage}`);
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <HomeLayout
            title={"Home 99 - All Projects"}
            description={"Best Flat in New Delhi"}
        >
            <div className="w-[100%] md:w-[100%] lg:w-[80%] m-auto">
                <div className="flex gap-2 my-5">
                    <div className="w-[100%] md:w-[100%] lg:w-[72%] flex flex-col gap-4">
                        <div className="flex flex-col gap-4">
                            {
                                projectByPage?.map((p, i) => {
                                    return <ProjectCard
                                        key={i}
                                        name={p.name}
                                        developer={p.developer}
                                        price={p?.pricing?.startingFrom}
                                        description={p.description}
                                        status={p.status}
                                        city={p.city}
                                        image={p?.gallery[0]?.secure_url}
                                        area={p?.projectArea}
                                        data={p}
                                    />
                                })
                            }
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="flex justify-end items-center gap-4 mt-2">
                                <button className="btn btn-outline py-1 px-2 h-[30px] min-h-[30px] rounded-md" variant="contained" onClick={handlePrevPage} disabled={page === 1}>
                                    Previous
                                </button>
                                <span>{page}</span>
                                <button className="btn btn-outline py-1 px-2 h-[30px] min-h-[30px] rounded-md" variant="contained" onClick={handleNextPage}>
                                    Next
                                </button>
                            </div>
                        </div>
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

export default AllProjects