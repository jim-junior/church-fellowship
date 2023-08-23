import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { TbLayoutDashboard } from "react-icons/tb";

function DashboardLinks({ name, link, Icon }) {
	const location = useLocation();


	return (
		<>
			<Link
				to={link}
				className={
					location.pathname === link
						? `flex w-[80%] ml-5  bg-primary rounded-md p-2 cursor-pointer  ${link === "/dashboard" ? "mt-7" : ""}`
						: `flex w-[80%] ml-5 linkdiv rounded-md p-2 cursor-pointer ${link === "/dashboard" ? "mt-7" : ""}`
				}
			>
				<div className="w-4/5 flex">
					<Icon
						className={
							location.pathname === link
								? "w-4 h-4 mt-[2px] text-white"
								: "w-4 h-4 mt-[2px] linkicon"
						}
					/>
					<p
						className={
							location.pathname === link
								? "text-sm font-light text-white ml-6 "
								: "text-sm font-light linktext ml-6 "
						}
					>
						{name}
					</p>
				</div>
				<div className="w-1/5"></div>
			</Link>
		</>
	);
}

export default DashboardLinks;
