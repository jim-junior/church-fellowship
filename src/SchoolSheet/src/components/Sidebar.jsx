import React, { } from "react";
import { useLocation } from "react-router-dom";
import {
	FaBriefcase,
} from "react-icons/fa";
import "../assets/styles/sidebar.css";
import DashboardLinks from "./sidebarFolder/DashboardLinks";
import { SiGotomeeting } from "react-icons/si";
import { TbLayoutDashboard } from "react-icons/tb";
import { AiOutlineTeam } from "react-icons/ai";
import { BiLogoZoom } from "react-icons/bi";
import {FaMoneyCheckAlt,FaPrayingHands,FaNewspaper} from "react-icons/fa";
import {BsPencilFill,BsPeopleFill} from "react-icons/bs";

function Sidebar() {
	const location = useLocation();


	return (
		<div className="bg-white h-screen text-primary2 my-2 -mt-1  shadow-xl">
			<div className="flex ml-2 ">
				<img src="logo.jpg"/>
			</div>
			<div className="h-[75vh] overflow-y-auto -mt-5">
				{/* Dashboard */}

				<DashboardLinks Icon={TbLayoutDashboard} name="Dashboard" link={"/dashboard"} />
				<DashboardLinks Icon={AiOutlineTeam} name="Members" link={"/members"} />
				<DashboardLinks Icon={BiLogoZoom} name="Start Meeting" link={"/start-meeting"} />
				<DashboardLinks Icon={SiGotomeeting} name="Schedule" link={"/schedule"} />
				<DashboardLinks Icon={FaMoneyCheckAlt} name="Tithe & Offertory" link={"/tithe"} />
				<DashboardLinks Icon={BsPencilFill} name="Notes" link={"/notes"} />
				<DashboardLinks Icon={BsPeopleFill} name="Testimonies" link={"/testimonies"} />
				<DashboardLinks Icon={FaPrayingHands} name="Prayer Requests" link={"/prayer"} />
				<DashboardLinks Icon={FaNewspaper} name="News" link={"/news"} />
				<DashboardLinks Icon={BsPeopleFill} name="Attendance" link={"/attendance"} />
			</div>
			<div className="p-4 m-4 bg-secondary rounded-md h-48">
				<div className="flex justify-center items-center">
					<img src="upgrade1.png" className="w-28" />
				</div>

				<div className="p-3 text-center mt-2 text-sm bg-black text-white rounded-md">
					<p>Upgrade Now</p>
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
