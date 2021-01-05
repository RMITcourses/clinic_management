import React from "react";

export default class LabtestForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visit: props.orderingLabtest.visit,
      selectedMedicalServices: [],
      list: []
    };
  }
  componentWillMount() {
    var access_token = localStorage.getItem("access_token");
    fetch(
      `http://localhost:8080/medicalServices/?access_token=${access_token}`
    )
      .then(res => res.json())
      .then(mss => {
        mss.forEach(element => {
          element.mycheck = false;
        });
        this.setState({ list: mss });
      })
      .then(() => {
        console.log(this.state.list);
        console.log(this.state.visit.prescription.diagnosis.labTest);
      });
  }

  componentWillReceiveProps(newProps) {
    this.setState({ visit: newProps.orderingLabtest.visit });
  }

  handleChange(event, value) {
    value.mycheck = !value.mycheck;
    if (value.mycheck == true) {
      this.setState({
        selectedMedicalServices: [
          ...this.state.selectedMedicalServices,
          { services: value }
        ]
      });
    } else {
      var newList = this.state.selectedMedicalServices.filter(
        s => s.services.id != value.id
      );
      this.setState({
        selectedMedicalServices: newList
      });
    }
    console.log(this.state.selectedMedicalServices);
  }

  onPost() {
    // console.log(this.state.selectedMedicalServices)
    var select = [];
    var confirm = "You want to add labtests: ";
    this.state.list.forEach(md => {
      if (md.mycheck == true) {
        select.push({ services: md });
        confirm = confirm + "\n" + md.name;
      }
    });
    var access_token = localStorage.getItem("access_token");
    const d = this.state.visit.prescription.diagnosis;
    console.log(this.state.visit);
    console.log(d.labTest);
    if (window.confirm(`${confirm}`)) {
      fetch(
        `http://localhost:8080/labtests?access_token=${access_token}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "post",
          body: JSON.stringify({
            id: d.labTest.id,
            notes: d.labTest.notes,
            labTestDetails: select
          })
        }
      )
        .then(res => res.json())
        .then(d => {
          console.log(d);
          alert("Added Labtest!");
        });
    }
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
    var selecting = this.state.list.filter(s => s.mycheck == false);
    return (
      <div className="panel panel-success" style={panel}>
        <div className="panel-heading" style={heading}>
          <h4>Labtest Order</h4>VISIT{" "}
            <strong> #{this.state.visit.id}</strong>
        </div>
        <div className="panel-body">
          <div className="form-group">
            {!this.props.medicalServices.length ? (
              <div>Please wait. Fetching medical services...</div>
            ) : (
              <div>
                <div className="form-check">
                  {this.state.list.map((s, index) => (
                    <div key={index}>
                      <label className="form-check-label">
                        <input
                          name="selectedMedicalServices"
                          type="checkbox"
                          onChange={e => this.handleChange(e, s)}
                          className="form-check-input"
                        />
                        {s.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div>
            <h5>Selected</h5>
            {!this.state.selectedMedicalServices.length ? (
              <div>
                <br />
              </div>
            ) : (
              <div>
                {this.state.selectedMedicalServices.map(s => {
                  <ul>{s.id}</ul>;
                })}
              </div>
            )}
          </div>
          <button className="btn btn-purple" onClick={this.onPost.bind(this)}>
            Post
          </button>
          <hr />
        </div>
      </div>
    );
  }
}
