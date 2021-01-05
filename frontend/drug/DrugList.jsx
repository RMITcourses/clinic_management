import React from "react";

export default class DrugList extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      startPage: 1,
      endPage: 1,
      startIndex: 1,
      endIndex: 1,
      pages: [],
      listing: []
    };
  }
  componentDidMount() {
    var access_token = localStorage.getItem("access_token");
    fetch(
      `http://localhost:8080/drugs/?access_token=${access_token}`
    )
      .catch(err => {
        console.log(err);
      })
      .then(res => res.json())
      .then(drugs => {
        this.props.dispatch({ type: "FETCH_DRUGS", payload: drugs });
      });
  }

  onDelete(id) {
    var access_token = localStorage.getItem("access_token");
    if (!confirm("Do you want to delete?")) return;
    var access_token = localStorage.getItem("access_token");
    fetch(
      `http://localhost:8080/drug/${id}?access_token=${access_token}`,
      {
        method: "delete"
      }
    ).then(() => this.props.dispatch({ type: "DELETE_DRUG", payload: id }));
  }

  onEdit(id, name) {
    this.props.dispatch({
      type: "EDIT_DRUG",
      payload: {
        id: id,
        name: name
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
          <div className="panel-body" id="table">
            {!this.props.drugs.length ? (
              <div>Please wait. Getting drugs list</div>
            ) : (
              <div>
                <div class="alert alert-warning" role="alert">
                  Currently drugs cannot be deleted because of key violation! This issue has been demonstrated in a lecture.
                </div>
                <table className="table table-hover">
                <thead style={headTable}>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th>Manage</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.drugs.map(s => (
                    <tr key={s.id}>
                      <td scope="row">{s.id}</td>
                      <td>{s.name}</td>
                      <td>
                        <div class="btn-group">
                          <a href="#table">
                            <button
                              type="button"
                              className="btn btn-outline-warning"
                              onClick={this.onEdit.bind(this, s.id, s.name)}
                            >
                              <i class="icon ion-md-create" />
                            </button>
                          </a>
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={this.onDelete.bind(this, s.id)}
                            disabled
                          >
                            <i class="icon ion-md-trash" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
