import Navbar from './Navbar';
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { FaFacebookSquare, FaInstagramSquare, FaLinkedin, FaWhatsappSquare } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import MobileSecondNavbar from './MobileSecondNavbar';

function HomeLayout({ children, title, description, keywords, author }) {
    return (
        <div>
            <Helmet>
                <meta name='description' content={description} />
                <meta name='keywords' content={keywords} />
                <meta name='author' content={author} />
                <title>{title}</title>
            </Helmet>
            <Navbar />
            <main className=" min-h-[90vh]">
                {children}
                <div className=' fixed top-80 z-50 right-0'>
                    <div className=' text-4xl flex flex-col gap-1 cursor-pointer'>
                        <NavLink><FaFacebookSquare className=' text-blue-600 bg-white p-1 ' /></NavLink>
                        <NavLink><FaInstagramSquare className=' text-[#E4405F] bg-white p-1' /></NavLink>
                        <NavLink><FaLinkedin className=' text-[#0A66C2] bg-white p-1 ' /></NavLink>
                        <NavLink><FaWhatsappSquare className=' text-[#42d957] bg-white p-1' /></NavLink>
                    </div>
                </div>
            </main>
            <Footer />
            <div className='sticky bottom-0 z-50 block lg:hidden md:hidden sm:block'>
                <MobileSecondNavbar />
            </div>
        </div>
    )
}

export default HomeLayout