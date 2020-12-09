import React, { Component } from "react";
import axios from "axios";
import { Button, Card } from "react-bootstrap";

// Component to show the users the projects that they are currently enrolled in and allow them to submit their work for grading

export default class MyProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      username: null,
      isClicked: false,
      file: null,
      projectID: null,
      adminProjects: [],
      ip: window.location.hostname,
    };
  }

  componentDidMount() {
    // Getting current user's username.

    axios
      .get("http://" + this.state.ip + ":5000/users/getinfo", {
        withCredentials: true,
      })
      .then((response) => {
        this.setState({
          username: response.data.username,
          isAdmin: response.data.isAdmin,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    // Fetching all users' projects.
    setTimeout(
      () =>
        axios
          .get("http://" + this.state.ip + ":5000/projects/getinfo", {
            withCredentials: true,
          })
          .then((response) => {
            this.setState({ projects: response.data });
          })
          .catch(function (error) {
            console.log(error);
          }),
      2000
    );
  }

  // Creating a card component for each displayed project.
  createProjectComponent = (title, username, points_awarded, status, id) => {
    return (
      <div>
        <Card style={{ width: "100%" }}>
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {" "}
              {points_awarded} | {status}
            </Card.Subtitle>
            <Card.Text>{username}</Card.Text>
            {this.displaySubmitButton(id)}
          </Card.Body>
        </Card>
        <br></br>
      </div>
    );
  };

  // Displaying the submit button if the user is not an admin.
  displaySubmitButton = (id) => {
    if (this.state.isAdmin == false) {
      return (
        <Button
          onClick={(e) => {
            this.submitFiles(e);
          }}
          id={id}
        >
          Submit
        </Button>
      );
    }
  };

  // Viewing the submit files view.
  submitFiles = (e) => {
    e.preventDefault();
    this.setState({
      isClicked: !this.state.isClicked,
      projectID: e.currentTarget.id,
    });
  };

  // Saving the files' info.
  onFileUpload = (e) => {
    e.preventDefault();
    this.setState({
      file: e.target.files[0],
    });
  };

  // Sending a post request containing the uploaded file.
  onSubmit = (e) => {
    e.preventDefault();
    const uploadedFile = new FormData();
    uploadedFile.append("file", this.state.file);
    // Sending the uploaded file accross an http post request.
    axios.post(
      "http://" + this.state.ip + ":5000/projects/upload-file",
      uploadedFile,
      { withCredentials: true },
      {
        headers: {
          "Content-Type": "form-data",
        },
      }
    );
    const newAttachment = {
      attachment: this.state.file.name,
    };
    // Updating the DB with the name of the uploaded file.
    axios.post(
      "http://" +
        this.state.ip +
        ":5000/projects/submit-files/" +
        this.state.projectID,
      newAttachment
    );
    this.setState({
      isClicked: !this.state.isClicked,
    });
  };

  // Getting back to the default view (listing projects).
  onCancel = () => {
    this.setState({
      isClicked: !this.state.isClicked,
    });
  };

  render() {
    const { username } = this.state;
    const { isClicked } = this.state;
    if (isClicked == true) {
      return (
        <div>
          <h1>Upload file</h1>
          <form>
            <input
              type="file"
              name="file"
              onChange={this.onFileUpload.bind(this)}
            />
            <br></br>
            <input type="submit" onClick={this.onSubmit.bind(this)} />
            <button onClick={this.onCancel}>Cancel</button>
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <h1>My Projects</h1>
          {this.state.projects.reverse().map((project, index) => {
            if (project.username == username) {
              return (
                <div>
                  {this.createProjectComponent(
                    project.projectName,
                    project.username,
                    project.projectPoints,
                    project.status,
                    project._id
                  )}
                </div>
              );
            }
          })}
        </div>
      );
    }
  }
}
