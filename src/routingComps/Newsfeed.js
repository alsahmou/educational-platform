import React, { Component } from 'react';
import axios from 'axios';
import { Button, Card } from 'react-bootstrap';

var buttons = []
var user = null

export default class newsfeeds extends Component {
	constructor(props) {
	    super(props);

	    this.state = {
	    	projects: [],
	    	disabledButtons:[],
	    	projectsIds:[],
	    	isAdmin: null,
	    	username: null
	    };
	 }

	componentDidMount() {
		// Getting the required info of the current user.
		axios.get('http://localhost:5000/users/getinfo',  {withCredentials: true})
			.then(response => {
				this.setState({
					isAdmin: response.data.isAdmin,
					username: response.data.username
				})
			})
			.catch(function (error) {
		        console.log(error);
		    })
		// Ensuring that the value of the username is fetched right.
		setTimeout(() => 
		// Getting the posted projects.
	 	axios.get('http://localhost:5000/adminProjects/', {withCredentials: true}) 
		    .then(response => {
		        var projectsIds = []
		        var indices = []
		        buttons = new Array(response.data.length).fill(false)
		    	response.data.reverse().map((project, index) => {
		    		// Figuering out the projects that the current user is enrolled in.
		    		// Saving the index of these projects to disable the associated join button.
					project.users.map((username) => {
						if(username == this.state.username){
							projectsIds = projectsIds.concat(project._id)
							indices = indices.concat(index)
						}	
					})
				})
	    		// Disabling the join buttons associated with the joined projects of the current user.
		    	indices.map((indx) => {
		    		buttons.map((button, index) => {
						if(indx == index){
							let button = buttons
							button[index] = true
				buttons = button
						}
					})
		    	})
				this.setState({
					projects: response.data,
		        	disabledButtons: new Array(response.data.length).fill(false),
					projectsIds:projectsIds
				})
			})
		    .catch(function (error) {
		        console.log(error);
		    })
			,2000)
	}

	// Modifying the state of a particulare button to disabled.
	setDisabledButton = (i) => {
		this.state.disabledButtons.map((button, index) => {
			if(i == index){
				let button = buttons
				button[index] = true
				this.setState({
					disabledButtons: button
				})
			}
		})
	}

	// Updating the database with the new enrolled user.
	updateDB = (e, i) => {
		this.setDisabledButton(i)
		var projectId = String(e.currentTarget.id)
		const newUser = {
			username: this.state.username
		}
		this.state.projects.map((project) => {
			if(project._id == e.currentTarget.id){
				// console.log(project.)
				var today = new Date()
			    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
				const newProject = {
					username: this.state.username,
					status: "Recently joined",
					projectName: project.projectName,
					submissionDate: String(date),
					attachments: [],
					karmaPoints: 0,
					communicationPoints: 0,
					projectPoints: 0,
					isGraded: false
				}
				// console.log(newProject)
				axios.post('http://localhost:5000/projects/add', newProject)
				// console.log(date)
				// console.log(project)
			}
		})
		// console.log(this.state.projects(e.currentTarget])
		// console.log(newUser.username)
		axios.post('http://localhost:5000/adminProjects/adduser/' + projectId, newUser)
	}

	// Adding the Create button, if isAdmin, below the last rendered card.
	displayCreateButton = (index, length) => {
		if(index == length-1 && this.state.isAdmin == true){
			return <Button type="button" href="/CreateProject">Create Project</Button>	
		}
	}

	//Adding Join button for non admin users.
	displayJoinButton = (index, project) =>{
		if(this.state.isAdmin == false){
			return <Button type= "button" onClick={e => {this.updateDB(e, index)}} id={project._id} disabled={buttons[index]}>Join Project</Button>
		}
	}

	render() {
		const {projects} = this.state; 
		const {disabledButtons} = this.state;
		var indx = 0
		return (
			<div>
				{projects.map((project, index) => {
					indx = index
					return <div key={index}>
						<Card style={{ width: '100%' }}>
						<Card.Body>
							<Card.Title>{project.projectName}</Card.Title>
							<Card.Subtitle className="mb-2 text-muted">
								{project.projectPoints} pts | due on {project.dueDate}
							</Card.Subtitle>
							<Card.Text>{project.username}</Card.Text>
							{this.displayJoinButton(index, project)}
						</Card.Body>
						</Card>
						<br></br>
					</div>
				})}
				{this.displayCreateButton(indx, projects.length)}
			</div>
		)
	}
}