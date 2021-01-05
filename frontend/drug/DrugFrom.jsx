import React from "react";
import "../App.css";

export default class Form extends React.Component {
  constructor() {
    super();
    this.state = { id: "", name: "" };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      id: newProps.editedDrug.id,
      name: newProps.editedDrug.name
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
      fetch(
        `http://localhost:8080/drug/add?access_token=${access_token}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "post",
          body: JSON.stringify({name: this.state.name})
        }
      )
        .catch(err => {
          console.log(err);
        })
        .then(res => res.json())
        .then(drug => {
          console.log(drug);
          var newdrug ={id: drug,name: this.state.name}
          this.props.dispatch({ type: "ADD_DRUG", payload: newdrug });
        })
        .then(() => alert("Add new drug"));
    } else {
      fetch(
        `http://localhost:8080/drug/update?access_token=${access_token}`,
        {
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
          },
          method: "put",
          body: JSON.stringify({
            id: this.state.id,
            name: this.state.name
          })
        }
      ).then(() => {
        this.props.dispatch({
          type: "EDIT_DRUG",
          payload: {
            id: "",
            name: ""
          }
        });
        fetch(
          `http://localhost:8080/drugs?access_token=${access_token}`
        )
          .catch(err => {
            console.log(err);
          })
          .then(res => res.json())
          .then(drugs =>
            this.props.dispatch({ type: "FETCH_DRUGS", payload: drugs })
          )
          .then(() => alert("Updated drug"));
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
    return (
      <div>
        <div className="panel panel-success" style={panel}>
          <div className="panel-heading" style={heading}>
            <h4>Drug Form</h4>
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
            <button className="btn btn-purple" onClick={this.onSave.bind(this)}>
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}
