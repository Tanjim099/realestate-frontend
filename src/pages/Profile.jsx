import React, { useEffect, useState } from 'react'
import HomeLayout from '../components/HomeLayout'
import { useDispatch, useSelector } from 'react-redux'
import { GrDocumentUpdate } from "react-icons/gr";
import { updateProfile } from '../redux/slices/authSlice';
import { MdDelete } from "react-icons/md";
import toast from 'react-hot-toast';

function Profile() {
  const { data, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [previewImage, setPreviewImage] = useState(null);
  const [userInput, setUserInput] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    avatar: '',
    email: '',
  });

  useEffect(() => {
    setUserInput({
      firstName: data?.firstName || '',
      lastName: data?.lastName || '',
      phone: data?.phone || '',
      avatar: data?.avatar.secure_url || '',
      email: data?.email || '',
    });
  }, [data]);

  const handelUserInput = (e) => {
    const { value, name } = e.target;
    setUserInput((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const updateImageHandler = (e) => {
    try {
      e.preventDefault();
      const uploadFile = e.target.files;
      console.log(uploadFile);
      if (uploadFile) {
        const uploadImage = uploadFile[0];
        setUserInput((prev) => ({
          ...prev,
          avatar: uploadImage,
        }));

        const fileReader = new FileReader();
        fileReader.readAsDataURL(uploadImage);
        fileReader.addEventListener('load', function () {
          setPreviewImage(this.result)
        })
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {

      const formData = new FormData();

      formData.append('firstName', userInput.firstName);
      formData.append('lastName', userInput.lastName);
      formData.append('phone', userInput.phone);
      formData.append('avatar', userInput.avatar);

      console.log('Starting...');
      const res = await dispatch(updateProfile([formData, data?._id]));
      console.log(res);

    } catch (error) {
      toast.error(error)
    }
  }

  return (
    <HomeLayout
      title={`Home 99 - ${data?.firstName} ${data?.lastName}` || "Profile"}
      description={"Best Flat in New Delhi"}
    >
      <form onSubmit={onFormSubmit}>
        <div className='max-w-[1200px] border uppercase p-4 mx-auto mt-20'>
          <div className='flex items-center justify-between'>
            <div>
              <label className='inline-block relative rounded-full w-[100px] h-[100px] border ' htmlFor="avatar">
                <img src={previewImage || userInput.avatar} className='rounded-full object-cover w-full h-full' alt='avatar' />
                <span className='absolute bottom-0 right-0 font-bold text-sm bg-white text-primary rounded-full p-2 border cursor-pointer'>
                  <GrDocumentUpdate />
                </span>
              </label>
              <input
                type='file'
                id='avatar'
                name='avatar'
                className='hidden'
                onChange={updateImageHandler}
              />
            </div>
            <div className='text-red-600 cursor-pointer flex gap-1 items-center justify-center'>
              <MdDelete />
              Delete Account
            </div>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
            <div className='my-3 flex flex-col gap-2'>
              <label htmlFor='firstName' className=''>First Name</label>
              <input
                type='text'
                id='firstName'
                name='firstName'
                value={userInput.firstName}
                className='w-full py-3 px-3 rounded border outline-0'
                placeholder='Enter First Name'
                onChange={handelUserInput}
              />
            </div>
            <div className='my-3 flex flex-col gap-2'>
              <label htmlFor='lastName' className=''>Last Name</label>
              <input
                type='text'
                id='lastName'
                name='lastName'
                className='w-full py-3 px-3 rounded border outline-0'
                value={userInput.lastName}
                placeholder='Enter Last Name'
                onChange={handelUserInput}
              />
            </div>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
            <div className='my-3 flex flex-col gap-2'>
              <label htmlFor='email' className=''>Email</label>
              <input
                type='text'
                id='email'
                name='email'
                className='w-full cursor-not-allowed text-gray-500 py-3 px-3 rounded border disabled:bg-white outline-0'
                value={userInput.email}
                placeholder='Enter Your Email'
                disabled
              />
            </div>
            <div className='my-3 flex flex-col gap-2'>
              <label htmlFor='phone' className=''>Phone Number</label>
              <input
                type='text'
                id='phone'
                name='phone'
                className='w-full py-3 px-3 rounded border outline-0'
                value={userInput.phone}
                placeholder='Enter Your Phone Number'
                onChange={handelUserInput}
              />
            </div>
          </div>
          <div className='flex justify-end'>
            <button
              type='submit'
              className='bg-primary text-xl px-3 inline-block text-white rounded h-[40px] mt-3 hover:scale-110 duration-300 ease-in-out transition-all'
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </HomeLayout>
  )
}

export default Profile