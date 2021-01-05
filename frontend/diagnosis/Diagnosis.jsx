import React from 'react';

export default class Diagnosis extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visit: { id: '' }, value: 'select' };
  }

  componentDidMount() {
    var access_token = localStorage.getItem('access_token');
    fetch(`http://localhost:8080/patients/?access_token=${access_token}`)
      .catch(err => {
        console.log(err);
      })
      .then(res => res.json())
      .then(patients => {
        this.props.dispatch({ type: 'FETCH_PATIENTS', payload: patients });
        console.log("==== PATIENT =====");
        console.log(patients);
      });
    fetch(`http://localhost:8080/visits/current?access_token=${access_token}`)
      .catch(err => {
        console.log(err);
      })
      .then(res => res.json())
      .then(visits => {
        this.props.dispatch({ type: 'FETCH_VISITS', payload: visits });
      });

    fetch(`http://localhost:8080/icds/?access_token=${access_token}`)
      .then(res => res.json())
      .then(icds => {
        this.props.dispatch({ type: 'FETCH_ICDS', payload: icds });
      });
    fetch(`http://localhost:8080/medicalServices/?access_token=${access_token}`)
      .then(res => res.json())
      .then(mss => {
        this.props.dispatch({ type: 'FETCH_MSS', payload: mss });
      });
    fetch(`http://localhost:8080/drugs/?access_token=${access_token}`)
      .then(res => res.json())
      .then(drugs => {
        this.props.dispatch({ type: 'FETCH_DRUGS', payload: drugs });
      });
  }
  onDiagnose(visit) {
    this.props.dispatch({
      type: 'DIAGNOSE',
      payload: { visit: visit }
    });
  }

  onOrderLabtest(visit) {
    this.props.dispatch({
      type: 'ORDER_LABTEST',
      payload: { visit: visit }
    });
  }

  onPrescribe(visit) {
    this.props.dispatch({
      type: 'PRESCRIBE',
      payload: { visit: visit }
    });
  }

  render() {
    const headTable ={
      'color':'#6874E8'
    }
    const button_icon={
      border:"none",
      background:"none"
    }
    const icon={
      height: "25px",
      weight:"25  px"
    }
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })
    return (
      <div>
        <div className="panel panel-success">
          <div className="panel-body">
            {!this.props.visits.length ? (
              <div>Please wait. Fetching visits...</div>
            ) : (
              <table className="table table-hover">
                <thead style={headTable}>
                  <tr>
                    <th scope="col">Visit ID</th>
                    <th scope="col">Patient</th>
                    <th scope="col">Time</th>
                    <th scope="col">Option</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.visits.map(s => {
                    return (
                      <tr key={s.id}>
                        <td>{s.id}</td>
                        <td>ID: {s.patient.id} <br/><strong>{s.patient.name}</strong></td>
                        <td>{s.date} <br/> {s.time} </td>
                        <td>
                        <button style={button_icon} value="prescribe" data-toggle="tooltip" data-placement="top" title="Prescription" onClick={this.onPrescribe.bind(this,s)}><img style={icon} src='../icon/pill.png'/></button>
                        <button style={button_icon} value="orderLabtest" data-toggle="tooltip" data-placement="top" title="Lab Test" onClick={this.onOrderLabtest.bind(this,s)}><img style={icon} src='../icon/labtest.png'/></button>
                        <button style={button_icon} value="diagnose" data-toggle="tooltip" data-placement="top" title="Diagnosis"  onClick={this.onDiagnose.bind(this,s)}><img style={icon} src='../icon/prescriptions.png'/></button>
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
    );
  }
}
