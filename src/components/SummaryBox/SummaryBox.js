import React from 'react';
import './SummaryBox.css';


const SummaryBox = (props) => {
	const length = props.data.length;
	const is_are = length > 1 ? 'are' : 'is';
	const center = length > 1 ? 'centers that match' : 'center that matches';

	return (
		<div className="summary-box">		
			<h2>There {is_are} <span className="highlight">{length}</span> testing {center} your criteria.</h2>
		</div>
	)
}

export default SummaryBox;

