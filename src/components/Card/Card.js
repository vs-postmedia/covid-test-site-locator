import React from 'react';
import './Card.css';

const Card = (props) => {
	const d = props.data;

	// const ha = d.ha.toLowerCase().replace(/\s/g, '-');
	// const kids = d.accept_kids.toLowerCase() === 'yes' ? 'kids' : '';
	// const appointment = d.appointment_required.toLowerCase() === 'yes' ? 'appointment' : '';
	
	return (
		<div className='card'>
			<header>
				<h3>{d.name}</h3>
				<p className="type">{d.city}</p>
			</header>

			<div className="contact">
				<p className="address">{d.address}</p>
				<p><span className="bold">Phone:</span> {d.phone}</p>
			</div>

			<div className="info">
				<p>Appointment required: <span className="bold">{d.appointment_required}</span></p>
				<p>Accepts children: <span className="bold">{d.accept_kids}</span></p>
			</div>
			
			<h4>Details</h4>
			<p className="details"><span className="bold">Open: </span>{d.availability}</p>
			<p className="details">{d.criteria}</p>
		</div>
	);
}

export default Card;
