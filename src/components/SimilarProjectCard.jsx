import { NavLink } from "react-router-dom";
function SimilarProjectCard({ data }) {
    return (
        <NavLink to={`/project/${data.slug}`}>
            <div
                className='border border-border bg-dry'
            >
                <div className="h-[200px]">
                    <img className="w-full h-full object-cover border-b-2" src={data?.gallery[0]?.secure_url || "https://www.homznspace.com/wp-content/uploads/2023/11/Main-Elevation-Brigade-Sanctuary-324x235.jpg"} alt={data?.name || 'ProjectImage'} />
                </div>
                <div className="p-4 mt-2">
                    <div className="flex justify-between">
                        <span className="font-medium text-primary text-lg">₹ {data.pricing.startingFrom} Cr</span>
                        <button onClick={() => navigate(`/project/${data.slug}`, { state: data })} className="px-2 py-1 rounded-sm  border-2">Details</button>

                    </div>
                    <h3 className="project_name text-xl font-medium my-2">{(data.name.substring(0, 22))}</h3>
                    <p className="project_description text-sm">{(data?.description).substring(0, 50)}</p>
                </div>
            </div>
        </NavLink>
    )
}

export default SimilarProjectCard