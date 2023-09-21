import React, { useEffect, useState } from "react";
import SmallCalendar from "../components/dashboard/SmallCalendar";
// import Loader from "../components/Loader"
import StudentsTable2 from "../components/members/MembersTable2";
import "../assets/styles/main.css";
import "../assets/styles/dashboard.css";
import BarGraph from "../components/dashboard/BarGraph";
import Cards from "../components/dashboard/Cards";
import Doughnut from "../components/dashboard/DoughnutComp";
import { FaUserAlt } from "react-icons/fa";
import { GiAlarmClock } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios-instance";

const Dashboard = () => {
	const navigate = useNavigate();





	return (
		<div className="h-screen overflow-y-auto">
			<Cards />
			<div className="flex w-full">
				<div className="w-8/12">
					<div className="rounded-md w-full shadow-md bg-white h-[65vh] p-5">
						<p className="text-xl text-primary font-semibold">Attendence Graph</p>
						<BarGraph />
					</div>
					<div className="flex bg-primary3 text-primary font-medium">
						<div className="w-1/4 p-2">
							Full Name
						</div>
						<div className="w-1/4 p-2">
							Email
						</div>

						<div className="w-1/4 p-2">
							Time In
						</div>
						<div className="w-1/4 p-2">
							Time Out
						</div>

					</div>
					
					<div className="flex text-sm text-gray5 hover:bg-gray1 bg-white border-b border-gray2">
						<div className="w-1/4 p-2">
							Omeny Robert
						</div>
						<div className="w-1/4 p-2">
							rob@gmail.com
						</div>

						<div className="w-1/4 p-2">
						8:00pm
						</div>
						<div className="w-1/4 p-2">
						9:
						</div>

					</div>
					<div className="flex text-sm text-gray5 hover:bg-gray1 bg-white border-b border-gray2">
						<div className="w-1/4 p-2">
							Omeny Robert
						</div>
						<div className="w-1/4 p-2">
							rob@gmail.com
						</div>

						<div className="w-1/4 p-2">
						8:00pm
						</div>
						<div className="w-1/4 p-2">
						9:
						</div>

					</div>
					<div className="flex text-sm text-gray5 hover:bg-gray1 bg-white border-b border-gray2">
						<div className="w-1/4 p-2">
							Omeny Robert
						</div>
						<div className="w-1/4 p-2">
							rob@gmail.com
						</div>

						<div className="w-1/4 p-2">
						8:00pm
						</div>
						<div className="w-1/4 p-2">
						9:
						</div>

					</div>
					<div className="flex text-sm text-gray5 hover:bg-gray1 bg-white border-b border-gray2">
						<div className="w-1/4 p-2">
							Omeny Robert
						</div>
						<div className="w-1/4 p-2">
							rob@gmail.com
						</div>

						<div className="w-1/4 p-2">
						8:00pm
						</div>
						<div className="w-1/4 p-2">
						9:
						</div>

					</div>
					<div className="flex text-sm text-gray5 hover:bg-gray1 bg-white border-b border-gray2">
						<div className="w-1/4 p-2">
							Omeny Robert
						</div>
						<div className="w-1/4 p-2">
							rob@gmail.com
						</div>

						<div className="w-1/4 p-2">
						8:00pm
						</div>
						<div className="w-1/4 p-2">
						9:
						</div>

					</div>
				</div>
				<div className="w-4/12 rounded-md shadow-md bg-white ml-2 overflow-y-auto h-[125vh] p-2">
					{/* <Doughnut /> */}
					<p className="text-xl text-primary font-semibold">Events</p>
					<div className="p-2 rounded-md w-full m-2 flex">
						<SmallCalendar />
					</div>
					<br />



				</div>
			</div>
		</div>
	);
};

export default Dashboard;
