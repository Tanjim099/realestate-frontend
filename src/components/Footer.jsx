import { footerData } from '../Constants/footerData.js';
function Footer() {
    return (
        <footer className="bg-[#2b3440]">
            <div className="grid gap-10 justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-[1200px] mx-auto lg:grid-cols-4 p-10 text-neutral-content">
                {footerData.slice(0, 7).map((section, index) => (
                    <nav key={index} className="flex flex-col gap-6">
                        <header className="text-lg font-semibold">{section.title}</header>
                        {section.links.map((link, linkIndex) => (
                            <a key={linkIndex} className="text-xs link-hover">
                                {link}
                            </a>
                        ))}
                    </nav>
                ))}
                <nav className='flex flex-col gap-2'>
                    <header className="text-lg font-semibold">{footerData[7].title}</header>
                    <p>{footerData[7].address}</p>
                    <p>Phone : {footerData[7].phone}</p>
                    <p>Email : {footerData[7].email}</p>
                </nav>
            </div>
        </footer>
    )
}

export default Footer