import React from "react";

export default class DiagnoseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visit: props.diagnosingPatient.visit,
      disease: "",
      icd: {}
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({ visit: newProps.diagnosingPatient.visit });
  }


  handleChange(event) {
    console.log(this.state.visit);
    this.setState({ disease: event.target.value });
    var access_token = localStorage.getItem("access_token");
    fetch(
      `http://localhost:8080/icds/${
        event.target.value
      }?access_token=${access_token}`
    )
      .catch(err => {
        console.log(err);
      })
      .then(res => res.json())
      .then(icd => {
        this.setState({ icd: icd });
        console.log("FETCH ICD");
        console.log(icd);
      });
  }
  validate() {
    if (
      this.state.visit.id == "" ||
      this.state.disease.length == 0 ||
      this.state.visit.prescription.id == ""
    )
      return false;
    return true;
  }

  onDiagnose() {
    console.log(this.state.visit);
    if (this.validate.bind(this)() == false) {
      alert("Have a problem with this visit, please try again");
      return;
    }
    if (
      this.state.disease == undefined ||
      this.state.disease == {} ||
      this.state.disease == null
    ) {
      alert("Please select disease");
      return;
    }
    const d = this.state.visit.prescription.diagnosis;
    var access_token = localStorage.getItem("access_token");
    fetch(
      `http://localhost:8080/diagnoses?access_token=${access_token}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "post",
        body: JSON.stringify({
          id: d.id,
          disease: {
            id: this.state.disease
          },
          labTest: {
            id: d.labTest.id,
            labTestDetails: d.labTest.labTestDetails
          }
        })
      }
    )
      .then(res => res.json())
      .then(d => {
        console.log("===result=======");
        console.log(d);
        alert("Added Diagnose!");
      })
      .then(() => {
        this.setState({
          value:"select",disease: "",
          icd: {}
        })
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
      <div>
        <div className="panel panel-success" style={panel}>
          <div className="panel-heading" style={heading}>
            <h3>Diagnose Disease</h3>VISIT{" "}
            <strong> #{this.state.visit.id}</strong>
          </div>
          <br />
          <div className="panel-body">
            <div className="form-group">
              {!this.props.icds.length ? (
                <div>Please wait. Fetching icd list...</div>
              ) : (
                <select
                  value={this.state.disease}
                  // name='disease'
                  className="form-control"
                  onChange={this.handleChange.bind(this)}
                >
                  <option value="select">Select </option>
                  {this.props.icds.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.diseaseCode + "--" + s.diseaseName}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <button
              className="btn btn-purple"
              onClick={this.onDiagnose.bind(this)}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    );
  }
}
