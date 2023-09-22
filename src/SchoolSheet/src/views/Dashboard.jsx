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

	const members = [
		{ id: 1, fn: "Omeny", ln: "Robert", emails: "rob@gmail.com", contact: "+256 7545 665 65", photo: "https://img.freepik.com/free-photo/african-teenage-girl-portrait-happy-smiling-face_53876-146757.jpg?size=626&ext=jpg&uid=R115325018&ga=GA1.2.726111961.1693464081&semt=ais", kids: 4 },
		{ id: 1, fn: "Akao", ln: "Teddy", emails: "rob@gmail.com", contact: "+256 7545 665 65", photo: "https://img.freepik.com/free-photo/portrait-cute-african-american-curly-young-woman-studio_23-2148183328.jpg?size=626&ext=jpg&uid=R115325018&ga=GA1.1.726111961.1693464081&semt=ais", kids: 4 },
		{ id: 1, fn: "Jeremy", ln: "Paul", emails: "rob@gmail.com", contact: "+256 7545 665 65", photo: "https://img.freepik.com/free-photo/african-teenage-girl-portrait-happy-smiling-face_53876-146757.jpg?size=626&ext=jpg&uid=R115325018&ga=GA1.2.726111961.1693464081&semt=ais", kids: 4 },
		{ id: 1, fn: "Kol", ln: "Ham", emails: "rob@gmail.com", contact: "+256 7545 665 65", photo: "https://img.freepik.com/free-photo/black-woman-s-portrait-wavy-hair-black-clothes_633478-1326.jpg?size=626&ext=jpg&uid=R115325018&ga=GA1.1.726111961.1693464081&semt=ais", kids: 4 },
		{ id: 1, fn: "Omeny", ln: "Robert", emails: "rob@gmail.com", contact: "+256 7545 665 65", photo: "https://img.freepik.com/free-photo/african-teenage-girl-portrait-happy-smiling-face_53876-146757.jpg?size=626&ext=jpg&uid=R115325018&ga=GA1.2.726111961.1693464081&semt=ais", kids: 4 },
		{ id: 1, fn: "Omeny", ln: "Robert", emails: "rob@gmail.com", contact: "+256 7545 665 65", photo: "https://img.freepik.com/free-photo/african-teenage-girl-portrait-happy-smiling-face_53876-146757.jpg?size=626&ext=jpg&uid=R115325018&ga=GA1.2.726111961.1693464081&semt=ais", kids: 4 },
		{ id: 1, fn: "Omeny", ln: "Robert", emails: "rob@gmail.com", contact: "+256 7545 665 65", photo: "https://img.freepik.com/free-photo/african-teenage-girl-portrait-happy-smiling-face_53876-146757.jpg?size=626&ext=jpg&uid=R115325018&ga=GA1.2.726111961.1693464081&semt=ais", kids: 4 },
		{ id: 1, fn: "Omeny", ln: "Robert", emails: "rob@gmail.com", contact: "+256 7545 665 65", photo: "https://img.freepik.com/free-photo/african-teenage-girl-portrait-happy-smiling-face_53876-146757.jpg?size=626&ext=jpg&uid=R115325018&ga=GA1.2.726111961.1693464081&semt=ais", kids: 4 },
		{ id: 1, fn: "Omeny", ln: "Robert", emails: "rob@gmail.com", contact: "+256 7545 665 65", photo: "https://img.freepik.com/free-photo/african-teenage-girl-portrait-happy-smiling-face_53876-146757.jpg?size=626&ext=jpg&uid=R115325018&ga=GA1.2.726111961.1693464081&semt=ais", kids: 4 },
		{ id: 1, fn: "Omeny", ln: "Robert", emails: "rob@gmail.com", contact: "+256 7545 665 65", photo: "https://img.freepik.com/free-photo/african-teenage-girl-portrait-happy-smiling-face_53876-146757.jpg?size=626&ext=jpg&uid=R115325018&ga=GA1.2.726111961.1693464081&semt=ais", kids: 4 },
		{ id: 1, fn: "Omeny", ln: "Robert", emails: "rob@gmail.com", contact: "+256 7545 665 65", photo: "https://img.freepik.com/free-photo/african-teenage-girl-portrait-happy-smiling-face_53876-146757.jpg?size=626&ext=jpg&uid=R115325018&ga=GA1.2.726111961.1693464081&semt=ais", kids: 4 }
	]

	const givings = [
		{ id: 1, name: "Omeny Robert", type: "Tithe", amount: "250,000" },
		{ id: 1, name: "Akao Teddy", type: "Offertory", amount: "50,000" },
		{ id: 1, name: "Mukasa Paul", type: "Tithe", amount: "120,000" },
		{ id: 1, name: "Okello James", type: "Tithe", amount: "250,000" },
		{ id: 1, name: "Omeny Robert", type: "Offertory", amount: "250,000" },
		{ id: 1, name: "Calvin James", type: "Tithe", amount: "250,000" },
		{ id: 1, name: "Nakate Gloria", type: "Offertory", amount: "150,000" },
		{ id: 1, name: "Omeny Robert", type: "Tithe", amount: "250,000" },
		{ id: 1, name: "Mukasa Paul", type: "Tithe", amount: "120,000" },
		{ id: 1, name: "Okello James", type: "Tithe", amount: "250,000" },
		{ id: 1, name: "Omeny Robert", type: "Offertory", amount: "250,000" },
	]

	const news = [
		{ id: 1, name: "Charity Outreach", des: "Kira Municipal cleaning on saturday 6pm", date: "14th-09", photo: "https://img.freepik.com/free-photo/medium-shot-black-woman-holding-kid_23-2149602760.jpg?size=626&ext=jpg&uid=R115325018&ga=GA1.2.726111961.1693464081&semt=ais" },
		{ id: 1, name: "Charity Outreach", des: "Kira Municipal cleaning on saturday 6pm", date: "14th-09", photo: "https://images.pexels.com/photos/4867670/pexels-photo-4867670.jpeg?auto=compress&cs=tinysrgb&w=1600" },

		{ id: 1, name: "Charity Outreach", des: "Kira Municipal cleaning on saturday 6pm", date: "14th-09", photo: "https://images.pexels.com/photos/7328448/pexels-photo-7328448.jpeg?auto=compress&cs=tinysrgb&w=1600" },

		{ id: 1, name: "Charity Outreach", des: "Kira Municipal cleaning on saturday 6pm", date: "14th-09", photo: "https://img.freepik.com/free-photo/medium-shot-black-woman-holding-kid_23-2149602760.jpg?size=626&ext=jpg&uid=R115325018&ga=GA1.2.726111961.1693464081&semt=ais" },

		{ id: 1, name: "Charity Outreach", des: "Kira Municipal cleaning on saturday 6pm", date: "14th-09", photo: "https://img.freepik.com/free-photo/medium-shot-black-woman-holding-kid_23-2149602760.jpg?size=626&ext=jpg&uid=R115325018&ga=GA1.2.726111961.1693464081&semt=ais" },

		{ id: 1, name: "Charity Outreach", des: "Kira Municipal cleaning on saturday 6pm", date: "14th-09", photo: "https://img.freepik.com/free-photo/medium-shot-black-woman-holding-kid_23-2149602760.jpg?size=626&ext=jpg&uid=R115325018&ga=GA1.2.726111961.1693464081&semt=ais" },
	]





	return (
		<div className="h-screen overflow-y-auto">
			<Cards />
			<div className="flex w-full">
				<div className="w-7/12">
					<div className="rounded-md w-full shadow-md bg-white h-[65vh] p-5">
						<p className="text-xl text-primary font-semibold">Attendence Graph</p>
						<BarGraph />

					</div>
					<div className="bg-white shadow h-[50vh] overflow-y-auto rounded-md p-2 mt-2 shadow-md">
						<p className="my-2 text-xl font-semibold text-primary">Members who didn't attend Previous Meeting</p>
						<div className="flex font-medium text-primary bg-gray1">
							<div className="p-2 w-1/4">
								Name
							</div>
							<div className="p-2 w-1/4">
								Email
							</div>
							<div className="p-2 w-1/4">
								Phone Number
							</div>
							<div className="p-2 w-1/4">
								Kids
							</div>

						</div>

						{members.map((mem) => {
							return (
								<div className="flex text-sm border-b border-gray1 cursor-pointer text-gray5 hover:bg-gray1">
									<div className="p-2 w-1/4 flex">

										<img src={mem.photo} className="h-10 w-10 object-cover rounded-full" />
										<div className="ml-2">	{mem.fn} {mem.ln} </div>
									</div>
									<div className="p-2 w-1/4">
										{mem.emails}
									</div>
									<div className="p-2 w-1/4">
										{mem.contact}
									</div>
									<div className="p-2 w-1/4">
										{mem.kids}
									</div>

								</div>
							)
						})}

					</div>
				</div>
				<div className="w-5/12 rounded-md shadow-md bg-white ml-2 overflow-y-auto p-2">
					<p className="m-2 text-xl font-semibold text-primary">Last Giving</p>
					<div className="h-[40vh] overflow-y-auto mt-2">
						{givings.map((giv) => {
							return (
								<div className="flex justify-between p-2 hover:bg-gray1 border-b border-gray1 hover:border-2 cursor-pointer hover:border-l-primary">
									<div>
										<p>{giv.type}</p>
										<p className="text-sm font-light text-gray5">{giv.name}</p>
									</div>
									<p className="text-primary font-medium text-lg">{giv.amount}</p>
								</div>
							)
						})}
					</div>
					<br />

					<p className="m-2 text-xl font-semibold text-primary">Latest News</p>
					<div className="flex flex-wrap h-[50vh] overflow-y-auto">
						{news.map((n) => {
							return (
								<div className="p-2  md:w-full sm:w-full ">

									<div style={{ backgroundImage: `url(${n.photo})`, backgroundSize: 'cover' }} className="rounded-md">
										<div className="bg-black/50 h-32 rounded-md p-2">
											<div className="h-16">

											</div>
											<div className="flex">
												<div className="w-2/3">
													<p className="text-white font-medium">{n.name}</p>
													<p className="text-white font-light text-xs truncate">{n.des}</p>
												</div>
												<div className="w-1/3">
													<div className="bg-secondary p-2 rounded-md">
														<p className="text-white">{n.date}</p>
													</div>
												</div>

											</div>

										</div>
									</div>
								</div>
							)
						})}
					</div>

				</div>
			</div>
		</div>
	);
};

export default Dashboard;
