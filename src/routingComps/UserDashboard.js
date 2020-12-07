import React, { Component } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import { session } from 'passport'

class UserDashboard extends Component {
  // Username is fetched from cookies to display user's info on the page
  constructor (props) {
    super(props)
    this.state = {
      username: null,
      aboutMe: null,
      profilePicture: null,
      projects: [],
      isAdmin: null, 
      isEditView: false,
      userId: null,
      ip : window.location.hostname
    }
  }

  // Get request is sent to the server to return responses with the user's info by setting the state's parameters 
  componentDidMount () {
    const username  = null
    axios.get('http://'+this.state.ip+':5000/users/getinfo', {withCredentials: true})
      .then(response => {
        if (response.data == null){
          console.log('no response')
          window.location = '/login'
        }
        this.setState({ username: response.data.username, 
        aboutMe: response.data.aboutMe, 
        profilePicture: response.data.profilePicture,
        isAdmin: String(response.data.isAdmin),
        userId: response.data._id
      })
      if (this.state.isAdmin == 'true') {
        axios.get('http://'+this.state.ip+':5000/adminProjects/' + username)
        .then(response => {
          this.setState({projects: response.data})
        })
        .catch((error) => {
          console.log(error)
        })
      }
      else {
        axios.get('http://localhost:5000/projects/getinfo', {withCredentials: true})
        axios.get('http://'+this.state.ip+':5000/projects/getinfo', {withCredentials: true})
          .then(response => {
            this.setState({projects: response.data})
          })
          .catch((error) => {
            console.log(error)
          })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
  setEditView = () => {
		this.setState({
			isEditView: !this.state.isEditView			
    })
  }

  updateUserInformation = () => {
    const user = {
      aboutMe: this.refs.aboutMeInput.value,
      profilePicture: this.refs.profilePictureInput.value
    }
    axios.post('http://'+this.state.ip+':5000/users/update/' + this.state.userId, user)
      .then(resposnse => {
        this.setState({
          isEditView: false, 
          aboutMe: this.refs.aboutMeInput.value,
          profilePicture: this.refs.profilePictureInput.value
        })
      })
      .catch((error) => {
        console.log(error)
      })

  }

  
  displayEditView = () => {
    return <div>
      <h6>About Me:</h6>
				<input
					type="text"
					defaultValue={this.state.aboutMe}
					ref="aboutMeInput"
				/>
      <h6>Profile Picture:</h6>
        <input 
          type='text'
          defaultValue={this.state.profilePicture}
          ref='profilePictureInput'/>
      <button onClick={this.updateUserInformation}>save</button>
			<button onClick={this.setEditView}>discard</button>
    </div>
  }

  displayDefaultView = () => {
    return <div>
      <h6>{this.state.aboutMe}</h6>
      <h6>{this.state.profilePicture}</h6>
      <button onClick={this.setEditView}>edit me</button> 
    </div>
  }

  displayUserView = () => {
    return (
      <div>
        <h1>Welcome to the user dashboard {this.state.username}</h1>
        {this.state.isEditView ? 
          this.displayEditView() :
          this.displayDefaultView()}
        <h3>Projects</h3>
        <table className='table'>
          <thead className="thead-light">
            <tr>
              <th>Project Name</th>
              <th>Status</th>
              <th>Project Points</th>
              <th>Submission Date</th>
              <th>Communication Points</th>
              <th>Karma Points</th>
              <th>Graded?</th>
            </tr>
          </thead>
          <tbody>
            {this.state.projects.map((project) => {
              return <tr>
                <td>{project.projectName}</td>
                <td>{project.status}</td>
                <td>{project.projectPoints}</td>
                <td>{project.submissionDate}</td>
                <td>{project.communicationPoints}</td>
                <td>{project.karmaPoints}</td>
                <td>{String(project.isGraded)}</td>
              </tr>
            })}
          </tbody>
        </table>

        <p><button onClick={this.handleLogOut}>Logout</button></p>
      </div>
    )
  }

  displayAdminView = () => {
    return <div>
      <h1>Welcome to the user dashboard {this.state.username}</h1>
        {this.state.isEditView ? 
          this.displayEditView() :
          this.displayDefaultView()}
        <h3>Admin Projects</h3>
        <table className='table'>
          <thead className="thead-light">
            <tr>
              <th>Project Name</th>
              <th>Participants Number</th>
              <th>Project Points</th>
              <th>Group Project?</th>
            </tr>
          </thead>
          <tbody>
            {this.state.projects.map((project) => {
              return <tr>
                <td>{project.projectName}</td>
                <td>{project.participantsNumber}</td>
                <td>{project.projectPoints}</td>
                <td>{String(project.isGroup)}</td>
              </tr>
            })}
          </tbody>
        </table>
        <p><button onClick={this.handleLogOut}>Logout</button></p>

        </div>

  }


  handleLogOut = (event) => {
    Cookies.remove()

    axios.get('http://'+this.state.ip+':5000/logout', {withCredentials: true})
      .then(res => {
        console.log('axios in logout')
        Cookies.remove()
        console.log('axios after cookies removal')
        window.location = './'
      } 
    )
      .catch((error) => {
        console.log(error)
      }) 
    

  }

  render () {
    if (this.state.isAdmin == 'true'){
      return (	
        <div>
          {this.displayAdminView()}
        </div>
      )
    }
   return (
     <div>
       {this.displayUserView()}
     </div>
   )
  }
}

export default UserDashboard
