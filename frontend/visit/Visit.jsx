import React from "react";
import { SIGABRT } from "constants";

export default class Diagnosis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visit: {},
      modalbody: "",
      prescription: {},
      details: {},
      disease: {},
      patient: {},
      pres_details:[], services:[]
    };
  }

  componentDidMount() {
    var access_token = localStorage.getItem("access_token");
    fetch(`http://localhost:8080/visits/?access_token=${access_token}`)
      .catch(err => {
        console.log(err);
      })
      .then(res => res.json())
      .then(visits => {
        this.props.dispatch({ type: "FETCH_VISITS", payload: visits });
        console.log("VISIT: ");
        console.log(visits);
      });
    fetch(`http://localhost:8080/patients/?access_token=${access_token}`)
      .catch(err => {
        console.log(err);
      })
      .then(res => res.json())
      .then(patients => {
        this.props.dispatch({ type: "FETCH_PATIENTS", payload: patients });
        console.log("==== PATIENT =====");
        console.log(patients);
      });
  }
  checkingOut(visit) {
    var access_token = localStorage.getItem("access_token");
    if (!visit.checkedOut) {
      if (window.confirm("Patient checking out?")) {
        fetch(
          `http://localhost:8080/visits/checkout/${
            visit.id
          }?access_token=${access_token}`
        )
          .catch(err => {
            console.log(err);
          })
          .then(() => {
            fetch(`http://localhost:8080/visits?access_token=${access_token}`)
              .then(res => res.json())
              .then(visits =>
                this.props.dispatch({ type: "FETCH_VISITS", payload: visits })
              );
          });
      }
    } else {
      if (window.confirm("Patient check in?")) {
        alert("Sorry, this visit already checked out!");
      }
    }
  }
  viewPrescription(s) {
    var md =[];
    var pres =[];
    if (s.prescription.details!==null) {
      pres = s.prescription.details.filter((drug,index, self)=>
      index === self.findIndex((t) => (t.drug.id === drug.drug.id)))
    
    }
    if (s.prescription.diagnosis.labTest!==null) {
      md = s.prescription.diagnosis.labTest.labTestDetails.filter((s,index, self)=>
      index === self.findIndex((t) => ( t.services.id === s.services.id )))
    }
    this.setState({
      visit: s,
      patient: s.patient,
      prescription: s.prescription,
      pres_details: pres,
      services: md
    });
  }
  onEdit(visit) {
    this.props.dispatch({
      type: "EDIT_VISIT",
      payload: visit
    });
  }
  onDelete(id) {
    if (window.confirm("Do you want to delete?")) {
      var access_token = localStorage.getItem("access_token");
      fetch(`http://localhost:8080/visits/${id}?access_token=${access_token}`, {
        method: "delete"
      }).then(() =>
        this.props.dispatch({
          type: "DELETE_VISIT",
          payload: id
        })
      );
    }
  }
  onAdd() {
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
  }
  viewNullPrescrption() {
    alert("Please wait for doctor to diagnose and prescribe");
  }
  render() {
    const headTable = {
      color: "#6874E8"
    };
    const status = {
      "padding-right": "25px",
      "margin-left": "5px",
      "padding-top": "1px"
    };
    $(function() {
      $('[data-toggle="popover"]').popover();
    });
    $(".popover-dismiss").popover({
      trigger: "focus"
    });
    const view_icon = {
      "font-size": "28px",
      "text-align": "center",
      border: "none",
      background: "none",
      color: "#6874E8"
    };
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })
    return (
      <div>
        <div class="alert alert-info" role="alert">
          Click on the green bar to check out a patient. Click on the eye icon to view the details of the patient's visit
        </div>
        <div>
          <br />
          <div className="panel panel-success">
            <div className="panel-body">
              {!this.props.visits.length ? (
                <div>Please Add New Visit!</div>
              ) : (
                <table className="table table-hover">
                  <thead style={headTable}>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Time</th>
                      <th scope="col">Patient</th>
                      <th scope="col">Status</th>
                      <th scope="col">Diagnosis</th>
                      <th>Manage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.visits.map(s => {
                      return (
                        <tr key={s.id}>
                          <td>{s.id}</td>
                          <td>
                            {s.date} <br /> {s.time}
                          </td>
                          <td>
                            <strong>ID: {s.patient.id} </strong>
                            <br /> {s.patient.name}
                          </td>
                          <td>
                            {!s.checkedOut ? (
                              // <a
                              //   tabindex="0"
                              //   style={status}
                              //   class="btn btn-lg btn-success"
                              //   role="button"
                              //   data-toggle="popover"
                              //   data-html="true"
                              //   data-trigger="focus"
                              //   data-content="<strong>Patient NOT checked out</strong><br/>Double click to check out"
                              //   onDoubleClick={this.checkingOut.bind(this, s)}
                              // />
                              <button type="button"  class="btn btn-lg btn-success" style={status} data-toggle="tooltip" data-placement="top" title="Click to check out"  onClick={this.checkingOut.bind(this, s)}>
                              </button>
                            ) : (
                              <button
                                style={status}
                                class="btn btn-lg btn-secondary"
                                data-toggle="tooltip" data-placement="top"
                              title="Patient checked out"
                                onClick={this.checkingOut.bind(this, s)}
                              ></button>
                            )}
                          </td>
                          <td>
                            {/* Modal Button */}
                            {s.prescription == null ? (
                              <button
                              data-toggle="tooltip" data-placement="top" title="View Details"
                                style={view_icon}
                                onClick={this.viewNullPrescrption.bind(this)}
                              >
                                <i class="icon ion-md-eye" />
                              </button>
                            ) : (
                              <button
                                style={view_icon} 
                                data-toggle="modal"
                                data-target="#prescription"
                                onClick={this.viewPrescription.bind(this, s)}
                              >
                                <i class="icon ion-md-eye" />
                              </button>
                            )}
                          </td>
                          <td>
                            <div class="btn-group">
                              <button
                                type="button"
                                className="btn btn-outline-warning"
                                onClick={this.onEdit.bind(this, s)}
                              >
                                <i class="icon ion-md-create" />
                              </button>
                              <button
                                type="button"
                                className="btn btn-outline-danger"
                                onClick={this.onDelete.bind(this, s.id)}
                              >
                                <i class="icon ion-md-trash" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
        {/* MODAL PRESCRIPTION HERE */}
        <div
          class="modal fade"
          id="prescription"
          tabindex="-1"
          role="dialog"
          aria-labelledby="prescription"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="prescription">
                  Treatment Information VISIT #{this.state.visit.id}
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div className="row">
                  <div className="col-md-2">
                    <strong>Date: </strong>
                    <br />
                    <strong>Time: </strong>
                    <br />
                    <strong>Patient: </strong>
                  </div>
                  <div className="col-md-10">
                    {" "}
                    {this.state.visit.date} <br /> {this.state.visit.time}{" "}
                    <br />
                    {this.state.patient.id} - {this.state.patient.name}
                  </div>
                </div>
                <hr />
                {/* dia */}
                <div>
                  {this.state.prescription.diagnosis == null ? (
                    <div>
                      <div className="row">
                        <div className="col-md-3">
                          {" "}
                          <strong>Labtest:</strong>{" "}
                        </div>
                        <div className="col-md-9">No Labtest</div>
                      </div>
                      <div className="row">
                        <div className="col-md-3">
                          {" "}
                          <strong>Disease:</strong>{" "}
                        </div>
                        <div className="col-md-9">No Disease</div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {/* // labtest */}
                      <div>
                        {this.state.prescription.diagnosis.labTest == null ? (
                          <div className="row">
                            <div className="col-md-3">
                              {" "}
                              <strong>Labtest:</strong>{" "}
                            </div>
                            <div className="col-md-9">No Labtest</div>
                          </div>
                        ) : (
                          <div className="row">
                            <div className="col-md-3">
                              {" "}
                              <strong>Labtest:</strong>{" "}
                            </div>
                            <div className="col-md-9">
                              {this.state.services.map(
                                md => (
                                  <li>{md.services.name}</li>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      <br />
                      {/* // disease */}
                      <div>
                        {this.state.prescription.diagnosis.disease == null ? (
                          <div className="row">
                            <div className="col-md-3">
                              {" "}
                              <strong>Disease:</strong>{" "}
                            </div>
                            <div className="col-md-9">No Disease</div>
                          </div>
                        ) : (
                          <div className="row">
                            <div className="col-md-3">
                              {" "}
                              <strong>Disease:</strong>{" "}
                            </div>
                            <div className="col-md-9">
                              <li>
                                {
                                  this.state.prescription.diagnosis.disease
                                    .diseaseCode
                                }
                              </li>
                              <li>
                                {
                                  this.state.prescription.diagnosis.disease
                                    .diseaseName
                                }
                              </li>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                {/* Pre */}
                <div>
                  {this.state.prescription.details == null ? (
                    <div>Waiting doctor for prescribe...</div>
                  ) : (
                    <div>
                      {!this.state.prescription.details.length ? (
                        <div className="row">
                          <div className="col-md-3">
                            {" "}
                            <strong>Prescription:</strong>{" "}
                          </div>
                          <div className="col-md-9">
                            Waiting doctor for prescribe
                          </div>
                        </div>
                      ) : (
                        <div>
                          <strong>Prescription: </strong>
                          <div>
                            <table class="table table-borderless">
                              <thead>
                                <tr>
                                  <th scope="col">Drug</th>
                                  <th scope="col">Dose</th>
                                  <th scope="col">Quantity</th>
                                  <th scope="col">Description</th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.state.pres_details.map(p => (
                                  <tr>
                                    <td>{p.drug.name}</td>
                                    <td>{p.dose}</td>
                                    <td>{p.quantity}</td>
                                    <td>{p.howToUse}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {/* end */}
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
