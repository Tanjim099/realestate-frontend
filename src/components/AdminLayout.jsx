import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { GrProjects, GrUserAdmin } from "react-icons/gr";
import { AiFillProject } from "react-icons/ai";
import { FaStackOverflow } from "react-icons/fa";
import { MdOutlineMoveToInbox } from "react-icons/md";
import { Layout, Menu, Button, theme } from 'antd';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import "../styles/AdminLayout.css"
import { useDispatch, useSelector } from 'react-redux';
import { IoIosLogOut } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { FiLogIn } from "react-icons/fi";
import { FaUserPlus } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { logout } from '../redux/slices/authSlice';

const { Header, Sider, Content } = Layout;

function AdminLayout({ children }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [collapsed, setCollapsed] = useState(false);
    const { editProject } = useSelector((state) => state.project);
    const { data, role } = useSelector((state) => state.auth);
    console.log(role);
    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn)
    console.log(editProject);
    const {
        token: { colorBgContainer },
    } = theme.useToken();


    const menuItems = [
        {
            key: '1',
            icon: <FaStackOverflow />,
            label: 'Dashboard',
            link: '',
        },
        {
            key: '2',
            icon: <MdOutlineMoveToInbox />,
            label: 'Inbox',
            link: 'inbox',
        },
        {
            key: '3',
            icon: <FaStackOverflow />,
            label: 'Lead',
            link: 'leads/page/1',
        },
        {
            key: '4',
            icon: <UserOutlined />,
            label: 'All Users',
            link: 'users/page/1',
        },
        {
            key: '5',
            icon: <GrProjects />,
            label: 'All Project',
            link: 'all-projects',
        },
        {
            key: '6',
            icon: <AiFillProject />,
            label: `${editProject ? 'Edit Project' : 'Add Project'}`,
            link: 'add-project',
        },
        {
            key: '7',
            icon: <AiFillProject />,
            label: 'All Blog',
            link: 'blogs/page/1',
        },
        {
            key: '8',
            icon: <GrUserAdmin />,
            label: 'Add Blog',
            link: 'add-blog',
        },
        {
            key: '9',
            icon: <GrUserAdmin />,
            label: 'Author',
            link: 'author',
        },
    ];

    const userMenu = [
        {
            key: '1',
            icon: <FaStackOverflow />,
            label: 'Dashboard',
            link: '',
        },
        {
            key: '7',
            icon: <AiFillProject />,
            label: 'All Blog',
            link: 'blogs/page/1',
        },
        {
            key: '8',
            icon: <GrUserAdmin />,
            label: 'Add Blog',
            link: 'add-blog',
        },
    ]

    console.log(menuItems);

    const handelLogout = async (e) => {
        // e.preventDefault();
        const res = await dispatch(logout());
        if (res?.payload?.success) {
            window.location.reload();
            navigate('/');
        };
    }

    return (
        <Layout className='h-100' style={{ height: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed} className='overflow-y-scroll sideBar'>

                <div className='demo-logo-vertical' />
                <h2 mode='inline' className=' text-center text-sm text-white my-2'>Dashboard</h2>
                <Menu
                    theme='dark'
                    mode='inline'
                    defaultSelectedKeys={['1']}
                >
                    {
                        role === 'ADMIN' ?
                            (
                                menuItems && menuItems.map(item => (
                                    <Menu.Item key={item.key} icon={item.icon}>
                                        {
                                            <Link to={`/admin/dashboard/${item.link}`}>{item.label}</Link>
                                        }
                                    </Menu.Item>
                                ))
                            )
                            :
                            (
                                userMenu && userMenu.map(item => (
                                    <Menu.Item key={item.key} icon={item.icon}>
                                        {
                                            <Link to={`/user/dashboard/${item.link}`}>{item.label}</Link>
                                        }
                                    </Menu.Item>
                                ))
                            )
                    }
                </Menu>
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                    className=' flex items-center justify-between'
                >

                    <Button
                        type='text'
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />

                    <div className="dropdown dropdown-end px-5 mt-4">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 h-10 object-cover rounded-full">
                                {
                                    isLoggedIn ? (<img alt="User Image" src={data?.avatar?.secure_url} />) : (<FaRegUser className="text-3xl mt-1" />)
                                }
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu dropdown-content mr-5 z-[1] p-2 shadow bg-base-100 w-52">
                            {!isLoggedIn ? (
                                <>
                                    <li className="bg-transparent flex flex-row items-center border-b-2">
                                        <p className="">
                                            <FiLogIn className="text-lg" />
                                        </p>
                                        <NavLink to="/login" className="bg-transparent text-lg">
                                            Login
                                        </NavLink>
                                    </li>
                                    <li className="flex flex-row items-center">
                                        <p className="">
                                            <FaUserPlus className="text-lg" />
                                        </p>
                                        <NavLink className={'text-lg'} to="/register" >
                                            Register
                                        </NavLink>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="border-b-2 border-primary">
                                        <p className="text-primary italic text-md">Hey</p>
                                        <span className="font-bold text-lg capitalize">{data?.firstName}</span>
                                    </li>
                                    <li className="flex flex-row items-center">
                                        <p className="">
                                            <FaRegUser className="text-lg" />
                                        </p>
                                        <NavLink className={'text-lg'} to={'/user-profile'}>My Profile</NavLink>
                                    </li>
                                    {
                                        isLoggedIn && role === 'ADMIN' && (
                                            <li className="flex flex-row items-center">
                                                <p>
                                                    <MdDashboard className="text-lg" />
                                                </p>
                                                <NavLink className="text-lg" to={'/'}>Home </NavLink>
                                            </li>
                                        )
                                    }
                                    <li className="flex flex-row items-center">
                                        <p>
                                            <IoIosLogOut className="text-lg" />
                                        </p>
                                        <Link className="text-lg" onClick={handelLogout}>Logout</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                    className=' overflow-y-scroll content'
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}

export default AdminLayout;
