import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../components/HomeLayout";
import { getAllProjects } from "../redux/slices/projectSlice";
import { useEffect } from "react";
import '../styles/HomePage.css';
import { getAllBlogs } from "../redux/slices/blogSlice";

import HeroSection from "../components/Home/HeroSection";
import CitySection from "../components/Home/CitySection";
import TopProjects from "../components/Home/TopProjects";
import Section_1 from "../components/Home/Section_1";
import Section_2 from "../components/Home/Section_2";
import GallerySection from "../components/Home/GallerySection";
import Section_3 from "../components/Home/Section_3";
import BlogSection from "../components/Home/BlogSection";
import Developer from "../components/Home/Developer";
import Section_4 from "../components/Home/Section_4";

function HomePage() {
    const dispatch = useDispatch();

    const { blogData } = useSelector((state) => state?.blog);

    async function onLoadGetData() {
        await dispatch(getAllProjects());
    }

    async function onLoadGetBlogData() {
        await dispatch(getAllBlogs());
    }
    useEffect(() => {
        onLoadGetData();
        onLoadGetBlogData();
    }, [])
    return (
        <HomeLayout
            title={"Best Property Management Company in India Home 99"}
            description={"Best Flat in New Delhi"}
        >
            <div className="homeContainer">
                <HeroSection />
                <CitySection />
                <TopProjects />
                <Section_1 />
                <Section_2 />
                <GallerySection />
                <BlogSection />
                <Section_3 />
                <Section_4 />
                <Developer />
            </div>
        </HomeLayout>
    )
}

export default HomePage