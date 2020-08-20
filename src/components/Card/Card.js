import React from 'react';
import './Card.css';

const Card = (props) => {
	const d = props.data;

	const ha = d.ha.toLowerCase().replace(/\s/g, '-');
	const kids = d.accept_kids.toLowerCase() === 'yes' ? 'kids' : ''
	const appointment = d.appointment_required.toLowerCase() === 'yes' ? 'appointment' : ''
	
	return (
		<div className={`card ${ha} ${d.city.toLowerCase} ${kids} ${appointment}`}>
			<header>
				<h2>{d.name}</h2>
				<p className="type">{d.city}</p>
			</header>

			<div className="info">
				<p className="address">{d.address}</p>

				<p>Apointment required: <span className="bold">{d.appointment_required}</span></p>
				<p>Accepts children: <span className="bold">{d.accept_kids}</span></p>
			</div>
			
			<h4>Details</h4>
			<p className="info">{d.criteria}</p>
			
		</div>
	);
}

export default Card;
