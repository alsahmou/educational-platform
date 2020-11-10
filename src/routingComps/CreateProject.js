import React, { Component} from 'react';
import axios from 'axios';
import { Button, Card } from 'react-bootstrap';

var username = null

export default class CreateProject extends Component {
	constructor(props) {
	    super(props);

	    this.updateDB = this.updateDB.bind(this)
	 }

	componentDidMount() {
		// Getting current users' username.
		axios.get('http://localhost:5000/users/getinfo', {withCredentials: true}) 
			.then(response => {
				username = response.data.username
			})
			.catch(function (error) {
				console.log(error);
			})
	   }

	// Displaying an input textbox if the state of the switch changed.
	displayInput = () => {
		if(this.state.isGroup == true){
			return <div>
				<input 
			          type="text" 
			          placeholder="numberOfTeam" 
			          required
			          ref="numberOfTeam" 
			        />
			        <br></br>
			        <br></br>
			</div>
		}
	}

	// Updating the DB with the new posted project.
	updateDB = () => {
		var isGroup = null
		if(this.refs.numberOfTeam.value > 0) {
			isGroup = true
		}
		else {
			isGroup = false
		}
		// Creating new admin project object
		const newAdminProject = {
			username: username,
			projectName: this.refs.projectTitle.value,
			projectPicture: this.refs.projectTitle.value,
			// Maximum number of students can apply.
			participantsNumber: this.refs.numberOfParticipants.value,
			users: [],
			description: this.refs.description.value,
			projectPoints: this.refs.points.value,
			dueDate: this.refs.dueDate.value,
			isGroup: isGroup,
			// Maximum number of team members.
			groupSize:this.refs.numberOfTeam.value
		}
		// Updating the data base with the new admin project.
		// Redirecting the user to the newsfeed page then.
		axios.post('http://localhost:5000/adminprojects/add', newAdminProject)
		window.location.href = "/newsfeed"
	}
	
	render() {
		return (
			<div>
		        <h1>Create Project.</h1>
	        <form>  
	    	    <input 
		          type="text" 
		          placeholder="Project title" 
		          required
		          ref="projectTitle" 
		        />
		        <br></br>
		        <input 
		          type="text" 
		          placeholder="Number of participants" 
		          required
		          ref="numberOfParticipants" 
		        />
		        <br></br>
		        <input 
		          type="text" 
		          placeholder="Description" 
		          required
		          ref="description" 
		        />
		        <br></br>
		        <input 
		          type="text" 
		          placeholder="Points" 
		          required
		          ref="points" 
		        />
		        <br></br>
		        <input 
		          type="text" 
		          placeholder="DD/MM/YYYY" 
		          required
		          ref="dueDate" 
		        />
		        <br></br>
		        <input 
			        type="text" 
			        placeholder="numberOfTeam" 
			        required
			        ref="numberOfTeam" 
			        />
			    <br></br>
			    
	    	</form>
		    	<Button type="button" onClick={this.updateDB}>Publish</Button>
		        <Button type="button" href="/newsfeed">Cancel</Button>
		    </div>
		)
	}
}

