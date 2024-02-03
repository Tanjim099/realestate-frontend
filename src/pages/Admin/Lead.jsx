import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../../components/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllContact, updateCheckedItems } from "../../redux/slices/statSlice";
import dateFormeter from "../../helper/dateFormeter";

function Lead() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [checkMap, setCheckMap] = useState({}); // State to track checked items and their colors
    const { page } = useParams();
    const [limit, setLimit] = useState(9);
    const { leads, checkedItems } = useSelector((state) => state?.stat);
    const handleNextPage = () => {
        const nextPage = parseInt(page) + 1;
        dispatch(getAllContact({ page: nextPage, limit }));
        navigate(`/admin/dashboard/leads/page/${nextPage}`);
    };

    const handlePrevPage = () => {
        const prevPage = parseInt(page) - 1;
        dispatch(getAllContact({ page: prevPage, limit }));
        navigate(`/admin/dashboard/leads/page/${prevPage}`);
    }

    const handleCheckboxChange = (leadId) => {
        dispatch(updateCheckedItems({ leadId }));
    };

    async function fetchData() {
        const response = await dispatch(getAllContact({ page: parseInt(page) || 1, limit }));
    }

    useEffect(() => {
        fetchData();
    }, [page]);

    useEffect(() => {
        dispatch(updateCheckedItems({}));
    }, []);
    return (
        <AdminLayout>
            <div className="min-h-[80vh] relative">
                <div className="flex flex-col gap-4">
                    {leads?.map((lead) => (
                        <div
                            key={lead._id} // Make sure each item has a unique key
                            className={`bg-slate-100 shadow-sm flex items-center justify-between h-[50px] px-5 ${checkMap[lead.id] ? 'checked' : '' // Apply custom style for checked items
                                }`}
                        >
                            <div className="w-[20%] flex items-center justify-start">
                                <p style={{ color: checkMap[lead._id] ? 'red' : 'black' }}>{lead.name}</p>
                            </div>
                            <div className="w-[20%]">
                                <p className="">{lead.email}</p>
                            </div>
                            <div className="w-[20%]">
                                <p>{lead.phone}</p>
                            </div>
                            <div className="w-[30%]">
                                <p className="">Adarsh Parkland</p>
                            </div>
                            <div>
                                <p>{dateFormeter(lead?.createdAt)}</p>
                            </div>
                            <div className="w-[10%] flex items-center justify-end">
                                <input
                                    className=""
                                    type="checkbox"
                                    name=""
                                    id=""
                                    onChange={() => handleCheckboxChange(lead._id)}
                                    checked={checkMap[lead._id]}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-end items-center gap-4 mt-2 absolute bottom-0 right-0">
                    <button
                        className="btn btn-outline py-1 px-2 h-[30px] min-h-[30px] rounded-md"
                        variant="contained"
                        onClick={handlePrevPage}
                        disabled={page === 1}
                    >
                        Previous
                    </button>
                    <span>{page}</span>
                    <button
                        className="btn btn-outline py-1 px-2 h-[30px] min-h-[30px] rounded-md"
                        variant="contained"
                        onClick={handleNextPage}
                    >
                        Next
                    </button>
                </div>
            </div>
        </AdminLayout>
    );
}

export default Lead;
