import React, { Component, Fragment } from 'react';
import * as Moment from 'moment-timezone';
import ToggleSwitch from 'react-switch';
import Autocomplete from '../Autocomplete/Autocomplete';
import SummaryBox from '../SummaryBox/SummaryBox';
import CardList from '../CardList/CardList';
import './Layout.css';

export class Layout extends Component {
	state = {
		city: '',
		data: [],
		filteredData: [],
		filters: {
			appointment: false,
			drive_thru: false,
			open_weekend: false
		}
	};

	componentDidMount() {
		// fetch data file but never take a cached version
		fetch(this.props.dataURL, {cache: 'no-store'})
			.then(response => response.json())
			.then(data => {

				// console.log(data)

				const cities = data.map(d => d.city);
				// hack to display all cities if nothing is entered in the search box
				cities.unshift('');

				this.setState({ 
					data: data,
					cityList: [...new Set(cities)],
					filteredData: data,
					tmpData: data
				});
			});
	}

	filterData(city) {
		// const city = this.state.city;
		const filters = this.state.filters;

		let filtered = this.state.data
			.filter(d => filters.appointment === true ? d.filters.appointment === true : d)
			.filter(d => filters.open_weekend === true ? d.filters.open_weekend === true : d)
			.filter(d => filters.drive_thru === true ? d.filters.drive_thru === true : d)
			

		let final = filtered.filter(d => {
			return (
				city ? d.city === city : d
			);
		})
		
		this.setState({
			filteredData: final
		});
	}
	handleInputChange(event) {
		this.setState({
			city: event
		});

		this.filterData(event);
	}

	handleAppointmentToggleChange(event) {
		const filters = this.state.filters;
		filters.appointment = event;

		this.setState({
			filters: filters
		});

		this.filterData();
	}

	handleDrivethruToggleChange(event) {
		const filters = this.state.filters;
		filters.drive_thru = event;

		this.setState({
			filters: filters
		});

		this.filterData();
	}

	handleWeekendToggleChange(event) {
		const filters = this.state.filters;
		filters.open_weekend = event;

		this.setState({
			filters: filters
		});

		this.filterData();
	}

	setTimestamp(timestamp) {
		return Moment.tz(timestamp, 'America/Vancouver').calendar();
	}

	render() {
		let results;
		const state = this.state;
		if (this.state.filteredData.length > 0) {
			results = <CardList className={`${state.city} ${state.filters.appointment} ${state.filters.drive_thru} ${state.filters.open_weekend}`} data={state.filteredData}></CardList>;
		} else {
			results = <p className="no-data">No results</p>;
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
 						<h4>Open<br/>weekends</h4>
						<ToggleSwitch
							checked={this.state.filters.open_weekend}
							className='appointment-switch'
							onChange={this.handleWeekendToggleChange.bind(this)}
							onColor='#9b3f86'
						/>
					</label>
 					<label className="toggle-container">
 						<h4>Appointment<br/>required</h4>
						<ToggleSwitch
							checked={this.state.filters.appointment}
							className='appointment-switch'
							onChange={this.handleAppointmentToggleChange.bind(this)}
							onColor='#9b3f86'
						/>
					</label>
 					<label className="toggle-container">
 						<h4>Drive<br/>through</h4>
						<ToggleSwitch
							checked={this.state.filters.drive_thru}
							className='appointment-switch'
							onChange={this.handleDrivethruToggleChange.bind(this)}
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

