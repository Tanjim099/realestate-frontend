import React, { useState } from 'react'
import HomeLayout from '../components/HomeLayout'
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from 'react-redux';
import { register, sendOTP } from '../redux/slices/authSlice';
import Spinner from '../components/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function VerifyEmail() {
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState(null);
    const { signData } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFormSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            const {
                firstName,
                lastName,
                email,
                phone,
                answer,
                password,
                avatar,
            } = signData;

            const formData = new FormData();

            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            formData.append('email', email);
            formData.append('phone', phone);
            formData.append('answer', answer);
            formData.append('avatar', avatar);
            formData.append('otp', otp);
            formData.append('password', password);

            const res = await dispatch(register(formData));
            navigate('/login');
            setLoading(false);


        } catch (Error) {
            toast.error(Error)
        }
    }

    async function handleOtpSend(signData) {
        await dispatch(sendOTP(signData))
    }

    return (
        <HomeLayout>
            <div className='flex items-center  justify-center min-h-screen'>
                {
                    loading
                        ? (<Spinner />)
                        : (<form className='border-4 p-5' onSubmit={onFormSubmit}>
                            <h2 className='font-semibold border-b-4 pb-4 border-primary text-primary text-4xl'>Veify Email</h2>
                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                containerStyle="otp-container"
                                renderInput={(props) => <input {...props} placeholder='-' style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }} className="w-[60px] border-0 m-1 mb-3 bg-gray-100 mt-10 rounded-[0.5rem] text-black aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50" />}
                            />
                            <div className='flex justify-between'>
                                <button className='mt-5' onClick={() => handleOtpSend(signData.email)}>Resend Otp</button>
                                <button
                                    type='submit'
                                    className='bg-primary text-xl w-[140px] inline-block text-white rounded h-[40px] mt-3 hover:bg-[#7f1639] hover:scale-110 duration-300 ease-in-out transition-all'
                                >
                                    Verify
                                </button>
                            </div>
                        </form>)
                }
            </div>
        </HomeLayout>
    )
}

export default VerifyEmail