import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../../redux/slices/statSlice";
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill, BsTrash }
    from 'react-icons/bs'
import { FiEdit } from "react-icons/fi"
import { useNavigate, useParams } from 'react-router-dom';
import { deleteBlog } from "../../redux/slices/blogSlice";
import dateFormeter from "../../helper/dateFormeter";
function AdminAllBlogs() {
    const dispatch = useDispatch();
    const { page } = useParams();
    const navigate = useNavigate();
    const [limit, setLimit] = useState(9);
    const { blogs } = useSelector((state) => state?.stat);
    async function fetchData() {
        const response = await dispatch(getBlogs({ page: parseInt(page) || 1, limit }));
    }

    const handleNextPage = () => {
        const nextPage = parseInt(page) + 1;
        dispatch(getBlogs({ page: nextPage, limit }));
        navigate(`/page/${nextPage}`);
    };


    const handlePrevPage = () => {
        const prevPage = parseInt(page) - 1;
        dispatch(getUsers({ page: prevPage, limit }));
        navigate(`/page/${prevPage}`);
    }

    async function onDeleteBlog(id) {
        const response = await dispatch(deleteBlog(id));
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
                                    <th scope="col">Title</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Author</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Edit</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody className="">
                                {blogs?.map((blog, i) => (

                                    <tr key={i}>
                                        <td scope="row">{blog.title}</td>
                                        <td>{blog.category}</td>
                                        <td><img className="w-[50px] h-[50px] rounded-full" src={blog.image.secure_url} alt="" /></td>
                                        <td>{blog.author?.firstName || "Known"}</td>
                                        <td>{dateFormeter(blog.createdAt)}</td>
                                        <td><button onClick={() => navigate(`/admin/dashboard/blogs/update/${blog._id}`, { state: blog })} className="p-2 no-border bg-green-500 text-white rounded"><FiEdit /></button></td>
                                        <td><button onClick={() => onDeleteBlog(blog._id)} className="p-2 no-border bg-red-500 text-white rounded"><BsTrash /></button></td>
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

export default AdminAllBlogs