import React from 'react';
import Layout from '../Layout/Layout';
import './App.css';


// VARS
const dataUrl = 'https://vs-postmedia-data.sfo2.digitaloceanspaces.com/covid-testing-locations.json';

function App() {
	return (
	  	<div className="App">
	  		<h1>Find a test site near you</h1>
	  		<Layout dataURL={dataUrl}></Layout>
	  	</div>
	);
}

export default App;
