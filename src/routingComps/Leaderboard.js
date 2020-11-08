import React, { Component } from 'react'
import axios from 'axios'

let globalVar = {}

class LeaderboardComp extends Component {
  // Constructing props with state including projects and users points
  constructor (props) {
    super(props)
    this.state = {
      projects: [],
      usersPoints: {},
      usersPointsArray: []
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

  tallyUsersPoints = () => {
    return (
      <div>
        {/* Mapping through the projects in the state to assign the usersPoints with users and their cumulitave points from all projects */}
        {this.state.projects.map((project) => {
          // Assiging the value of total points to total points variable to be displayed on the leaderboard
          project.totalPoints = project.communicationPoints + project.projectPoints + project.karmaPoints
          let usersPoints = {}
          let i
          // Looping through all the projects to add the points accumlated by each user to usersPoints Object 
          for (i = 0; i < this.state.projects.length; i++) {
            if (this.state.projects[i].username in usersPoints) {
              usersPoints[this.state.projects[i].username] = {
                'Project Points': this.state.projects[i].projectPoints + usersPoints[this.state.projects[i].username]['Project Points'],
                'Karma Points': this.state.projects[i].karmaPoints + usersPoints[this.state.projects[i].username]['Karma Points'],
                // 'Communication Points': this.state.projects[i].communicationPoints + usersPoints[this.state.projects[i].username]['Communication Points'],
                // 'Total Points': this.state.projects[i].totalPoints + usersPoints[this.state.projects[i].username]['Total Points'],
              }
            }
            else {
              usersPoints[this.state.projects[i].username] = {
                'Project Points': this.state.projects[i].projectPoints,
                'Karma Points': this.state.projects[i].karmaPoints,
                // 'Communication Points': this.state.projects[i].communicationPoints,
                // 'Total Points': this.state.projects[i].totalPoints,
              }
            }
          }
          this.state.usersPoints = usersPoints
        })}
      </div>
    )
  }


  displayLeaderboard = () => {
    return (
      <div>
        <h1>Leaderboard</h1>
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
              entry[1]['username'] = entry[0]
              let pointsArray = []
              this.state.usersPointsArray.push(entry[1])
              pointsArray = this.state.usersPointsArray.slice(0, this.state.usersPointsArray.length / 2)
              this.props = pointsArray
              globalVar.pointsArray = pointsArray
              return <tr>
                <td>{entry[1]['username']}</td>
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
       {this.tallyUsersPoints()}
       {this.displayLeaderboard()}  
     </div>
   )
  }
}

// export default LeaderboardComp


const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const ProductTable = (props) => {
  console.log('global var in products', globalVar)
  console.log('points array in product', globalVar.pointsArray)
  // const hi=[
  //   { name: 'adasda', karma: 4.9, totalPoints: 20 },
  //   { name: 'kkkkkk', karma: 1.9, totalPoints: 32 }
  // ]
  const { items, requestSort, sortConfig } = useSortableData(props.products);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  return (
    <table>
      <caption>Leaderboard</caption>
      <thead>
        <tr>
          <th>
            <button
              type="button"
              onClick={() => requestSort('name')}
              className={getClassNamesFor('name')}
            >
              Name
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('karma')}
              className={getClassNamesFor('karma')}
            >
              Karma Points
            </button>
          </th>
          <th>
            <button
              type="button"
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
            <td>{item.name}</td>
            <td>{item.karma}</td>
            <td>{item.totalPoints}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default function App() {
  return (
    <div className="App">
      <ProductTable
        products={[
          { name: 'alymaly', karma: 4.9, totalPoints: 20 },
          { name: 'kkkkkk', karma: 1.9, totalPoints: 32 }
        ]}
      />
      <LeaderboardComp/>
    </div>
  );
}
