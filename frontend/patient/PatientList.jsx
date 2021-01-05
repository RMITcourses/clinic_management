import React from "react";
export default class List extends React.Component {
  constructor() {
    super();
  }
  loadPatient() {
    var access_token = localStorage.getItem("access_token");
    console.log("patient level, token: " + access_token);
    fetch(
      `http://localhost:8080/patients/?access_token=${access_token}`
    )
      .catch(err => {
        console.log(err);
      })
      .then(res => res.json())
      .then(patients => {
        this.props.dispatch({ type: "FETCH_PATIENTS", payload: patients });
      });
  }
  componentDidMount() {
    var access_token = localStorage.getItem("access_token");
    console.log("patient level, token: " + access_token);
    fetch(
      `http://localhost:8080/patients/?access_token=${access_token}`
    )
      .catch(err => {
        console.log(err);
      })
      .then(res => res.json())
      .then(patients => {
        this.props.dispatch({ type: "FETCH_PATIENTS", payload: patients });
      });
  }

  onDelete(id) {
    var access_token = localStorage.getItem("access_token");
    if (!confirm("Do you want to delete?")) return;
    var access_token = localStorage.getItem("access_token");
    fetch(
      `http://localhost:8080/patients/${id}?access_token=${access_token}`,
      {
        method: "delete"
      }
    ).then(() => this.props.dispatch({ type: "DELETE_PATIENT", payload: id }));
  }

  onEdit(id, name, dateOfBirth, gender, address) {
    this.props.dispatch({
      type: "EDIT_PATIENT",
      payload: {
        id: id,
        name: name,
        dateOfBirth: dateOfBirth,
        gender: gender,
        address: address
      }
    });
  }
  render() {
    const headTable = {
      color: "#6874E8"
    };
    return (
      <div>
        <div className="panel panel-success">
          <div className="panel-body">
            {!this.props.patients.length ? (
              <div>Please wait. Fetching patients...</div>
            ) : (
              <table className="table table-hover">
                <thead style={headTable}>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Date of Birth</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Address</th>
                    <th>Manage</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.patients.map(s => (
                    <tr key={s.id}>
                      <td scope="row">{s.id}</td>
                      <td>{s.name}</td>
                      <td>{s.dateOfBirth}</td>
                      <td>{s.gender}</td>
                      <td>{s.address}</td>
                      <td>
                        <div class="btn-group">
                          <button
                            type="button"
                            className="btn btn-outline-warning"
                            onClick={this.onEdit.bind(
                              this,
                              s.id,
                              s.name,
                              s.dateOfBirth,
                              s.gender,
                              s.address
                            )}
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
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    );
  }
}
