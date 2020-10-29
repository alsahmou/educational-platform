import React, { Component} from 'react';
import axios from 'axios';
import { Button, Card } from 'react-bootstrap';
import Switch from "react-switch";


var username = null

export default class newsfeeds extends Component {
	constructor(props) {
	    super(props);

	    this.onSwitch = this.onSwitch.bind(this)
	    this.updateDB = this.updateDB.bind(this)

	    this.state = {
	    	date: new Date(),
	    	checked: false,
	    	isGroup: false
	    };
	 }

	componentDidMount() {
		axios.get('http://localhost:5000/users/getinfo') 
	      .then(response => {
	        username = response.data.username
	      })
	      .catch(function (error) {
	        console.log(error);
	      })
	   }
	// Handling the switch button.
	onSwitch(checked) {
		console.log(checked)
	    this.setState({
	    	checked: checked,
	    	isGroup: !this.state.isGroup
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
		const newAdminProject = {
			username: username,
			projectName: this.refs.projectTitle.value,
			projectPicture: this.refs.projectTitle.value,
			participantsNumber: this.refs.numberOfParticipants.value,
			users: [],
			description: this.refs.description.value,
			projectPoints: this.refs.points.value,
			dueDate: this.refs.dueDate.value,
			isGroup: this.state.checked,
			groupSize:this.refs.numberOfTeam.value
		}
		axios.post('http://localhost:5000/adminprojects/add', newAdminProject)
		window.location.href = "/newsfeed"
	}
	
	render() {
		return (
			<div>
		        <h1>Create Project!</h1>
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
		        <Switch onChange={this.onSwitch} checked={this.state.checked}/>		        
	        	{this.displayInput()} 
	    	</form>
		    	<Button type="button" onClick={this.updateDB}>Submit</Button>
		        <Button type="button" href="/newsfeed">Cancel</Button>
		    </div>
		)
	}
}

