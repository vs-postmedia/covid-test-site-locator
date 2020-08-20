import React, { Component, Fragment } from 'react';
import * as Moment from 'moment-timezone';
import Input from '../Input/Input';
import SummaryBox from '../SummaryBox/SummaryBox';
import CardList from '../CardList/CardList';
import './Layout.css';

export class Layout extends Component {
	state = {
		data: [],
		filteredData: [],
		timestamp: ''
	};

	componentDidMount() {
		// fetch data file but never take a cached version
		fetch(this.props.dataURL, {cache: 'no-store'})
			.then(response => response.json())
			.then(data => {
				console.log(data)
				this.setState({ 
					data: data,
					filteredData: data.filter(d => d.city === 'Vancouver') // filter for vancouver
				})
			});
	}

	setTimestamp(timestamp) {
		return Moment.tz(timestamp, 'America/Vancouver').calendar();
	}

	handleInputChange(event) {
		// const selectedRoute = event.target.value === '' ? this.state.data : this.state.data.filter(d => d.route.includes(event.target.value));
		const selectedRoute = event.target.value === '' ? this.state.data : this.state.data.filter(d => d.route === event.target.value.toUpperCase());

		this.setState({
			filteredData: selectedRoute
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
				<Input onChange={this.handleInputChange.bind(this)}></Input>
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