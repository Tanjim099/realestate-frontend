import { useState } from "react";
import { createContact } from "../redux/store";
import { useDispatch } from "react-redux";
import telephonecall from "../assets/telephone-call.png";
import house from "../assets/house.png";
import rupees from "../assets/rupees.png";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { BiSolidPhoneCall } from "react-icons/bi";
import { NavLink } from "react-router-dom";

function Form({ projectName }) {
    const dispatch = useDispatch();
    const [userInput, setUserInput] = useState({
        name: '',
        phone: '',
        email: '',
        interested: '',
        projectName: projectName || "Home Page",
    });
    const handelInput = (e) => {
        const { value, name } = e.target;
        setUserInput((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();
        await dispatch(createContact(userInput));


    }
    return (
        <div className="contactformbox w-full bg-[#8ed1fc] p-5 rounded-md sticky top-10">
            <div className="flex flex-col items-center justify-center gap-2">
                <h3 id="contactformbox_title" className="text-center text-lg">Get Instant Call Back</h3>
            </div>
            <div className="contactformbox_box1 flex items-center justify-between mt-5">
                <div className="flex flex-col items-center justify-between">
                    <img className="w-[30px]" src={telephonecall} alt />
                    <p className="text-sm">24/7 Support</p>
                </div>
                <div className="flex flex-col items-center justify-between">
                    <img className="w-[30px]" src={house} alt />
                    <p className="text-sm">Free Visit</p>
                </div>
                <div className="flex flex-col items-center justify-between">
                    <img className="w-[30px]" src={rupees} alt />
                    <p className="text-sm">Unmatched Price</p>
                </div>
            </div>
            <form onSubmit={onFormSubmit} action className="contactform contactformbox_box2 flex mt-5 flex-col items-center justify-between gap-3">
                <h3 className=" text-lg font-medium">Home99</h3>
                <input name="name" value={userInput.name} onChange={handelInput} type="text" placeholder="Name" className="w-full px-2 py-1 rounded-sm outline-none" id="second" />
                <input name="phone" value={userInput.phone} onChange={handelInput} type="text" placeholder="+91 - " className="w-full px-2 py-1 rounded-sm outline-none" />
                <input name="email" value={userInput.email} onChange={handelInput} type="email" placeholder="Email" className="w-full px-2 py-1 rounded-sm outline-none" />
                <select name="interested" value={userInput.interested} onChange={handelInput} className="w-full p-1 rounded-sm outline-none">
                    <option value>Interested for Site Visit?</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
                <button type="submit" className=" bg-cyan-900 w-full p-1 text-white rounded-sm">Enquire Now</button>
            </form>
            <div className="contactformbox_box2 flex items-center justify-between mt-2">
                <NavLink to="tel:919900112233" className="flex items-center gap-1">
                    <BiSolidPhoneCall className=" text-lg text-green-600" />
                    <p className="text-sm text-green-600 font-medium">Call</p>
                </NavLink>
                <NavLink to="https://wa.me/552196312XXXX" className="flex items-center gap-1">
                    <FaSquareWhatsapp className=" text-lg text-green-600" />
                    <p className="text-sm text-green-600 font-medium">WhatsApp</p>
                </NavLink>
            </div>
        </div>
    )
}

export default Form