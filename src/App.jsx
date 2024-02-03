
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProjectViewPage from './pages/ProjectViewPage'
import CreateProject from './pages/Admin/CreateProject'
import Register from './pages/Register'
import Login from './pages/Login'
import VerifyEmail from './pages/VerifyEmail'
import EditProject from './pages/Admin/EditProject'
import { useEffect, useState } from 'react'
import Spinner from './components/Spinner'
import RequireAuth from './components/auth/RequireAuth'
import NotFound from './pages/NotFound'
import Denied from './pages/Denied'
import AdminLayout from './components/AdminLayout'
import Profile from './pages/Profile'
import ForgotPassword from './pages/ForgotPassword'
import CreateBlog from './pages/Admin/CreateBlog'
import AdminGetAllProject from './pages/Admin/AdminGetProject'
import AllUsers from './pages/Admin/AllUsers'
import AdminAllBlogs from './pages/Admin/AdminAllBlogs'
import UpdateBlog from './pages/Admin/UpdateBlog'
import City from './pages/City'
import Dashboard from './pages/Admin/Dashboard'
import Lead from './pages/Admin/Lead'
import ReadBlog from './pages/ReadBlog'
import Author from './pages/Author'
import AllProjects from './pages/AllProjects'
import Search from './pages/Search'
import { useDispatch, useSelector } from 'react-redux'
import { logVisitorAsync } from './redux/slices/visitorSlice'

function App() {

  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);

  const { role } = useSelector((state) => state.auth);
  // console.log(location)

  useEffect(() => {
    // fetched();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);


  const dispatch = useDispatch();
  async function fetched() {

    // Check if geolocation is supported by the browser
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        // console.log('Position -> ', position);
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        // console.log(position.coords);
      },
        (error) => {
          console.error('Error getting geolocation:', error.message);
        })
    } else {
      console.error('Geolocation is not supported by your browser.');
    }

    if (location) {
      const page = window.location.pathname;
      // console.log('Page -> ', page);
      const res = await dispatch(logVisitorAsync({ page, ...location }));
      console.log(res)
    }

  }

  return (
    loading ? (
      <Spinner />
    ) : (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/user-profile" element={<Profile />} />
        <Route path='/project/:slug' element={<ProjectViewPage />} />
        <Route path='/projects/page/:page' element={<AllProjects />} />
        <Route path='/denied' element={<Denied />} />
        <Route path='/city/:cityname' element={<City />} />
        <Route path='/blog/:slug' element={<ReadBlog />} />
        <Route path='/author/:id' element={<Author />} />
        <Route path='/search' element={<Search />} />

        <Route path='/admin/dashboard' element={<Dashboard />} />

        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>

        </Route>
        {
          role === 'ADMIN' ? (
            <>
              <Route path='admin/dashboard/leads/page/:page' element={<Lead />} />
              <Route path='admin/dashboard/update-project/:projectId' element={<EditProject />} />
              <Route path='admin/dashboard/users/page/:page' element={<AllUsers />} />
              <Route path='admin/dashboard/add-project' element={<CreateProject />} />
              <Route path='admin/dashboard/all-projects' element={<AdminGetAllProject />} />
              <Route path='/admin/dashboard/add-blog' element={<CreateBlog />} />
              <Route path='admin/dashboard/blogs/page/:page' element={<AdminAllBlogs />} />
              <Route path='admin/dashboard/blogs/update/:id' element={<UpdateBlog />} />
            </>
          )
            :
            (
              <>
                <Route path='/user/dashboard' element={<Dashboard />} />
                <Route path='/user/dashboard/add-blog' element={<CreateBlog />} />
              </>
            )
        }
        <Route path='*' element={<NotFound />} />
      </Routes>


    )
  );

}

export default App
