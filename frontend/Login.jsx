import React from "react";
import {
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  ButtonToolbar
} from "react-bootstrap";
import "./App.css";
export default class Login extends React.Component {
  constructor() {
    super();
    this.state = { notif: false, username: "", password: "" };
  }

  login() {
    //use fetch to send username/password to API
    //if it is true
    var credential = "client-id:secret";
    var base64 = btoa(credential);
    console.log(base64);

    fetch(
      `http://localhost:8080/oauth/token?grant_type=password&username=${
        this.state.username
      }&password=${this.state.password}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Basic "+base64
        },
        method: "post"
      }
    )
      .then(res => res.json())
      .then(result => {
        if (result.access_token != null) {
          localStorage.setItem("access_token", result.access_token);
          this.props.dispatch({
            type: "AUTHENTICATED",
            payload: result.access_token
          });
          console.log("TOKEN: " + result.access_token);
        } else
          this.setState({
            notif: true,
            message: "Wrong username/password. Please retry"
          });
      })
      .catch(error => {
        this.setState({
          notif: true,
          message: "Remote server is not accessible"
        });
      });
  }

  handleChange(e) {
    var change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }

  render() {
    const loginform = {
      color: "#6874E8",
      "font-size": "18px",
      "font-weight": "bold",
      "padding-inline": "35px"
    };
    const line = {
      border: "2px solid #6874E8",
      padding: "80px"
    };
    var mess;
    if (this.state.notif) {
      mess = (
        <div class="alert alert-warning">
          <strong> {this.state.message}</strong>
        </div>
      );
    }
    return (
      <div>
        <div className="Login" style={line}>
          <form style={loginform}>
            <FormGroup controlId="username" bsSize="large">
              <ControlLabel>Username</ControlLabel>
              <FormControl
                autoFocus
                type="text"
                name="username"
                placeholder="Enter username"
                onChange={this.handleChange.bind(this)}
              />
            </FormGroup>

            <FormGroup controlId="password" bsSize="large">
              <ControlLabel>Password</ControlLabel>
              <FormControl
                onChange={this.handleChange.bind(this)}
                type="password"
                name="password"
                placeholder="Enter your password"
              />
            </FormGroup>
            <ButtonToolbar>
              <Button
                variant="outline-success"
                block
                onClick={this.login.bind(this)}
                className="btn btn-purple"
              >
                Login
              </Button>
            </ButtonToolbar>
          </form>
        </div>
        <div>{mess}</div>
      </div>
    );
  }
}
