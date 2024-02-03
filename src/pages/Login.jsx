import React, { useState } from 'react'
import HomeLayout from '../components/HomeLayout'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { FaArrowLeftLong } from "react-icons/fa6";
import itemsImage from '../assets/items1.jpg';
import { isEmail, isPassword } from '../helper/regexMatcher';

function Login() {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userInput, setUserInput] = useState({
        email: '',
        password: '',
    });

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
            if (!userInput.email || !userInput.password) {
                toast.error('All field are mandatory...');
            }
            console.log(isEmail(userInput.email));
            if (!isEmail(userInput.email)) {
                toast.error('Invalid Email');
                return;
            }
            if (!isPassword(userInput.password)) {
                toast.error('Password should be 6 - 16 character long with atleast a number and special character');
                return;
            }
            setLoading(true);

            const res = await dispatch(login(userInput));

            if (res?.payload?.success) {
                navigate('/');
            }

            setUserInput({
                email: '',
                password: '',
            });
            setLoading(false);

        } catch (Error) {
            toast.error(Error);
        }
    }

    return (
        <HomeLayout
            title={"Home 99 - Login"}
            description={"Best Flat in New Delhi"}
        >
            <div className='flex items-center flex-col justify-center min-h-screen my-4'>
                {
                    loading
                        ? (<Spinner />)
                        : (
                            <div className='grid grid-cols-1 lg:grid-cols-6 p-3'>
                                <div className='col-span-3  min-h-[200px]'>
                                    <img src={itemsImage} alt='LoginImage' className='h-full' />
                                </div>
                                <div className='col-span-3'>
                                    <form onSubmit={onFormSubmit} className='border min-h-[200px] p-4'>
                                        <Link onClick={() => navigate(-1)}><FaArrowLeftLong /></Link>
                                        <h2 className='text-3xl font-mono mt-3 border-primary border-b-2'>Login Form</h2>
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
                                            <label htmlFor='password' className=''>Password <sup className='text-pink-400'>*</sup></label>
                                            <input
                                                type={`${!showPassword ? 'password' : 'text'}`}
                                                id='password'
                                                name='password'
                                                className='w-full py-3 px-3 rounded border outline-0 relative'
                                                placeholder='Enter Your Password'
                                                onChange={handelUserInput}
                                                value={userInput.password}
                                            />
                                            <span onClick={() => setShowPassword((prev) => !prev)} className='absolute right-3 top-[45px] cursor-pointer'>
                                                {
                                                    !showPassword ? (<FaEye className='text-2xl' />) : (<FaEyeSlash className='text-2xl' />)
                                                }
                                            </span>
                                        </div>
                                        <div className='italic text-blue-600 underline'>
                                            <Link to={'/forgot-password'}>Forgot Password</Link>
                                        </div>
                                        <div className='flex justify-end'>
                                            <button
                                                type='submit'
                                                className='bg-primary text-xl w-[140px] inline-block text-white rounded h-[40px] mt-3 hover:bg-primary hover:scale-110 duration-300 ease-in-out transition-all'
                                            >
                                                Login
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )
                }
            </div>
        </HomeLayout>
    )
}

export default Login