import React, { useEffect, useRef, useState } from 'react'
import { CiCirclePlus } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { createNewProject, updateProject } from '../../redux/slices/projectSlice';
import toast from 'react-hot-toast';
import JoditEditor from 'jodit-react';
import Spinner from '../../components/Spinner';
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { IoMdClose } from "react-icons/io";
import { isEmail } from '../../helper/regexMatcher';

function CreateProject() {
    const [loading, setLoading] = useState(false);
    const [galleryImages, setGalleryImages] = useState([]);
    const [floorImages, setFloorImages] = useState([]);
    const [amenitieImages, setAmenitiesImages] = useState([]);
    const [floorchips, setFloorChips] = useState([]);
    const [amenitiechips, setAmenitieChips] = useState([]);
    const [floorPriceChips, setFloorPriceChips] = useState([]);
    const [dimensionschips, setDimensionsChips] = useState([]);
    const [publcId, setPublcId] = useState({ ids: [] });
    const editorConfig = {
        minHeight: '500px', // Set your desired height here
    };

    const editor = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { editProject, project } = useSelector((state) => state.project);

    const [projectCreateData, setProjectCreateData] = useState({
        name: '',
        location: '',
        developer: '',
        description: '',
        specifications: '',
        startingFrom: '',
        currency: '',
        email: '',
        phone: '',
        city: '',
        map: '',
        projectArea: '',
        possessionOn: '',
        projectType: '',
        reraNo: '',
        title: "",
        keywords: "",
        content: '',
        status: '',
        checkStatus: '',
    });

    useEffect(() => {
        if (editProject && project) {
            setProjectCreateData(prevData => ({
                ...prevData,
                name: project.name,
                location: project.location,
                developer: project.developer,
                description: project.description,
                specifications: project.specifications,
                startingFrom: project.pricing?.startingFrom,
                currency: project.pricing?.currency,
                email: project.contactInformation?.email,
                phone: project.contactInformation?.phone,
                city: project.city,
                content: project.content,
                map: project.map,
                projectArea: project.projectArea,
                possessionOn: project.possessionOn,
                projectType: project.projectType,
                reraNo: project.reraNo,
                title: project.title,
                keywords: project.keywords
            }));

            setGalleryImages(project.gallery.map((item) => item.secure_url));

            setFloorImages(project.floorPlan.map((item) => item.image.secure_url));
            setFloorChips(project.floorPlan.map((item) => item.types));
            setDimensionsChips(project.floorPlan.map((item) => item.dimensions));
            setFloorPriceChips(project.floorPlan.map((item) => item.floorPrice));

            setAmenitiesImages(project.amenities.map((item) => item.image.secure_url));
            setAmenitieChips(project.amenities.map((item) => item.name));

        }
    }, [editProject, project]);

    const handleGalleryImage = (e) => {
        e.preventDefault();
        let uploadImages = e.target.files;

        if (uploadImages.length > 0) {
            const fileReaderArray = Array.from(uploadImages).map((image) => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(image);

                return new Promise((resolve) => {
                    fileReader.onload = () => {
                        resolve({
                            dataURL: fileReader.result,
                            file: image,
                        });
                    };
                });
            });

            Promise.all(fileReaderArray).then((results) => {
                setGalleryImages((prev) => [...prev, ...results]);
            });
        }
    };

    const removeGalleryImage = (idx) => {
        const updatedImages = [...galleryImages.slice(0, idx), ...galleryImages.slice(idx + 1)];
        setGalleryImages(updatedImages);
    }

    const removeFloorImage = (idx) => {

        setPublcId((prev) => ({
            ...prev,
            ids: [...prev.ids, project?.floorPlan[idx]?.image?.public_id],
        }));

        const updateImages = [...floorImages.slice(0, idx), ...floorImages.slice(idx + 1)];
        const updateChips = [...floorchips.slice(0, idx), ...floorchips.slice(idx + 1)];
        const updatePrice = [...floorPriceChips.slice(0, idx), ...floorPriceChips.slice(idx + 1)];
        const updateDimensionschips = [...dimensionschips.slice(0, idx), ...dimensionschips.slice(idx + 1)];

        setFloorImages(updateImages);
        setFloorChips(updateChips);
        setFloorPriceChips(updatePrice);
        setDimensionsChips(updateDimensionschips);
    }

    const removeAmenitieImage = (idx) => {
        const updateImages = [...amenitieImages.slice(0, idx), ...amenitieImages.slice(idx + 1)];
        const updateChips = [...amenitiechips.slice(0, idx), ...amenitiechips.slice(idx + 1)];

        setAmenitiesImages(updateImages);
        setAmenitieChips(updateChips);
    }

    const handelFloorPlanImage = (e) => {
        try {
            e.preventDefault();
            let uploadImage = e.target.files;

            if (uploadImage.length > 0) {
                const fileReaderArray = Array.from(uploadImage).map((image) => {
                    const fileReader = new FileReader();
                    fileReader.readAsDataURL(image);

                    return new Promise((resolve) => {
                        fileReader.onload = () => {
                            resolve({
                                dataURL: fileReader.result,
                                file: image,
                            });
                        };
                    });
                });

                Promise.all(fileReaderArray).then((result) => {
                    setFloorImages((prev) => [...prev, ...result]);
                });
            }

        } catch (Error) {
            toast.error(Error)
        }
    }

    const handelFloorKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ",") {
            event.preventDefault();
            const chipValue = event.target.value.trim();

            if (chipValue && !amenitiechips.includes(chipValue)) {
                const newChips = [...floorchips, chipValue];
                setFloorChips(newChips);
                event.target.value = "";
            }

        }

    }

    const handelAmenitieKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ",") {
            event.preventDefault();
            const chipValue = event.target.value.trim();

            if (chipValue && !amenitiechips.includes(chipValue)) {
                const newChips = [...amenitiechips, chipValue];
                setAmenitieChips(newChips);
                event.target.value = "";
            }

        }

    }

    const handelDimensionsDown = (event) => {
        if (event.key === 'Enter' || event.key === ",") {
            event.preventDefault();
            const chipValue = event.target.value.trim();

            if (chipValue && !amenitiechips.includes(chipValue)) {
                const newChips = [...dimensionschips, chipValue];
                setDimensionsChips(newChips);
                event.target.value = "";
            }

        }

    }

    const handelFloorPriceDown = (event) => {
        if (event.key === 'Enter' || event.key === ",") {
            event.preventDefault();
            const chipValue = event.target.value.trim();

            if (chipValue && !amenitiechips.includes(chipValue)) {
                const newChips = [...floorPriceChips, chipValue];
                setFloorPriceChips(newChips);
                event.target.value = "";
            }

        }

    }

    const handelAmenitiesImage = (e) => {
        try {
            e.preventDefault();
            const uploadImage = e.target.files;

            if (uploadImage.length > 0) {
                const fileReaderArray = Array.from(uploadImage).map((image) => {
                    const fileReader = new FileReader();
                    fileReader.readAsDataURL(image);

                    return new Promise((resolve) => {
                        fileReader.onload = () => {
                            resolve({
                                dataURL: fileReader.result,
                                file: image,
                            });
                        };
                    });
                });

                Promise.all(fileReaderArray).then((result) => {
                    setAmenitiesImages((prev) => [...prev, ...result]);
                });

            };

        } catch (Error) {
            toast.error(Error)
        }
    }

    const userInput = (e) => {
        const { value, name } = e.target;

        setProjectCreateData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const contantField_1 = (data) => {
        setProjectCreateData((prev) => ({
            ...prev,
            content: data,
        }));
    }

    const contantField_2 = (data) => {
        setProjectCreateData((prev) => ({
            ...prev,
            specifications: data,
        }));
    }
    async function onFormSubmit(e) {
        try {
            e.preventDefault();
            if (editProject) {
                setLoading(true);
                if (!projectCreateData.name || !projectCreateData.location || !projectCreateData.developer ||
                    !projectCreateData.description || !projectCreateData.startingFrom
                    || !projectCreateData.currency || !projectCreateData.email
                    || !projectCreateData.phone || !projectCreateData.specifications ||
                    !projectCreateData.city
                    || !projectCreateData.content
                    || !projectCreateData.status || !projectCreateData.map || !projectCreateData.projectArea
                    || !projectCreateData.projectType || !projectCreateData.title
                ) {
                    toast.error('Filed are all mandatory...');
                    return;
                }
                const formData = new FormData();
                formData.append('name', projectCreateData.name);
                formData.append('location', projectCreateData.location);
                formData.append('developer', projectCreateData.developer);
                formData.append('description', projectCreateData.description);
                formData.append('startingFrom', projectCreateData.startingFrom);
                formData.append('specifications', projectCreateData.specifications);
                formData.append('currency', projectCreateData.currency);
                formData.append('email', projectCreateData.email);
                formData.append('phone', projectCreateData.phone);
                formData.append('city', projectCreateData.city);
                formData.append('content', projectCreateData.content);
                formData.append('publicIds', JSON.stringify(publcId));
                formData.append('status', projectCreateData.status);
                formData.append('checkStatus', projectCreateData.checkStatus);

                formData.append('map', projectCreateData.map);
                formData.append('projectArea', projectCreateData.projectArea);
                formData.append('possessionOn', projectCreateData.possessionOn);
                formData.append('projectType', projectCreateData.projectType);
                formData.append('reraNo', projectCreateData.reraNo);
                formData.append('title', projectCreateData.title);
                formData.append('keywords', projectCreateData.keywords);


                formData.append('floorName', JSON.stringify(floorchips));
                formData.append('amenitiesName', JSON.stringify(amenitiechips));
                formData.append('dimensions', JSON.stringify(dimensionschips));
                formData.append('floorPrice', JSON.stringify(floorPriceChips));

                for (let i = 0; i < galleryImages.length; i++) {
                    formData.append('gallery', galleryImages[i].file);
                }
                for (let i = 0; i < floorImages.length; i++) {
                    formData.append('floorPlan', floorImages[i].file);
                }
                for (let i = 0; i < amenitieImages.length; i++) {
                    formData.append('amenities', amenitieImages[i].file);
                }
                console.log(formData)
                const res = await dispatch(updateProject([formData, project._id]));
                console.log(res)
                setLoading(false);
                // setProjectCreateData({
                //     name: '',
                //     location: '',
                //     developer: '',
                //     description: '',
                //     specifications: '',
                //     startingFrom: '',
                //     currency: '',
                //     email: '',
                //     phone: '',
                //     city: '',
                //     map: '',
                //     projectArea: '',
                //     possessionOn: '',
                //     projectType: '',
                //     reraNo: '',
                //     title: "",
                //     keywords: "",
                //     content: '',
                // })
                // setGalleryImages([]);
                // setFloorImages([]);
                // setAmenitiesImages([]);
                // setFloorChips([]);
                // setAmenitieChips([]);
                // setFloorPriceChips([]);
                // setDimensionsChips([]);
                // setLoading(false);
                // navigate('/admin/dashboard/all-projects');
                // return;
            }

            if (!projectCreateData.name || !projectCreateData.location || !projectCreateData.developer || !projectCreateData.description || !projectCreateData.startingFrom || !projectCreateData.currency || !projectCreateData.email || !projectCreateData.phone) {
                toast.error('Filed are all mandatory...');
                return;
            }
            if (!isEmail(projectCreateData?.email)) {
                toast.error('Invalid Email');
                return;
            }
            setLoading(true);

            const formData = new FormData();
            formData.append('name', projectCreateData.name);
            formData.append('location', projectCreateData.location);
            formData.append('developer', projectCreateData.developer);
            formData.append('description', projectCreateData.description);
            formData.append('startingFrom', projectCreateData.startingFrom);
            formData.append('specifications', projectCreateData.specifications);
            formData.append('currency', projectCreateData.currency);
            formData.append('email', projectCreateData.email);
            formData.append('phone', projectCreateData.phone);
            formData.append('city', projectCreateData.city);
            formData.append('content', projectCreateData.content);
            formData.append('status', projectCreateData.status);
            formData.append('checkStatus', projectCreateData.checkStatus);

            formData.append('map', projectCreateData.map);
            formData.append('projectArea', projectCreateData.projectArea);
            formData.append('possessionOn', projectCreateData.possessionOn);
            formData.append('projectType', projectCreateData.projectType);
            formData.append('reraNo', projectCreateData.reraNo);
            formData.append('title', projectCreateData.title);
            formData.append('keywords', projectCreateData.keywords);


            formData.append('floorName', JSON.stringify(floorchips));
            formData.append('amenitiesName', JSON.stringify(amenitiechips));
            formData.append('dimensions', JSON.stringify(dimensionschips));
            formData.append('floorPrice', JSON.stringify(floorPriceChips));

            for (let i = 0; i < galleryImages.length; i++) {
                formData.append('gallery', galleryImages[i].file);
            }
            for (let i = 0; i < floorImages.length; i++) {
                formData.append('floorPlan', floorImages[i].file);
            }
            for (let i = 0; i < amenitieImages.length; i++) {
                formData.append('amenities', amenitieImages[i].file);
            }

            const res = await dispatch(createNewProject(formData));
            console.log(res)
            // setProjectCreateData({
            //     name: '',
            //     location: '',
            //     developer: '',
            //     description: '',
            //     specifications: '',
            //     startingFrom: '',
            //     currency: '',
            //     email: '',
            //     phone: '',
            //     city: '',
            //     map: '',
            //     projectArea: '',
            //     possessionOn: '',
            //     projectType: '',
            //     reraNo: '',
            //     title: "",
            //     keywords: "",
            //     content: '',
            // })
            // setGalleryImages([]);
            // setFloorImages([]);
            // setAmenitiesImages([]);
            // setFloorChips([]);
            // setAmenitieChips([]);
            // setFloorPriceChips([]);
            // setDimensionsChips([]);
            // setLoading(false);
            // navigate('/admin/dashboard/all-projects');

        } catch (Error) {
            toast.error(Error)
            throw Error;
        }
    }

    return (
        <AdminLayout>
            <div className='flex justify-center items-center min-h-screen'>
                {
                    loading
                        ? (<Spinner />)
                        : (
                            <div className='w-full min-h-[500px] rounded shadow-sm'>
                                <form className='' onSubmit={onFormSubmit}>
                                    <div className='flex items-center gap-2'>
                                        <Link onClick={() => navigate(-1)}><FaArrowLeftLong /></Link>
                                        <h2 className='text-xl font-medium border-b'>
                                            {
                                                editProject ? 'Update Project' : 'Create Project'
                                            }
                                        </h2>
                                    </div>
                                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
                                        <div className='col-span-2'>
                                            <div className='my-3 flex flex-col gap-2'>
                                                <label htmlFor='name'>Name<sup className='text-pink-400'>*</sup></label>
                                                <input
                                                    type='text'
                                                    name='name'
                                                    id='name'
                                                    className='w-full py-3 px-3 rounded border outline-0'
                                                    value={projectCreateData.name}
                                                    placeholder='Enter Project Name'
                                                    onChange={userInput}
                                                />
                                            </div>
                                            <div className='my-3 flex flex-col gap-2'>
                                                <label htmlFor='content'>Content<sup className='text-pink-400'>*</sup></label>
                                                <JoditEditor
                                                    type='text'
                                                    name='content'
                                                    id='content'
                                                    config={editorConfig}
                                                    className='min-h-[400px]'
                                                    value={projectCreateData.content}
                                                    placeholder='Enter Project Developer'
                                                    onChange={(data) => contantField_1(data)}
                                                    ref={editor}
                                                />
                                            </div>
                                            <div className='my-3 flex flex-col gap-2'>
                                                <label htmlFor='specifications'>Specifications<sup className='text-pink-400'>*</sup></label>
                                                <JoditEditor
                                                    type='text'
                                                    name='specifications'
                                                    id='specifications'
                                                    className=''
                                                    config={editorConfig}
                                                    value={projectCreateData.specifications}
                                                    placeholder='Enter Project Specifications'
                                                    onChange={(data) => contantField_2(data)}
                                                    ref={editor}
                                                />
                                            </div>
                                            <div className='my-3 flex flex-col gap-1'>
                                                <label htmlFor='title'>Title<sup className='text-pink-400'>*</sup></label>
                                                <input
                                                    type='text'
                                                    name='title'
                                                    id='title'
                                                    className='border resize-none p-3 outline-none rounded'
                                                    value={projectCreateData.title}
                                                    onChange={userInput}
                                                    placeholder='Enter Project Title'
                                                />
                                            </div>
                                            <div className='my-3 flex flex-col gap-2'>
                                                <label htmlFor='description'>Meta Description<sup className='text-pink-400'>*</sup></label>
                                                <textarea
                                                    type='text'
                                                    name='description'
                                                    id='description'
                                                    className='border resize-none h-[100px] p-3 outline-none rounded'
                                                    value={projectCreateData.description}
                                                    onChange={userInput}
                                                    placeholder='Enter Project Meta Description'
                                                />
                                            </div>
                                            <div className='my-3 flex flex-col gap-2'>
                                                <label htmlFor='keywords'>Keywords<sup className='text-pink-400'>*</sup></label>
                                                <textarea
                                                    type='text'
                                                    name='keywords'
                                                    id='keywords'
                                                    className='border resize-none h-[70px] p-3 outline-none rounded'
                                                    value={projectCreateData.keywords}
                                                    onChange={userInput}
                                                    placeholder='Enter Project Keywords'
                                                />
                                            </div>
                                        </div>
                                        <div className='col-span-1'>
                                            <div className='my-3 flex flex-col gap-2'>
                                                <label htmlFor='location'>Location<sup className='text-pink-400'>*</sup></label>
                                                <input
                                                    type='text'
                                                    id='location'
                                                    name='location'
                                                    className='w-full py-3 px-3 rounded border outline-0'
                                                    value={projectCreateData.location}
                                                    placeholder='Enter Project Location'
                                                    onChange={userInput}
                                                />
                                            </div>
                                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
                                                <div className='my-3 flex flex-col gap-2'>
                                                    <label htmlFor='developer'>Developer<sup className='text-pink-400'>*</sup></label>
                                                    <input
                                                        type='text'
                                                        id='developer'
                                                        name='developer'
                                                        className='w-full py-3 px-3 rounded border outline-0'
                                                        value={projectCreateData.developer}
                                                        placeholder='Enter Project Developer'
                                                        onChange={userInput}
                                                    />
                                                </div>
                                                <div className='my-3 flex flex-col gap-2'>
                                                    <label htmlFor='city'>City<sup className='text-pink-400'>*</sup></label>
                                                    <input
                                                        type='text'
                                                        name='city'
                                                        id='city'
                                                        className='w-full py-3 px-3 rounded border outline-0'
                                                        value={projectCreateData.city}
                                                        placeholder='Enter Project City'
                                                        onChange={userInput}
                                                    />
                                                </div>
                                            </div>
                                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
                                                <div className='my-3 flex flex-col gap-2'>
                                                    <label htmlFor='startingFrom'>StartingFrom<sup className='text-pink-400'>*</sup></label>
                                                    <input
                                                        type='text'
                                                        name='startingFrom'
                                                        id='startingFrom'
                                                        className='w-full py-3 px-3 rounded border outline-0'
                                                        value={projectCreateData.startingFrom}
                                                        placeholder='Enter Project StartingFrom'
                                                        onChange={userInput}
                                                    />
                                                </div>
                                                <div className='my-3 flex flex-col gap-2'>
                                                    <label htmlFor='currency'>Currency<sup className='text-pink-400'>*</sup></label>
                                                    <input
                                                        type='text'
                                                        name='currency'
                                                        id='currency'
                                                        className='w-full py-3 px-3 rounded border outline-0'
                                                        value={projectCreateData.currency}
                                                        placeholder='Enter Project Currency'
                                                        onChange={userInput}
                                                    />
                                                </div>
                                            </div>

                                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
                                                <div className='my-3 flex flex-col gap-2'>
                                                    <label htmlFor='reraNo'>Rera No<sup className='text-pink-400'>*</sup></label>
                                                    <input
                                                        type='text'
                                                        name='reraNo'
                                                        id='reraNo'
                                                        className='w-full py-3 px-3 rounded border outline-0'
                                                        value={projectCreateData.reraNo}
                                                        placeholder='Enter Project Rera No'
                                                        onChange={userInput}
                                                    />
                                                </div>
                                                <div className='my-3 flex flex-col gap-2'>
                                                    <label htmlFor='projectArea'>Project Area<sup className='text-pink-400'>*</sup></label>
                                                    <input
                                                        type='text'
                                                        name='projectArea'
                                                        id='projectArea'
                                                        className='w-full py-3 px-3 rounded border outline-0'
                                                        value={projectCreateData.projectArea}
                                                        placeholder='Enter Project Area'
                                                        onChange={userInput}
                                                    />
                                                </div>
                                            </div>

                                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
                                                <div className='my-3 flex flex-col gap-2'>
                                                    <label htmlFor='projectType'>Project Type<sup className='text-pink-400'>*</sup></label>
                                                    <input
                                                        type='text'
                                                        name='projectType'
                                                        id='projectType'
                                                        className='w-full py-3 px-3 rounded border outline-0'
                                                        value={projectCreateData.projectType}
                                                        placeholder='Enter Project Type'
                                                        onChange={userInput}
                                                    />
                                                </div>
                                                <div className='my-3 flex flex-col gap-2'>
                                                    <label htmlFor='possessionOn'>Possession On<sup className='text-pink-400'>*</sup></label>
                                                    <input
                                                        type='text'
                                                        name='possessionOn'
                                                        id='possessionOn'
                                                        className='w-full py-3 px-3 rounded border outline-0'
                                                        value={projectCreateData.possessionOn}
                                                        placeholder='Enter Project Possession On'
                                                        onChange={userInput}
                                                    />
                                                </div>
                                            </div>
                                            <div className='my-3 flex flex-col gap-2'>
                                                <label htmlFor='map'>Map Url<sup className='text-pink-400'>*</sup></label>
                                                <input
                                                    type='text'
                                                    name='map'
                                                    id='map'
                                                    className='w-full py-3 px-3 rounded border outline-0'
                                                    value={projectCreateData.map}
                                                    placeholder='Enter Project Map Url'
                                                    onChange={userInput}
                                                />
                                            </div>
                                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
                                                <div>
                                                    <label htmlFor='status'>Status<sup className='text-pink-400'>*</sup></label>
                                                    <select name='status' id='status' onChange={userInput} value={projectCreateData.status} className='w-full py-3 px-3 rounded border outline-0'>
                                                        <option value={'pre-launch'}>pre-launch</option>
                                                        <option value={'ongoing'}>ongoing</option>
                                                        <option value={'completed'}>completed</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label htmlFor='checkStatus'>Check Status<sup className='text-pink-400'>*</sup></label>
                                                    <select name='checkStatus' id='checkStatus' onChange={userInput} value={projectCreateData.checkStatus} className='w-full py-3 px-3 rounded border outline-0'>
                                                        <option value={'yes'}>yes</option>
                                                        <option value={'no'}>no</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
                                                <div className='my-3 flex flex-col gap-2'>
                                                    <label htmlFor='email'>Email<sup className='text-pink-400'>*</sup></label>
                                                    <input
                                                        type='text'
                                                        name='email'
                                                        id='email'
                                                        className='w-full py-3 px-3 rounded border outline-0'
                                                        value={projectCreateData.email}
                                                        placeholder='Enter Project Email'
                                                        onChange={userInput}
                                                    />
                                                </div>
                                                <div className='my-3 flex flex-col gap-2'>
                                                    <label htmlFor='phone'>Phone<sup className='text-pink-400'>*</sup></label>
                                                    <input
                                                        type='text'
                                                        name='phone'
                                                        id='phone'
                                                        className='w-full py-3 px-3 rounded border outline-0'
                                                        value={projectCreateData.phone}
                                                        placeholder='Enter Project Phone'
                                                        onChange={userInput}
                                                    />
                                                </div>
                                            </div>

                                            <div className='my-3 inline-block'>
                                                <label htmlFor='gallery' className='border px-3 py-2 cursor-pointer rounded'>
                                                    Gallery
                                                    <sup className='text-pink-400'>*</sup>
                                                </label>
                                                <input
                                                    type='file'
                                                    id='gallery'
                                                    onChange={handleGalleryImage}
                                                    className='hidden'
                                                />
                                            </div>
                                            <div className='flex gap-4 my-4'>
                                                {
                                                    galleryImages.length != 0 ?
                                                        (
                                                            galleryImages.map((galleryImage, idx) => (
                                                                <div key={idx} className='flex-row relative w-full h-[100px] outline-dashed p-1'>
                                                                    <img className='w-full h-full object-cover' src={galleryImage.dataURL || galleryImage} />
                                                                    <span className='absolute top-0 right-0 cursor-pointer' onClick={() => removeGalleryImage(idx)}> <IoMdClose /></span>
                                                                </div>
                                                            ))
                                                        )
                                                        :
                                                        (
                                                            <div className='flex capitalize flex-col items-center font-bold text-center justify-center w-full h-[100px] outline-dashed p-1'>
                                                                <CiCirclePlus className='font-bold text-2xl text-red-700' />
                                                                Gallery Image Add
                                                            </div>
                                                        )
                                                }
                                            </div>
                                            <div className='flex'>
                                                <div className='my-3 inline-block w-[50%]'>
                                                    <label htmlFor='floorImage' className='border px-3 py-2 cursor-pointer rounded'>
                                                        Floor Plan
                                                        <sup className='text-pink-400'>*</sup>
                                                    </label>
                                                    <input
                                                        type='file'
                                                        id='floorImage'
                                                        onChange={handelFloorPlanImage}
                                                        className='hidden'
                                                        accept='.jpg, .jpeg, .png, .svg'
                                                    />
                                                </div>
                                                <div className='w-[50%]'>
                                                    <label htmlFor='floorchips'>FLoor Plan Name<sup className='text-pink-400'>*</sup></label>
                                                    <input
                                                        type='text'
                                                        name='floorchips'
                                                        id='floorchips'
                                                        className='w-full py-3 px-3 rounded border outline-0'
                                                        // value={floorchips}
                                                        placeholder='Enter Project FLoor Plan Name'
                                                        onKeyDown={handelFloorKeyDown}
                                                    />
                                                </div>
                                            </div>
                                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
                                                <div className='my-3 flex flex-col gap-2'>
                                                    <label htmlFor='floorPrice'>Floor Price<sup className='text-pink-400'>*</sup></label>
                                                    <input
                                                        type='text'
                                                        name='floorPrice'
                                                        id='floorPrice'
                                                        className='w-full py-3 px-3 rounded border outline-0'
                                                        // value={projectCreateData.email}
                                                        placeholder='Enter Project Floor Price'
                                                        onKeyDown={handelFloorPriceDown}
                                                    />
                                                </div>
                                                <div className='my-3 flex flex-col gap-2'>
                                                    <label htmlFor='dimensions'>Dimensions<sup className='text-pink-400'>*</sup></label>
                                                    <input
                                                        type='text'
                                                        name='dimensions'
                                                        id='dimensions'
                                                        className='w-full py-3 px-3 rounded border outline-0'
                                                        // value={projectCreateData.phone}
                                                        placeholder='Enter Project Dimensions'
                                                        onKeyDown={handelDimensionsDown}
                                                    />
                                                </div>
                                            </div>

                                            <div className='flex gap-4 my-4'>
                                                {
                                                    floorImages.length != 0 ?
                                                        (
                                                            floorImages.map((floorImage, idx) => (
                                                                <div key={idx} className='flex-row relative w-[100px] mb-24 h-[100px] outline-dashed p-1'>
                                                                    <img className='w-full h-full object-cover' src={floorImage.dataURL || floorImage} />
                                                                    <p className='text-xl font-mono text-center mt-2'>{floorchips[idx]}</p>
                                                                    <p className='text-xl font-mono text-center mt-2'>{dimensionschips[idx]}</p>
                                                                    <p className='text-xl font-mono text-center mt-2'>{floorPriceChips[idx]}</p>
                                                                    <span className='absolute top-0 right-0 cursor-pointer' onClick={() => removeFloorImage(idx)}> <IoMdClose /></span>
                                                                </div>
                                                            ))
                                                        )
                                                        :
                                                        (
                                                            <div className='flex capitalize flex-col items-center font-bold text-center justify-center w-full h-[100px] outline-dashed p-1'>
                                                                <CiCirclePlus className='font-bold text-2xl text-red-700' />
                                                                FLoor Plan Image
                                                            </div>
                                                        )
                                                }
                                            </div>
                                            <div className='flex'>
                                                <div className='my-3 inline-block w-[50%]'>
                                                    <label htmlFor='amenities' className='border px-3 py-2 cursor-pointer rounded'>
                                                        Amenities
                                                        <sup className='text-pink-400'>*</sup>
                                                    </label>
                                                    <input
                                                        type='file'
                                                        id='amenities'
                                                        onChange={handelAmenitiesImage}
                                                        className='hidden'
                                                        accept='.jpg, .jpeg, .png, .svg'
                                                    />
                                                </div>
                                                <div className='w-[50%]'>
                                                    <label htmlFor='amenitieschips'>Amenities Name<sup className='text-pink-400'>*</sup></label>
                                                    <input
                                                        type='text'
                                                        name='amenitieschips'
                                                        id='amenitieschips'
                                                        className='w-full py-3 px-3 rounded border outline-0'
                                                        // value={amenitiechips}
                                                        placeholder='Enter Project Amenities'
                                                        onKeyDown={handelAmenitieKeyDown}
                                                    />
                                                </div>
                                            </div>
                                            <div className='flex flex-wrap gap-4 my-4'>
                                                {
                                                    amenitieImages.length != 0 ?
                                                        (
                                                            amenitieImages.map((amenitieImage, idx) => (
                                                                <div key={idx} className='flex-row relative w-[100px] mb-10 h-[100px] outline-dashed p-1'>
                                                                    <img className='w-full h-full object-cover' src={amenitieImage.dataURL || amenitieImage} />
                                                                    <p className='text-xl font-mono text-center mt-2'>{amenitiechips[idx]}</p>
                                                                    <span className='absolute top-0 right-0 cursor-pointer' onClick={() => removeAmenitieImage(idx)}> <IoMdClose /></span>
                                                                </div>
                                                            ))
                                                        )
                                                        :
                                                        (
                                                            <div className='flex capitalize flex-col items-center font-bold text-center justify-center w-full h-[100px] outline-dashed p-1'>
                                                                <CiCirclePlus className='font-bold text-2xl text-red-700' />
                                                                Amenities Image
                                                            </div>
                                                        )
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex justify-end'>
                                        <button
                                            type='submit'
                                            className='bg-[#1677ff] text-md w-[140px] inline-block text-white rounded h-[40px] mt-3 hover:bg-blue-600 hover:scale-110 duration-300 ease-in-out transition-all'
                                        >
                                            {
                                                editProject ? 'Update Project' : 'Create Project'
                                            }
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )
                }
            </div>
        </AdminLayout>
    )
}

export default CreateProject;