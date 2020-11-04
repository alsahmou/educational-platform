import React, { Component } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'

class LeaderboardComp extends Component {
  // Username is fetched from cookies to display user's info on the page
  constructor (props) {
    super(props)
    this.state = {
      projects: []
    }
  }
  componentDidMount () {
    axios.get('http://localhost:5000/projects/getGraded', {withCredentials: true})
          .then(response => {
            this.setState({projects: response.data})
          })
          .catch((error) => {
            console.log(error)
          })
  }

  displayUserView = () => {
    return (
      <div>
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


  handleLogOut = (event) => {
    Cookies.remove()

    axios.get('http://localhost:5000/logout', {withCredentials: true})
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
   return (
     <div>
       {this.displayUserView()}
     </div>
   )
  }
}

export default LeaderboardComp
