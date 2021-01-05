import React from "react";

export default class SearchVisits extends React.Component {
  constructor() {
    super();
    this.state = {
      patient: "",
      date: "",
      searchingPatient: false,
      searchingDate: false
    };
  }
  handleChange(e) {
    var newvalue = {};
    newvalue[e.target.name] = e.target.value;
    this.setState(newvalue);
  }

  onClear() {
    var access_token = localStorage.getItem("access_token");
    fetch(
      `http://localhost:8080/visits?access_token=${access_token}`
    )
      .then(res => res.json())
      .then(visits => {
        this.props.dispatch({ type: "FETCH_VISITS", payload: visits });
      });
    this.setState({
      patient: "",
      date: "",
      searchingPatient: false,
      searchingDate: false
    });
  }

  onSearch() {
    var access_token = localStorage.getItem("access_token");
    if (this.state.patient != "") {
      this.setState({ searchingPatient: true });

      fetch(
        `http://localhost:8080/visitsByPatient?patientId=${
          this.state.patient
        }&access_token=${access_token}`
      )
        .then(res => res.json())
        .then(visits => {
          this.props.dispatch({ type: "FETCH_VISITS", payload: visits });
        });
    } else if (this.state.date != "") {
      this.setState({ searchingDate: true });
      fetch(
        `http://localhost:8080/visitsByDay?date=${
          this.state.date
        }&access_token=${access_token}`
      )
        .then(res => res.json())
        .then(visits => {
          this.props.dispatch({ type: "FETCH_VISITS", payload: visits });
        });
    }
  }
  render() {
    let btnSearch = (
      <button className="btn btn-default" onClick={this.onSearch.bind(this)}>
        <i class="icon ion-md-search" />
      </button>
    );
    let btnClear = (
      <button className="btn btn-default" onClick={this.onClear.bind(this)}>
        <i class="icon ion-md-close" />
      </button>
    );
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
            <h4>Search tool</h4>
          </div>
          <div className="panel-body">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search by Patient ID"
                name="patient"
                value={this.state.patient}
                onChange={this.handleChange.bind(this)}
              />
              <div className="input-group-btn">
                {this.state.searchingPatient ? btnClear : btnSearch}
              </div>
            </div>
            <hr />
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search by Date"
                name="date"
                value={this.state.date}
                onChange={this.handleChange.bind(this)}
              />
              <div className="input-group-btn">
                {this.state.searchingDate ? btnClear : btnSearch}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
