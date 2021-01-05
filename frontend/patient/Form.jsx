import React from "react";
import "../App.css";

export default class Form extends React.Component {
  constructor() {
    super();
    this.state = { id: "", name: "", dateOfBirth: "", gender: "", address: "" };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      id: newProps.editedPatient.id,
      name: newProps.editedPatient.name,
      dateOfBirth: newProps.editedPatient.dateOfBirth,
      gender: newProps.editedPatient.gender,
      address: newProps.editedPatient.address
    });
  }
  handleChange(e) {
    var newvalue = {};
    newvalue[e.target.name] = e.target.value;
    this.setState(newvalue);
  }

  onClear(){
    this.setState({
      id: '',
      name: '',
      dateOfBirth: '',
      gender:'',
      address:''
    });
  }
  onSave() {
    var access_token = localStorage.getItem("access_token");
    var mess = "";
    if (this.state.id === "") {
      fetch(
        `http://localhost:8080/patients/?access_token=${access_token}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "post",
          body: JSON.stringify(this.state)
        }
      )
        .catch(err => {
          console.log(err);
        })
        .then(res => res.json())
        .then(patient => {
          mess = "New patient added: " + patient.id;
          console.log(patient);
          this.props.dispatch({ type: "ADD_PATIENT", payload: patient });
        });
      mess = "Added new Patient";
    } else {
      fetch(
        `http://localhost:8080/patients/?access_token=${access_token}`,
        {
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
          },
          method: "put",
          body: JSON.stringify({
            id: this.state.id,
            name: this.state.name,
            dateOfBirth: this.state.dateOfBirth,
            gender: this.state.gender,
            address: this.state.address
          })
        }
      ).then(() => {
        this.props.dispatch({
          type: "EDIT_PATIENT",
          payload: {
            id: "",
            name: "",
            dateOfBirth: "",
            gender: "",
            address: ""
          }
        });
        fetch(
          `http://localhost:8080/patients?access_token=${access_token}`
        )
          .catch(err => {
            console.log(err);
          })
          .then(res => res.json())
          .then(patients => {
            this.props.dispatch({ type: "FETCH_PATIENTS", payload: patients });
          });
      });
      mess = "Edited patient id: " + this.state.id;
    }
    alert(mess);
  }

  render() {
    const panel = {
      border: "1px #6874E8",
      "margin-top": "15px",
      padding: "5px"
    };
    const heading = {
      "text-align": "center",
      color: "#6874E8"
    };
    return (
      <div>
        <div className="panel panel-success" style={panel}>
          <div className="panel-heading" style={heading}>
            <h4>Patient Form</h4>
          </div>
          <hr />
          <div className="panel-body">
            <div className="form-group">
              <h6>Name</h6>
              <input
                type="text"
                name="name"
                value={this.state.name}
                className="form-control"
                onChange={this.handleChange.bind(this)}
              />
            </div>
            <div className="form-group">
              <h6>Date of Birth</h6>
              <input
                type="text"
                name="dateOfBirth"
                value={this.state.dateOfBirth}
                className="form-control"
                onChange={this.handleChange.bind(this)}
              />
            </div>
            <div className="form-group">
              <h6>Gender</h6>
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    onChange={this.handleChange.bind(this)}
                    value="MALE"
                    checked={this.state.gender === "MALE"}
                  />{" "}
                  <span>{"   "}</span>
                  Male
                </label>
              </div>
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    onChange={this.handleChange.bind(this)}
                    value="FEMALE"
                    checked={this.state.gender === "FEMALE"}
                  />
                  <span>{"   "}</span>
                  Female
                </label>
              </div>
            </div>
            <div className="form-group">
              <h6>Address</h6>
              <input
                type="text"
                name="address"
                value={this.state.address}
                className="form-control"
                onChange={this.handleChange.bind(this)}
              />
            </div>
            <hr />
            <button className="btn btn-purple" onClick={this.onSave.bind(this)}>
              Save
            </button>
            <button className="btn btn-purple" onClick={this.onClear.bind(this)}>
              Clear
            </button>
          </div>
        </div>
      </div>
    );
  }
}
