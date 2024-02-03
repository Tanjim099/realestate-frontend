import { Navigate, useNavigate } from "react-router-dom"

function NotFound() {
    const navigate = useNavigate()
    return (
        <div className="h-screen w-full flex flex-col justify-center items-center">
            <h1 className="text-9xl font-extrabold text-black">404</h1>
            <div className="bg-white text-black absolute px-2 text-sm rounded rotate-12">
                Page not found ...
            </div>
            <button className="mt-5">
                <a onClick={() => navigate(-1)} className="relative inline-block text-sm font-medium active:text-yellow-500 focus:outline-non">
                    <span className="relative block px-8 py-3 bg-[#1A2238] border border-current text-white">Go back</span>
                </a>
            </button>
        </div>
    )
}

export default NotFound