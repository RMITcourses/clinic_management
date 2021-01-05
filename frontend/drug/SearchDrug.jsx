import React from "react";
import "../App.css";

export default class SearchDrug extends React.Component {
  constructor() {
    super();
    this.state = {
      name: ""
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
      `http://localhost:8080/drugs?access_token=${access_token}`
    )
      .catch(err => {
        console.log(err);
      })
      .then(res => res.json())
      .then(drugs => {
        this.props.dispatch({ type: "FETCH_DRUGS", payload: drugs });
      });
    this.setState({
      name: "",
      searchingName: false
    });
  }

  onSearch() {
    var access_token = localStorage.getItem("access_token");
    fetch(
      `http://localhost:8080/drugs/search?name=${
        this.state.name
      }&access_token=${access_token}`
    )
      .catch(err => {
        console.log(err);
      })
      .then(res => res.json())
      .then(drugs => {
        this.props.dispatch({ type: "FETCH_DRUGS", payload: drugs });
      });
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
            <h4>Search Drugs</h4>
          </div>
          <div className="panel-body">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search by Name"
                name="name"
                value={this.state.name}
                onChange={this.handleChange.bind(this)}
              />
              <div className="btn-purple">
                {this.state.searchingName ? btnClear : btnSearch}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
