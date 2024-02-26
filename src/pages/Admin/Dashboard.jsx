// Importing the necessary dependencies
import { Bar, Pie } from "react-chartjs-2";
import 'chart.js/auto';
import AdminLayout from "../../components/AdminLayout";
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import "../../styles/Dashboard.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Dashboard() {
    const [pieData, setPieData] = useState({
        labels: [],
        datasets: []
    });

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });

    const { totalUsers } = useSelector((state) => state?.stat);
    useEffect(() => {
        const userData = {
            labels: ["User Registrations", "Project Posts", "Blog Posts"],
            datasets: [
                {
                    label: "User Details",
                    data: [250, 200, 121],
                    backgroundColor: ["#0363e8", "#f84d6a", "#059969"]
                }
            ]
        };

        setPieData(userData);

        const data = {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [

                {
                    label: 'User Registrations',
                    data: [0, 0, 0, 0, 0, 0, 3, 4, 6, 12, 0, 0],
                    backgroundColor: '#0363e8'
                },
                {
                    label: 'Project Posts',
                    data: [3, 0, 9, 2, 1, 6, 12, 1, 6, 8, 0, 0],
                    backgroundColor: '#f84d6a',
                },
                {
                    label: 'Blog Posts',
                    data: [11, 3, 4, 9, 2, 1, 0, 1, 6, 3, 0, 0],
                    backgroundColor: '#2e7d32',
                },
            ],
        };

        setChartData(data);
    }, []);


    const editorConfig = {
        minHeight: '500px', // Set your desired height here
    };
    return (
        <AdminLayout>
            <main className='main-container'>
                <div className='main-cards grid grid-cols-5 gap-5 m-4'>
                    <div className='card h-[90px] bg-[#2962ff] flex flex-col justify-around py-3 px-6 rounded-md'>
                        <div className='card-inner flex items-center justify-between'>
                            <h3 className="font-bold">PROJECTS</h3>
                            <BsFillArchiveFill className='card_icon text-2xl' />
                        </div>
                        <h1>300</h1>
                    </div>
                    <div className='card h-[90px] bg-[#ff6d00] flex flex-col justify-around py-3 px-6 rounded-md'>
                        <div className='card-inner flex items-center justify-between'>
                            <h3 className="font-bold">BLOG</h3>
                            <BsFillGrid3X3GapFill className='card_icon text-2xl' />
                        </div>
                        <h1>12</h1>
                    </div>
                    <div className='card h-[90px] bg-[#2e7d32] flex flex-col justify-around py-3 px-6 rounded-md'>
                        <div className='card-inner flex items-center justify-between'>
                            <h3 className="font-bold">CUSTOMERS</h3>
                            <BsPeopleFill className='card_icon text-2xl' />
                        </div>
                        <h1>33</h1>
                    </div>
                    <div className='card h-[90px] bg-[#d50000] flex flex-col justify-around py-3 px-6 rounded-md'>
                        <div className='card-inner flex items-center justify-between'>
                            <h3 className="font-bold">LEAD</h3>
                            <BsFillBellFill className='card_icon text-2xl' />
                        </div>
                        <h1>42</h1>
                    </div>
                    <div className='card h-[90px] bg-[#cc34eb] flex flex-col justify-around py-3 px-6 rounded-md shadow-md'>
                        <div className='card-inner flex items-center justify-between'>
                            <h3 className="font-bold">MESSAGE</h3>
                            <BsFillBellFill className='card_icon text-2xl' />
                        </div>
                        <h1>42</h1>
                    </div>
                </div>

                <div className="flex gap-5 mt-10">
                    <div className="h-[430px] w-[70%] flex flex-col m-auto bg-white p-6 shadow-md">
                        <div className="chart-container">
                            <Bar

                                data={chartData}
                                options={{
                                    responsive: true,
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>
                    <div className="bg-white flex items-center justify-center p-6 shadow-md">
                        <Pie data={pieData} />
                    </div>
                </div>
            </main>
        </AdminLayout>
    );
}

export default Dashboard;
