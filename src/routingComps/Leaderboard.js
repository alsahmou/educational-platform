import React, { Component } from 'react'
import axios from 'axios'

class LeaderboardComp extends Component {
  // Constructing props with state including projects and users points
  constructor (props) {
    super(props)
    this.state = {
      projects: [],
      usersPoints: {}
    }
  }
  componentDidMount () {
    // Axios get request to receive all graded projects and set projects array in the state with the values of the projects data
    axios.get('http://localhost:5000/projects/getGraded')
          .then(response => {
            this.setState({projects: response.data})
          })
          .catch((error) => {
            console.log(error)
          })
  }

  displayLeaderboard = () => {
    return (
      <div>
        <h3>Leaderboard</h3>
        {/* Mapping through the projects in the state to assign the usersPoints with users and their cumulitave points from all projects */}
        {this.state.projects.map((project) => {
          // Assiging the value of total points to total points variable to be displayed on the leaderboard
          project.totalPoints = project.communicationPoints + project.projectPoints + project.karmaPoints
          var usersPoints = {}
          var i
          // Looping through all the projects to add the points accumlated by each user to usersPoints Object 
          for (i = 0; i < this.state.projects.length; i++) {
            if (this.state.projects[i].username in usersPoints) {
              usersPoints[this.state.projects[i].username] = {
                'Project Points': this.state.projects[i].projectPoints + usersPoints[this.state.projects[i].username]['Project Points'],
                'Karma Points': this.state.projects[i].karmaPoints + usersPoints[this.state.projects[i].username]['Karma Points'],
                'Communication Points': this.state.projects[i].communicationPoints + usersPoints[this.state.projects[i].username]['Communication Points'],
                'Total Points': this.state.projects[i].totalPoints + usersPoints[this.state.projects[i].username]['Total Points'],
              }
            }
            else {
              usersPoints[this.state.projects[i].username] = {
                'Project Points': this.state.projects[i].projectPoints,
                'Karma Points': this.state.projects[i].karmaPoints,
                'Communication Points': this.state.projects[i].communicationPoints,
                'Total Points': this.state.projects[i].totalPoints,
              }
            }
          }
          this.state.usersPoints = usersPoints
        })}
        <table className='table'>
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Project Points</th>
              <th>Karma Points</th>
              <th>Communication Points</th>
              <th>Total Points</th>
            </tr>
          </thead>
          <tbody>
            {/* Displaying information from usersPoints */}
            {Object.entries(this.state.usersPoints).map((entry) => {
              return <tr>
                <td>{entry[0]}</td>
                <td>{entry[1]['Project Points']}</td>
                <td>{entry[1]['Karma Points']}</td>
                <td>{entry[1]['Communication Points']}</td>
                <td>{entry[1]['Total Points']}</td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    )
  }

  render () {
   return (
     <div>
       {this.displayLeaderboard()}
     </div>
   )
  }
}

export default LeaderboardComp
