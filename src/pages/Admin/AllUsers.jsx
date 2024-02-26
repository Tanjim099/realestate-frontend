import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../../redux/slices/statSlice";
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill, BsTrash }
    from 'react-icons/bs'
import { FiEdit } from "react-icons/fi"
import { useNavigate, useParams } from 'react-router-dom';
import dateFormeter from "../../helper/dateFormeter";
function AllUsers() {
    const dispatch = useDispatch();
    const { page } = useParams();
    const navigate = useNavigate();
    const [limit, setLimit] = useState(9);
    const { users } = useSelector((state) => state?.stat);
    const projects = [];
    async function fetchData() {
        await dispatch(getUsers({ page: parseInt(page) || 1, limit }));
    }

    const handleNextPage = async () => {
        const nextPage = parseInt(page) + 1;
        await dispatch(getUsers({ page: nextPage, limit }));
        navigate(`/admin/dashboard/users/page/${nextPage}`);
    };


    const handlePrevPage = async () => {
        const prevPage = parseInt(page) - 1;
        await dispatch(getUsers({ page: prevPage, limit }));
        navigate(`/admin/dashboard/users/page/${prevPage}`);
    }


    async function onDeleteUser(id) {
        const response = await dispatch(deleteUser(id));
        if (response?.payload?.success === true) {
            fetchData();
        }
    }
    useEffect(() => {
        fetchData();
    }, [page, limit])
    return (
        <AdminLayout>
            <div className='product-grid-container'>
                <div className="ProductContainer">
                    <div className="w-100">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">S No.</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Total Post</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody className="">
                                {users?.map((user, i) => (

                                    <tr>
                                        <th key={i} scope="row">{i + 1}</th>
                                        <td>{user.firstName} {user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.role}</td>
                                        <td>{user.posts || 0}</td>
                                        <td>{dateFormeter(user.createdAt)}</td>
                                        <td><button onClick={() => onDeleteUser(user._id)} className="p-2 no-border bg-red-500 text-white rounded"><BsTrash /></button></td>

                                    </tr>
                                ))}

                            </tbody>
                        </table>

                    </div>
                </div>
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

        </AdminLayout>
    )
}

export default AllUsers