import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Card } from 'react-bootstrap';

// This page aims to list all the projects joined by the current user.
// The Projects page is where users can be able to see ones submissions and submit their work there.

export default class MyProjects extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	projects:[],
	    	username: null
	    };
	 }
	  
	componentDidMount() {
		// Getting current users' username.
		axios.get('http://localhost:5000/users/getinfo', {withCredentials: true}) 
			.then(response => {
				this.setState({
					username: response.data.username
				})
			})
			.catch(function (error) {
		        console.log(error);
		    })
		// Fetching all users' projects.
		axios.get('http://localhost:5000/projects/getinfo', {withCredentials: true}) 
		    .then(response => {
		        this.setState({projects: response.data})
	        })
		    .catch(function (error) {
		        console.log(error);
		    })
	}
	// Creating a card component for each displayed project.
	createProjectComponent = (title, username, points_awarded, status) => {
		return <div>
			<Card style={{width: '100%'}}>
				<Card.Body>
				<Card.Title>{title}</Card.Title>
				<Card.Subtitle className="mb-2 text-muted"> {points_awarded} | {status}</Card.Subtitle>
				<Card.Text>{username}</Card.Text>
				</Card.Body>
			</Card>
			<br></br>
		</div>
	}

	render() {
		const {username} = this.state;

  		return(	
  			<div>
  				<h1>My Projects</h1>
  				{this.state.projects.reverse().map((project, index) => {
  					if(project.username == username){
  						return <div>			
  						{this.createProjectComponent(project.projectName, project.username, 
  											         project.projectPoints, project.status)}
  					</div>		
  					}			 	
				})}
         	</div>
  		);
	}
}
    
