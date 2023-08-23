import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SettingsLinks from "./sidebarFolder/SettingsLinks";
import {
	TbLayoutDashboard,
	TbTournament,
	TbBooks,
	TbChevronDown,
	TbBus,
} from "react-icons/tb";
import {
	FaUsers,
	FaBookReader,
	FaCapsules,
	FaRegMoneyBillAlt,
	FaUserCog,
	FaMoneyCheckAlt,
	FaBriefcase,
	FaPrayingHands,
} from "react-icons/fa";
import {
	MdNavigateNext,
	MdOutlineSportsSoccer,
	MdVideoCameraFront,
	MdHowToVote,
} from "react-icons/md";
import { HiOutlineArrowSmRight, HiOutlineCurrencyDollar } from "react-icons/hi";
import {
	BsGear,
	BsFillFileEarmarkPostFill,
	BsUpcScan,
	BsFillCalendarDateFill,
} from "react-icons/bs";
import { FcAdvertising } from "react-icons/fc";
import "../assets/styles/sidebar.css";
import FeesLinks from "./sidebarFolder/FeesLinks";
import StudentsLinks from "./sidebarFolder/StudentsLinks";
import ClassesLinks from "./sidebarFolder/ClassesLinks";
import HrmLinks from "./sidebarFolder/HrmLinks";
import FinanceLinks from "./sidebarFolder/FinanceLinks";
import TimeTableLinks from "./sidebarFolder/TimeTableLinks";
import MarketingLinks from "./sidebarFolder/MarketingLinks";
import DashboardLinks from "./sidebarFolder/DashboardLinks";
import ScholarshipsLinks from "./sidebarFolder/ScholarshipsLinks";
import ActivitiesLinks from "./sidebarFolder/ActivitiesLinks";
import ElearningLinks from "./sidebarFolder/ElearningLinks";
import DisciplineLinks from "./sidebarFolder/DisciplineLinks";

function Sidebar() {
	const location = useLocation();

	const [link2, setLink2] = useState(false);

	const [link3, setLink3] = useState(false);

	const [link4, setLink4] = useState(false);

	const [link5, setLink5] = useState(false);

	const [link6, setLink6] = useState(false);

	const [link7, setLink7] = useState(false);

	const [link8, setLink8] = useState(false);

	const [link9, setLink9] = useState(false);

	const [link10, setLink10] = useState(false);

	const [link11, setLink11] = useState(false);

	const [link12, setLink12] = useState(false);

	const [link13, setLink13] = useState(false);

	const [link14, setLink14] = useState(false);

	const toggleLink2 = () => {
		setLink2(!link2);
	};

	const toggleLink3 = () => {
		setLink3(!link3);
	};

	const toggleLink4 = () => {
		setLink4(!link4);
	};

	const toggleLink5 = () => {
		setLink5(!link5);
	};

	const toggleLink6 = () => {
		setLink6(!link6);
	};

	const toggleLink7 = () => {
		setLink7(!link7);
	};

	const toggleLink8 = () => {
		setLink8(!link8);
	};

	const toggleLink9 = () => {
		setLink9(!link9);
	};

	const toggleLink10 = () => {
		setLink10(!link10);
	};

	const toggleLink11 = () => {
		setLink11(!link11);
	};

	const toggleLink12 = () => {
		setLink12(!link12);
	};

	const toggleLink13 = () => {
		setLink13(!link13);
	};

	const toggleLink14 = () => {
		setLink14(!link14);
	};

	const [user, setUser] = useState("");
	useEffect(() => {
		setUser(JSON.parse(localStorage.getItem("schoolSoftUser")));
	}, []);

	return (
		<div className="bg-white h-screen text-primary2 my-2 -mt-1 pt-5  shadow-xl">
			<div className="flex ml-2 ">
				<FaBriefcase className="text-secondary text-sm mt-1 ml-2" />
				<p className="text-secondary text-xl md:text-sm ml-1 font-bold">
					Fellowship System
				</p>
			</div>
			<div className="h-[75vh] overflow-y-auto">
				{/* Dashboard */}

				<DashboardLinks name="Dashboard" link={"/dashboard"} />
				<DashboardLinks name="Members" link={"/members"} />
				<DashboardLinks name="Start Meeting" link={"/start-meeting"} />
				<DashboardLinks name="Schedule" link={"/schedule"} />
				<DashboardLinks name="Reports" link={"/reports"} />

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
