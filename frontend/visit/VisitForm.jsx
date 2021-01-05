import React from "react";
export default class VisitForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.editingVisit.id,
      patient: props.editingVisit.patient.id,
      date: props.editingVisit.date,
      time: props.editingVisit.time,
      problems: props.editingVisit.prescription.problems,
      prescription: props.editingVisit.prescription
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      id: newProps.editingVisit.id,
      patient: newProps.editingVisit.patient.id,
      date: newProps.editingVisit.date,
      time: newProps.editingVisit.time,
      problems: newProps.editingVisit.prescription.problems,
      prescription: newProps.editingVisit.prescription
    });
  }

  handleChange(e) {
    var newvalue = {};
    newvalue[e.target.name] = e.target.value;
    this.setState(newvalue);
  }

  onSave() {
    var access_token = localStorage.getItem("access_token");
    if (this.state.id === "") {
      if (this.state.patient == "") {
        alert("Please select a patient");
        return;
      }
      if (this.state.problems == "") {
        alert("Please enter problems");
        return;
      }
      console.log("ADD");
      console.log(this.state);
      fetch(
        `http://localhost:8080/visits?access_token=${access_token}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "post",
          body: JSON.stringify({
            patient: { id: this.state.patient },
            prescription: {
              problems: this.state.problems,
              diagnosis: {
                labTest: {
                  notes: this.state.problems
                }
              }
            }
          })
        }
      ).then(() => {
        fetch(
          `http://localhost:8080/visits?access_token=${access_token}`
        )
          .then(res => res.json())
          .then(visits => {
            this.props.dispatch({ type: "FETCH_VISITS", payload: visits });
            alert("Added new visit!");
          });
      });
    } else {
      var pres = {
        id: this.state.prescription.id,
        problems: this.state.problems,
        diagnosis: {
          id: this.state.prescription.diagnosis.id,
          disease: this.state.prescription.diagnosis.disease,
          labTest: {
            id: this.state.prescription.diagnosis.labTest.id  
          }
        }
      };
      pres.problems = this.state.problems
      this.setState({prescription})
      console.log("UPD");
      console.log(this.state);
      
      fetch(
        `http://localhost:8080/visits?access_token=${access_token}`,
        {
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
          },
          method: "put",
          body: JSON.stringify({
            id: this.state.id,
            patient: { id: this.state.patient },
            date: this.state.date,
            time: this.state.time,
            prescription: pres
          })
        }
      ).then(() => {
        this.props.dispatch({
          type: "EDIT_VISIT",
          payload: {
            id: "",
            patient: { id: "" },
            date: "",
            time: "",
            prescription: { problems: "" }
          }
        });
        fetch(
          `http://localhost:8080/visits?access_token=${access_token}`
        )
          .then(res => res.json())
          .then(visits =>
            this.props.dispatch({ type: "FETCH_VISITS", payload: visits })
          );
        alert("Visit updated!");
      });
    }
  }

  onClear() {
    this.setState({
      id: "",
      patient: "",
      date: "",
      time: "",
      problems: ""
    });
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
      <div><br/><br/>
        <div className="panel panel-success" style={panel}>
          <div className="panel-heading" style={heading}>
            <h4>Visit Form</h4>
          </div>
          <hr />
          <div className="panel-body">
            <div className="form-group">
              <label>Patient</label>
              {!this.props.patients.length ? (
                <div>Please wait. Fetching patients...</div>
              ) : (
                <select
                  className="form-control"
                  name="patient"
                  value={this.state.patient}
                  onChange={this.handleChange.bind(this)}
                >
                  <option value="select">Select</option>
                  {this.props.patients.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.id} {s.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className="form-group">
              <label>Date</label>
              <input
                type="text"
                name="date"
                value={this.state.date}
                className="form-control"
                onChange={this.handleChange.bind(this)}
              />
            </div>
            <div className="form-group">
              <label>Time</label>
              <input
                type="text"
                name="time"
                value={this.state.time}
                className="form-control"
                onChange={this.handleChange.bind(this)}
              />
            </div>
            <div className="form-group">
              <label>Problems</label>
              <input
                type="text"
                name="problems"
                value={this.state.problems}
                className="form-control"
                onChange={this.handleChange.bind(this)}
              />
            </div>
            <button className="btn btn-purple" onClick={this.onSave.bind(this)}>
              Save
            </button>
            <button
              className="btn btn-purple"
              onClick={this.onClear.bind(this)}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    );
  }
}
