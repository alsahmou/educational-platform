import React, { Component } from 'react'
import axios from 'axios'

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config)

  // Function to sort table columns depending on the sorting direction
  const sortedItems = React.useMemo(() => {
    const sortableItems = [...items]
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
    }
    return sortableItems
  }, [items, sortConfig])

  // Function to request the direction of the sorting
  const requestSort = (key) => {
    let direction = 'ascending'
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  return { items: sortedItems, requestSort, sortConfig }
}

// Sorted users points table
const UsersPointsTable = (props) => {
  const { items, requestSort, sortConfig } = useSortableData(props.tablePoints)
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return
    }
    return sortConfig.key === name ? sortConfig.direction : undefined
  }
  return (
    <table>
      <caption>Leaderboard</caption>
      <thead>
        <tr>
          <th>
            <button
              type='button'
              onClick={() => requestSort('username')}
              className={getClassNamesFor('username')}
            >
              Username
            </button>
          </th>
          <th>
            <button
              type='button'
              onClick={() => requestSort('projectPoints')}
              className={getClassNamesFor('projectPoints')}
            >
              Project Points
            </button>
          </th>
          <th>
            <button
              type='button'
              onClick={() => requestSort('karmaPoints')}
              className={getClassNamesFor('karmaPoints')}
            >
              Karma Points
            </button>
          </th>
          <th>
            <button
              type='button'
              onClick={() => requestSort('communicationPoints')}
              className={getClassNamesFor('communicationPoints')}
            >
              Communication Points
            </button>
          </th>
          <th>
            <button
              type='button'
              onClick={() => requestSort('totalPoints')}
              className={getClassNamesFor('totalPoints')}
            >
              Total Points
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.username}</td>
            <td>{item.projectPoints}</td>
            <td>{item.karmaPoints}</td>
            <td>{item.communicationPoints}</td>
            <td>{item.totalPoints}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default class LeaderboardComp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tablePoints: [],
      usersPoints: {},
      usersPointsArray: [],
      ip: window.location.hostname
    }
  }

  componentDidMount () {
    // Axios get request to receive all graded projects and place them in the state after being processed by tallyUsersPoints()
    axios.get('http://' + this.state.ip + ':5000/projects/getGraded')
      .then(response => {
        this.setState({ tablePoints: this.tallyUsersPoints(response.data) })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // Processing raw projects from the DB to a format suitable to be used by the table sorting functions
  tallyUsersPoints (rawProjects) {
    // Looping through all the projects to add the points accumlated by each user to usersPoints Object
    rawProjects.map((project) => {
      // Assiging the value of total points to total points variable to be displayed on the leaderboard
      project.totalPoints = project.communicationPoints + project.projectPoints + project.karmaPoints
      const usersPoints = {}
      let i
      for (i = 0; i < rawProjects.length; i++) {
        if (rawProjects[i].username in usersPoints) {
          usersPoints[rawProjects[i].username] = {
            projectPoints: rawProjects[i].projectPoints + usersPoints[rawProjects[i].username].projectPoints,
            karmaPoints: rawProjects[i].karmaPoints + usersPoints[rawProjects[i].username].karmaPoints,
            communicationPoints: rawProjects[i].communicationPoints + usersPoints[rawProjects[i].username].communicationPoints,
            totalPoints: rawProjects[i].totalPoints + usersPoints[rawProjects[i].username].totalPoints
          }
        }
        else {
          usersPoints[rawProjects[i].username] = {
            projectPoints: rawProjects[i].projectPoints,
            karmaPoints: rawProjects[i].karmaPoints,
            communicationPoints: rawProjects[i].communicationPoints,
            totalPoints: rawProjects[i].totalPoints
          }
        }
      }
      this.state.usersPoints = usersPoints
    })

    // Looping through usersPoints Object to format the data into a format to be used by table sorting functions
    Object.entries(this.state.usersPoints).map((entry) => {
      entry[1].username = entry[0]
      this.state.usersPointsArray.push(entry[1])
    })
    const pointsArray = this.state.usersPointsArray
    return pointsArray
  }

  render () {
    return (
      <div className='LeaderboardComp'>
        <UsersPointsTable
          tablePoints={this.state.tablePoints}
        />
      </div>
    )
  }
}
