import React, { Component, Fragment } from 'react';
import * as Moment from 'moment-timezone';
// import Filters from '../Filters/Filters';
import Autocomplete from '../Autocomplete/Autocomplete';
import SummaryBox from '../SummaryBox/SummaryBox';
import CardList from '../CardList/CardList';
import './Layout.css';

export class Layout extends Component {
	state = {
		data: [],
		filteredData: [],
		locationCount: 0,
		timestamp: ''
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
					filteredData: data
				});
			});
	}

	setTimestamp(timestamp) {
		return Moment.tz(timestamp, 'America/Vancouver').calendar();
	}

	handleInputChange(event) {
		
		// const selectedRoute = event.target.value === '' ? this.state.data : this.state.data.filter(d => d.route === event.target.value.toUpperCase());
		const selectedCity = event === '' ? this.state.data : this.state.data.filter(d => d.city.toLowerCase() === event.toLowerCase());

		this.setState({
			filteredData: selectedCity,
			locationCount: selectedCity.length
		});
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
				<div className="filter-list">
 					<Autocomplete 
 						suggestions={this.state.cityList} 
 						onKeyDown={this.handleInputChange.bind(this)}
 						onSelect={this.handleInputChange.bind(this)} />
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
*/

// <Filters 
// 	data={this.state.data}
// 	cityList={this.state.cityList}
// 	onChange={this.handleInputChange.bind(this)}
// >
// </Filters>