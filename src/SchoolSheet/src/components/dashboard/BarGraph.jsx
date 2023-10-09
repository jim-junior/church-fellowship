import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

function BarGraph({ meetings }) {
	const [graphData, setGraphData] = useState(null);

	useEffect(() => {
		const labels = []
		const datasets = []
		meetings?.slice(0, 10).forEach(element => {
			labels.push(element.title)
			datasets.push(element.participants?.length)
		});
		const newChartData = {
			labels: meetings?.slice(0, 10).map((item) => item.title),
			datasets: [
				{
					label: "Members Attended",
					data: meetings?.slice(0, 10).map((item) => item.participants?.length),
					backgroundColor: "#FE7D06",
				},
			],
			responsive: true,
		};


		setGraphData(newChartData)

	}, [meetings])





	return <div className="w-full">{
		graphData && <Bar data={graphData} />
	}</div>;
}

export default BarGraph;
