import React, { useEffect, useState } from 'react'
import HomeLayout from '../../components/HomeLayout'
import { useDispatch, useSelector } from 'react-redux';
import { createBlog, updateBlog } from '../../redux/slices/blogSlice';
import Spinner from '../../components/Spinner';
import AdminLayout from '../../components/AdminLayout';
import JoditEditor from 'jodit-react';
import { useLocation } from 'react-router-dom';

function UpdateBlog() {
    const { state } = useLocation();
    console.log(state);
    const [loading, setLoading] = useState(false);
    const { data } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [previwImage, setPreviewImage] = useState('');
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    function setInitialData() {
        setTitle(state?.title);
        setCategory(state?.category);
        setContent(state?.content);
        setDescription(state?.description);
        setPreviewImage()

    }

    const inputUser = (e) => {
        const { value, name } = e.target;

        setUserInput((prev) => ({
            ...prev,
            [name]: value
        }));

    }

    const imageUpload = (e) => {
        const uploadImage = e.target.files[0];
        if (uploadImage) {
            setImage((prev) => ({
                ...prev,
                image: uploadImage
            }));

            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadImage);

            fileReader.addEventListener('load', function () {
                setPreviewImage(this.result);
            })

        }
    }

    const onFormSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            const formData = new FormData();

            formData.append("title", title);
            formData.append("category", category);
            formData.append("description", description);
            formData.append("content", content);
            formData.append("author", state?.author?._id)
            formData.append("image", image);

            const res = await dispatch(updateBlog([state?._id, formData]));

            if (res?.payload?.success) {
                setUserInput({
                    title: '',
                    category: '',
                    description: '',
                    content: '',
                    author: '',
                    image: '',
                })

                setPreviewImage('');
            }

            setLoading(false);

        } catch (Error) {
            console.log(Error);
        }
    }
    console.log(state)
    const editorConfig = {
        // JoditEditor customization options
        readonly: false,   // Set to true if you want to make the editor read-only
        minHeight: 500,     // Minimum height of the editor
        buttons: 'bold,italic,underline,|,ul,ol,|,outdent,indent,|,image,video,link',  // Customize toolbar buttons
        toolbarAdaptive: false,  // Disable adaptive toolbar
        askBeforePasteHTML: false,  // Disable confirmation before pasting HTML

        // You can add more customization options based on your needs
    };

    useEffect(() => {
        setInitialData();
    }, []);
    return (
        <AdminLayout>
            <div className="w-full flex justify-between gap-5">
                <div className='w-[70%]'>
                    <div className='w-full '>
                        <label htmlFor="title">Title</label>
                        <input
                            className='w-full p-2 rounded-sm outline-none text-xl mt-1'
                            style={{ border: "1px solid gray" }}
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder='title' />
                    </div>
                    <div className='mt-4'>
                        <label htmlFor='content'>Content<sup className='text-pink-400'>*</sup></label>
                        <JoditEditor
                            type='text'
                            name='content'
                            id='content'
                            config={editorConfig}
                            className='w-full py-3 px-3 rounded border outline-0 min-h-[200px] resize-none mt-1'
                            value={content}
                            placeholder='Enter Blog Description'
                        />
                    </div>
                    <div className='flex flex-col mt-4'>
                        <label htmlFor="description">Description</label>
                        <textarea
                            className=' outline-none rounded-sm p-2 mt-1'
                            style={{ border: "1px solid gray" }}
                            name=""
                            id=""
                            cols="30"
                            rows="10"
                            placeholder='description...'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        >
                        </textarea>
                    </div>
                </div>
                <div className='w-[30%]'>
                    <div className='flex flex-col w-full'>
                        <label htmlFor="category">Category</label>
                        <input
                            className='w-full p-2 rounded-sm outline-none text-xl mt-1 '
                            style={{ border: "1px solid gray" }}
                            type="text"
                            name='category'
                            id='category'
                            placeholder='category...'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </div>
                    <div className='w-full mt-4'>
                        <label htmlFor="image" className='btn'>
                            {
                                image ? image.name : "Upload Image"
                            }
                            <input
                                type="file"
                                name="image"
                                id="image"
                                onChange={imageUpload}
                            />
                        </label>
                    </div>
                    <div>
                        {image ? (
                            <img src="" alt="" />
                        ) : (
                            <div>
                                <img src={state?.image?.secure_url} alt="" />
                            </div>
                        )}
                    </div>
                    <div>
                        <button onClick={onFormSubmit} className=' bg-[#007aff] w-full rounded-md  text-white p-2 mt-5'>Create Blog</button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default UpdateBlog;