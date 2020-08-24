import React from 'react';
import './SummaryBox.css';


const SummaryBox = (props) => {
	const length = props.data.length;
	const is_are = length === 1 ? 'is' : 'are';
	const center = length === 1 ? 'center that matches' : 'centers that match';

	return (
		<div className="summary-box">		
			<h2>There {is_are} <span className="highlight">{length}</span> testing {center} your criteria.</h2>
		</div>
	)
}

export default SummaryBox;

