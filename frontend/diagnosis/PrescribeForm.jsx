import React from "react";

export default class PrescribeForm extends React.Component {
  constructor(props) {
    super();
    this.state = {
      visit: props.prescribing.visit,
      drug: { id: "" },
      quantity: "",
      dose: "",
      howToUse: ""
    };
  }
  componentWillReceiveProps(newProps) {
    this.setState({ visit: newProps.prescribing.visit });
  }

  validate() {
    if (
      this.state.drug.id == "" ||
      this.state.quantity == "" ||
      this.state.dose == "" ||
      this.state.howToUse == ""
    )
      return false;
    return true;
  }

  handleChange(e) {
    var newvalue = Object.assign({}, this.state);
    newvalue[e.target.name] = e.target.value;
    this.setState(newvalue);
  }

  handleDrug(e) {
    var drugId = e.target.value;
    var drug = { drug: { id: drugId } };
    this.setState(drug);
  }

  onPost() {
    if (this.validate.bind(this)() == false) {
      alert("Please fill in all fields in Prescribe Form");
      return;
    }
    const p = this.state.visit.prescription;
    p.details.push({
      drug: this.state.drug,
      quantity: this.state.quantity,
      dose: this.state.dose,
      howToUse: this.state.howToUse
    });
    var detail = [{
      drug: this.state.drug,
      quantity: this.state.quantity,
      dose: this.state.dose,
      howToUse: this.state.howToUse
    }]
    var access_token = localStorage.getItem("access_token");
    fetch(
      `http://localhost:8080/prescription?access_token=${access_token}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "put",
        body: JSON.stringify({
          id: p.id,
          problems: p.problems,
          diagnosis: p.diagnosis,
          details: detail
        })
      }
    )
      .then(res => res.json())
      .then(d => {
        alert("Added prescription!");
        console.log(d);
      }).then(()=>{
        this.setState({
        drug: { id: "" },
        quantity: "",
        dose: "",
        howToUse: ""})
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
            <h4>Prescribe Form</h4>VISIT{" "}
            <strong> #{this.state.visit.id}</strong>
          </div>
          <hr />
          <div className="panel-body">
            <div className="form-group">
              <label htmlFor="drug">Drug</label>
              {!this.props.drugs.length ? (
                <div>Please wait. Fetching drugs...</div>
              ) : (
                <select
                  className="form-control"
                  name="drug"
                  onChange={this.handleDrug.bind(this)}
                  id="drug"
                >
                  <option>Choose drug</option>
                  {this.props.drugs.map(d => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="">Quantity</label>
              <input
                className="form-control"
                type="text"
                name="quantity"
                value={this.state.quantity}
                onChange={this.handleChange.bind(this)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Dose</label>
              <input
                className="form-control"
                type="text"
                name="dose"
                value={this.state.dose}
                onChange={this.handleChange.bind(this)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">How to Use</label>
              <input
                className="form-control"
                type="text"
                name="howToUse"
                value={this.state.howToUse}
                onChange={this.handleChange.bind(this)}
              />
            </div>
            <button className="btn btn-purple" onClick={this.onPost.bind(this)}>
              Post
            </button>
          </div>
        </div>
      </div>
    );
  }
}
