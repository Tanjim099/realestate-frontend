import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../redux/slices/authSlice';
import HomeLayout from '../components/HomeLayout';
import Spinner from '../components/Spinner';
import itemsImage from '../assets/items1.jpg';

function ForgotPassword() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [userInput, setUserInput] = useState({
        email: '',
        answer: '',
        newPassword: '',
    });

    console.log(userInput);

    const handelUserInput = (e) => {
        const { value, name } = e.target;
        setUserInput((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const onFormSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            const res = await dispatch(forgotPassword(userInput));
            setUserInput({
                email: '',
                answer: '',
                newPassword: '',
            })
            if (res?.payload?.success) {
                navigate('/login');
            }
            setLoading(false);
        } catch (Error) {
            alert(Error)
        }
    }

    return (
        <HomeLayout
            title={"Home 99 - Forget Password"}
            description={"Best Flat in New Delhi"}
        >
            <div className='flex items-center justify-center h-screen'>
                {
                    loading
                        ?
                        (
                            <Spinner />
                        )
                        :
                        (
                            <div className='grid grid-cols-1 lg:grid-cols-6 p-3'>
                                <div className='col-span-3  min-h-[200px]'>
                                    <img src={itemsImage} alt='LoginImage' className='h-full' />
                                </div>
                                <form onSubmit={onFormSubmit} className='col-span-3 h-[450px] border rounded p-5'>
                                    <Link onClick={() => navigate(-1)}><FaArrowLeftLong /></Link>
                                    <h2 className='text-3xl font-mono mt-3 border-[#7f1657] border-b-2'>Forgot Password</h2>
                                    <div className='my-3 flex flex-col gap-2'>
                                        <label htmlFor='email' className=''>Email <sup className='text-pink-400'>*</sup></label>
                                        <input
                                            type='text'
                                            id='email'
                                            name='email'
                                            className='w-full py-3 px-3 rounded border outline-0'
                                            placeholder='Enter Your Email'
                                            onChange={handelUserInput}
                                            value={userInput.email}
                                        />
                                    </div>
                                    <div className='my-3 flex flex-col gap-2 relative'>
                                        <label htmlFor='newPassword' className=''>New Password <sup className='text-pink-400'>*</sup></label>
                                        <input
                                            type={`${!showPassword ? 'password' : 'text'}`}
                                            id='newPassword'
                                            name='newPassword'
                                            className='w-full py-3 px-3 rounded border outline-0 relative'
                                            placeholder='Enter Your New Password'
                                            onChange={handelUserInput}
                                            value={userInput.newPassword}
                                        />
                                        <span onClick={() => setShowPassword((prev) => !prev)} className='absolute right-3 top-[45px] cursor-pointer'>
                                            {
                                                !showPassword ? (<FaEye className='text-2xl' />) : (<FaEyeSlash className='text-2xl' />)
                                            }
                                        </span>
                                    </div>
                                    <div className='my-3 flex flex-col gap-2'>
                                        <label htmlFor='answer' className=''>Answer <sup className='text-pink-400'>*</sup></label>
                                        <input
                                            type='text'
                                            id='answer'
                                            name='answer'
                                            className='w-full py-3 px-3 rounded border outline-0'
                                            placeholder='Enter Your Answer'
                                            onChange={handelUserInput}
                                            value={userInput.answer}
                                        />
                                    </div>
                                    <div className='flex justify-end'>
                                        <button
                                            type='submit'
                                            className='bg-primary text-xl w-[200px] inline-block text-white rounded h-[40px] mt-3 hover:bg-primary hover:scale-110 duration-300 ease-in-out transition-all'
                                        >
                                            Forgot Password
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )
                }
            </div>
        </HomeLayout>
    )
}

export default ForgotPassword