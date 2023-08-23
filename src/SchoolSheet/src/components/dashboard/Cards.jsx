import * as React from "react";
import { FaUsers, FaFileInvoiceDollar, FaTooth } from "react-icons/fa";
import { TbZoomMoney } from "react-icons/tb"


function Cards() {

	return (
		<div className="flex w-full">

			<div className="w-1/4 my-2 mr-2 p-3 h-24  bg-primary text-white shadow  rounded-md">
				<p className="text-lg font-semibold">
					Members
				</p>
				<div className="flex justify-between mt-3 text-sm">
					<div>
						20
					</div>
					<div>
						View All
					</div>
				</div>
			</div>

			{/* first card */}

			<div className="w-1/4 m-2 p-2 h-32   bg-white shadow hover:bg-blue11 cursor-pointer rounded-md border-b-4 border-blue1">
				<div className="flex justify-between">
					<div className="">
						<div className="">
							<p className="text-gray5">Last Metting</p>
						</div>
					</div>
					<div className="">
						<FaUsers />
					</div>
				</div>
				<div className="flex justify-between mt-12">
					<div className="">
						<p className="text-2xl">{20}</p>
					</div>
					<div className="">
						<p className="bg-blue11 p-2 text-primary text-xs rounded">View All</p>
					</div>
				</div>
			</div>

			{/* second card */}

			<div className="w-1/4 m-2 p-2 h-32   bg-white shadow hover:bg-yellow11 cursor-pointer rounded-md border-b-4 border-yellow">
				<div className="flex justify-between">
					<div className="">
						<div className="">
							<p className="text-gray5">2nd Last Meeting</p>
						</div>
					</div>
					<div className="">
						<FaFileInvoiceDollar />
					</div>
				</div>
				<div className="flex justify-between mt-12">
					<div className="">
						<p className="text-2xl">
							12
						</p>
					</div>
					<div className="">
						<p className="bg-yellow11 p-2 text-orange text-xs rounded">View All</p>
					</div>
				</div>
			</div>

			{/* third card */}

			<div className="w-1/4 m-2 p-2 h-32    bg-white shadow hover:bg-green11 cursor-pointer rounded-md border-b-4 border-green">
				<div className="flex justify-between">
					<div className="">
						<div className="">
							<p className="text-gray5">3rd Last Meeting</p>
						</div>
					</div>
					<div className="">
						<TbZoomMoney />
					</div>
				</div>
				<div className="flex justify-between mt-12">
					<div className="">
						<p className="text-2xl">
							15
						</p>
					</div>
					<div className="">
						<p className="bg-green11 p-2 text-green text-xs rounded">View All</p>
					</div>
				</div>
			</div>

			{/* fourth card */}

			<div className="w-1/4 m-2 p-2 h-32   bg-white shadow hover:bg-red1 cursor-pointer rounded-md border-b-4 border-red">
				<div className="flex justify-between">
					<div className="">
						<div className="">
							<p className="text-gray5">Attendance</p>
						</div>
					</div>
					<div className="">
						<FaUsers />
					</div>
				</div>
				<div className="flex justify-between mt-12">
					<div className="">
						<p>204</p>
					</div>
					<div className="">
						<p className="bg-red1 p-2 text-red text-xs rounded">View All</p>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Cards;
