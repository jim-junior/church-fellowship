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
import { useDispatch, useSelector } from "react-redux";
import { getMeetings, getMembers, getNews, getTransactions } from "../store/schoolSheetSlices/schoolStore";


const Dashboard = () => {
	const dispatch = useDispatch();
	const { members, news, transactions, meetings } = useSelector((state) => state.fellowShipStore)
	const [absent, setAbsent] = useState([])

	useEffect(() => {
		dispatch(getMembers())
		dispatch(getNews())
		dispatch(getTransactions())
		dispatch(getMeetings())
	}, [])

	useEffect(() => {

	}, [meetings])








	return (
		<div className="h-screen overflow-y-auto">
			<Cards members={members} meetings={meetings} />
			<div className="flex w-full">
				<div className="w-7/12">
					<div className="rounded-md w-full shadow-md bg-white h-[65vh] p-5">
						<p className="text-xl text-primary font-semibold">Attendence Graph</p>
						<BarGraph meetings={meetings} />

					</div>
					<div className="bg-white shadow h-[50vh] overflow-y-auto rounded-md p-2 mt-2 shadow-md">
						<p className="my-2 text-xl font-semibold text-primary">Members who didnt attend Previous Meeting</p>
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
								<div key={mem.id} className="flex text-sm border-b border-gray1 cursor-pointer text-gray5 hover:bg-gray1">
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
						{transactions.map((giv) => {
							if (giv.status !== "success") {
								return null
							}
							return (
								<div key={giv.id} className="flex justify-between p-2 hover:bg-gray1 border-b border-gray1 hover:border-2 cursor-pointer hover:border-l-primary">
									<div>
										<p>{giv.transaction_type}</p>
										<p className="text-sm font-light text-gray5">{giv.reason}</p>
									</div>
									<p className="text-primary font-medium text-lg">{giv.amount}</p>
								</div>
							)
						})}
					</div>
					<br />

					<p className="m-2 text-xl font-semibold text-primary">Latest News</p>
					<div className="flex flex-wrap h-[50vh] overflow-y-auto">
						{news.slice(0, 5).map((n) => {
							return (
								<div key={n.id} className="p-2  md:w-full sm:w-full ">

									<div style={{ backgroundImage: `url(${n.image})`, backgroundSize: 'cover' }} className="rounded-md">
										<div className="bg-black/50 h-32 rounded-md p-2">
											<div className="h-16">

											</div>
											<div className="flex">
												<div className="w-2/3">
													<p className="text-white font-medium">{n.title}</p>
													<p className="text-white font-light text-xs truncate">{n.description}</p>
												</div>
												<div className="w-1/3">
													<div className="bg-secondary p-2 rounded-md">
														<p className="text-white">{
															new Date(n.date).toLocaleDateString()
														}</p>
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
