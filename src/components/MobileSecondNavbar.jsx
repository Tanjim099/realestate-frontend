import React from 'react';
import { BiSolidPhoneCall } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { FaSquareWhatsapp } from "react-icons/fa6";
import Form from './Form';

function MobileSecondNavbar() {
    return (
        <>
            <div className='flex justify-between items-center bg-primary text-white p-2'>
                <div className='flex items-center gap-1'>
                    <BiSolidPhoneCall />
                    <span>Call</span>
                </div>|
                <div className='flex items-center gap-1'>
                    <MdEmail />
                    <span onClick={() => document.getElementById('my_modal_2').showModal()}>Inquiry</span>
                </div>|
                <div className='flex items-center gap-1'>
                    <FaSquareWhatsapp />
                    <span>WhatsApp</span>
                </div>
            </div>
            {/* =================== */}
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box p-1 w-[90%] md:w-[50%] lg:w-[25%] rounded-md bg-cyan-900">
                    <form method="dialog" className="modal-backdrop">
                        <button className="btn btn-sm btn-circle btn-ghost absolute text-black right-2 top-2 z-50">✕</button>
                    </form>
                    <Form />
                </div>
            </dialog>
            {/* =================== */}
        </>
    )
}

export default MobileSecondNavbar