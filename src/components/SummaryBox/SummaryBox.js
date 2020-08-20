import React from 'react';
import './SummaryBox.css';


const SummaryBox = (props) => {
	// function calculateStats(data) {
	// 	let stats = {
	// 		bus: 0,
	// 		routes: 0,
	// 		seabus: 0,
	// 		routeList: []
	// 	};

	// 	for (let i = 0; i < data.length; ++i) {
	// 		// how many buses?
	// 		if (data[i].transitType === 'bus') {
	// 			stats.bus++
	// 		} 
	// 		// how many routes?
	// 		if (!stats.routeList.includes(data[i].route)) {
	// 			stats.routeList.push(data[i].route);
	// 			stats.routes++;
	// 		}
	// 	}

	// 	return stats;
	// }

	// const stats = calculateStats(props.data);

	return (
		<div className="summary-box">		
			<h2>There are <span className="highlight">{`${props.data.length}`}</span> testing centers that match your criteria.</h2>
		</div>
	)
}

export default SummaryBox;

