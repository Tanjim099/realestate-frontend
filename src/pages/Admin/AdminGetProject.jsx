import { useDispatch, useSelector } from "react-redux";
import { deleteProject, getAllProjects, setEditProject } from "../../redux/slices/projectSlice";
import { useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill, BsTrash }
    from 'react-icons/bs'
import { FiEdit } from "react-icons/fi"
import { useNavigate } from "react-router-dom";
import dateFormeter from "../../helper/dateFormeter";

function AdminGetAllProject() {
    const productList = []
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { projects } = useSelector((state) => state.project);

    const handelEdit = (id) => {
        dispatch(setEditProject(true));
        navigate(`/admin/dashboard/update-project/${id}`);
    }

    async function onLoadGetData() {
        const response = await dispatch(getAllProjects());
    }

    async function onDeleteProject(id) {
        const response = await dispatch(deleteProject(id))
    }
    useEffect(() => {
        onLoadGetData()
    }, [])
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
                                    <th scope="col">Developer</th>
                                    <th scope="col">City</th>
                                    <th scope="col">Starting Price</th>
                                    <th scope="col">PH No.</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Update</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects?.map((p, i) => (

                                    <tr key={i}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{(p.name).substring(0, 35)}</td>
                                        <td>{p.developer}</td>
                                        <td>{p.city}</td>
                                        <td>₹ {p.pricing.startingFrom}</td>
                                        <td>{p.contactInformation.phone}</td>
                                        <td>{dateFormeter(p.createdAt)}</td>
                                        <td><button onClick={() => {
                                            navigate(`/admin/dashboard/update-project/${p._id}`, { state: { ...p } })
                                        }} className="p-2 no-border bg-success text-white rounded"><FiEdit /></button></td>
                                        <td><button onClick={() => onDeleteProject(p._id)} className="p-2 no-border bg-red-500 text-white rounded"><BsTrash /></button></td>

                                    </tr>
                                ))}

                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default AdminGetAllProject