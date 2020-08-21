import React, { Component, Fragment } from 'react';
import * as Moment from 'moment-timezone';
import ToggleSwitch from 'react-switch';
// import Filters from '../Filters/Filters';
// import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import Autocomplete from '../Autocomplete/Autocomplete';
import SummaryBox from '../SummaryBox/SummaryBox';
import CardList from '../CardList/CardList';
import './Layout.css';

export class Layout extends Component {
	state = {
		appointment: 'no',
		appointment_bool: false,
		city: '',
		data: [],
		filteredData: [],
		kids_toggle: 'yes',
		locationCount: 0,
		tmpData: []
	};

	componentDidMount() {
		// fetch data file but never take a cached version
		fetch(this.props.dataURL, {cache: 'no-store'})
			.then(response => response.json())
			.then(data => {
				console.log(data)
				const cities = data.map(d => d.city);

				this.setState({ 
					data: data,
					cityList: [...new Set(cities)],
					filteredData: data,
					tmpData: data
				});
			});
	}

	filterData(city, appointment) {
		let filtered;
		console.log(city.length)
		if (city.length > 0) {
			filtered = this.state.data
				.filter(d => {
					return d.city.toLowerCase() === city;
				})
				.filter(d => {
					return appointment === 'yes' ? d.appointment_required.toLowerCase() === appointment : d.appointment_required;
				});
		} else {
			filtered = this.state.data
				.filter(d => {
					return appointment === 'yes' ? d.appointment_required.toLowerCase() === appointment : d.appointment_required;
				})
				.filter(d => {
					return d.city;
				})
		}
		
		this.setState({
			filteredData: filtered
		});
	}
	handleInputChange(event) {
		const city = event.toLowerCase();

		this.setState({
			city: city
		});

		this.filterData(city, this.state.appointment);
	}

	handleAppointmentToggleChange(event) {
		const appointment = event ? 'yes' : 'no';
		this.setState({
			appointment: appointment,
			appointment_bool: event
		});

		this.filterData(this.state.city, appointment);
	}

	handleKidsToggleChange(event) {
		const status = event ? 'yes' : 'no';
		const tmp = this.state.filteredData;

		const filteredLocations = status === 'no' ? this.state.filteredData.filter(d => d.accept_kids.toLowerCase() === 'no') : this.state.tmpData;

		this.setState({
			kids_toggle: event,
			filteredData: filteredLocations,
			tmpData: tmp
		});
	}

	setTimestamp(timestamp) {
		return Moment.tz(timestamp, 'America/Vancouver').calendar();
	}

	render() {
		let results;
		if (this.state.filteredData.length > 0) {
			results = <CardList data={this.state.filteredData}></CardList>;
		} else {
			results = <p className="no-data">No cancellations</p>;
		}
		return (
			<Fragment>
				<div id="filter-list">
					<label className="autocomplete-container">
						<h4>City:</h4>
 						<Autocomplete 
 							suggestions={this.state.cityList} 
 							onKeyDown={this.handleInputChange.bind(this)}
 							onSelect={this.handleInputChange.bind(this)} 
 						/>
 					</label>
 					<label className="toggle-container">
 						<h4>Appointment required</h4>
						<ToggleSwitch
							checked={this.state.appointment_bool}
							className='appointment-switch'
							onChange={this.handleAppointmentToggleChange.bind(this)}
							onColor='#9b3f86'
						/>
					</label>
					
 				</div>
				
				<SummaryBox data={this.state.filteredData}></SummaryBox>
				{results}
			</Fragment>
		);
	}
}

export default Layout;


/*
*
* <footer className="footer">{`Last update: ${this.state.timestamp}`}</footer>
*


<label className="toggle-container">
		<h4>Accepts kids</h4>
	<ToggleSwitch
		checked={this.state.kids_toggle}
		onChange={this.handleKidsToggleChange.bind(this)}
		className='kids-switch'
	/>
</label>

*/