import React from "react";
import { connect } from "react-redux";
import List from "./patient/PatientList.jsx";
import Diagnosis from "./diagnosis/Diagnosis.jsx";
import Search from "./patient/Search.jsx";
import SearchVisits from "./SearchVisits.jsx";
import Form from "./patient/Form.jsx";
import About from "./About.jsx";
import { browserHistory } from "react-router";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import { Jumbotron } from "react-bootstrap";
import Login from "./Login.jsx";
import DiagnoseForm from "./diagnosis/DiagnoseForm.jsx";
import Home from "./Home.jsx";
import LabtestForm from "./diagnosis/LabtestForm.jsx";
import VisitForm from "./visit/VisitForm.jsx";
import PrescribeForm from "./diagnosis/PrescribeForm.jsx";
import DrugList from "./drug/DrugList.jsx";
import DrugForm from "./drug/DrugFrom.jsx";
import SearchDrug from "./drug/SearchDrug.jsx";
import Test from "./visit/Visit.jsx";

class App extends React.Component {
  constructor() {
    super();
    this.state = { title: "Clinic Management System" };
  }

  changeTitle(value) {
    this.setState({ title: value });
  }
  logout() {
    this.props.dispatch({ type: "LOGOUT" });
  }

  render() {
    return (
      <div style={body}>
        <Jumbotron>
          <h1 style={header}>
            <img src="./icon/favicon.png" />
            {this.state.title}
          </h1>
        </Jumbotron>

        <Router>
          {this.props.authenticate.loggedin == true ? (
            <div>
              <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
                <img src="./icon/favicon.png" style={icon}/>
                <a class="navbar-brand" style={header}>
                  Clinic System
                </a>
                <button
                  class="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span class="navbar-toggler-icon" />
                </button>

                <div
                  class="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                      <a
                        class="nav-link"
                        onClick={this.changeTitle.bind(this, "About us")}
                      >
                        <Link to={"/About"}>About</Link>
                      </a>
                    </li>
                    <li class="nav-item active">
                      <a
                        class="nav-link"
                        onClick={this.changeTitle.bind(
                          this,
                          "Current Visits Diagnose"
                        )}
                      >
                        <Link to={"/Diagnosis"}>Diagnosis</Link>
                      </a>
                    </li>
                    <li class="nav-item dropdown">
                      <a
                        class="nav-link dropdown-toggle"
                        id="navbarDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Management
                      </a>
                      <div
                        class="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                      >
                        <a
                          class="dropdown-item"
                          onClick={this.changeTitle.bind(
                            this,
                            "Patient Management"
                          )}
                        >
                          <Link to={"/Patients"}>Patients</Link>
                        </a>
                        <a
                          class="dropdown-item"
                          onClick={this.changeTitle.bind(
                            this,
                            "Drug Management"
                          )}
                        >
                          <Link to={"/Drugs"}>Drugs</Link>
                        </a>

                        <div class="dropdown-divider" />
                        <a
                          class="dropdown-item"
                          onClick={this.changeTitle.bind(
                            this,
                            "Visit Management"
                          )}
                        >
                          <Link to={"/Visits"}>Visits</Link>
                        </a>
                      </div>
                    </li>
                  </ul>
                  <form class="form-inline my-2 my-lg-0">
                    <button
                      class="btn btn-outline-danger my-2 my-sm-0"
                      onClick={this.logout.bind(this)}
                    >
                      Logout
                    </button>
                  </form>
                </div>
              </nav>
              {/* `===================== */}

              <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/Home" component={Home} />
                <Route path="/About" component={About} />
                <Route
                  path="/Visits"
                  render={() => (
                    <div>
                      <div className="row">
                        <div className="col-md-4">
                          <VisitForm
                            patients={this.props.patients}
                            dispatch={this.props.dispatch}
                            editingVisit={this.props.editingVisit}
                          />
                        </div>
                        <div className="col-md-8">
                          <Test
                            access_token={this.props.authenticate.access_token}
                            visits={this.props.visits}
                            dispatch={this.props.dispatch}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                />
                <Route
                  path="/Patients"
                  render={() => (
                    <div className="row">
                      <div className="col-md-3">
                        <Search
                          dispatch={this.props.dispatch}
                          patients={this.props.patients}
                        />
                        <Form
                          dispatch={this.props.dispatch}
                          editedPatient={this.props.editedPatient}
                        />
                      </div>
                      <div className="col-md-9" style={line}>
                        <List
                          access_token={this.props.authenticate.access_token}
                          patients={this.props.patients}
                          dispatch={this.props.dispatch}
                        />
                      </div>
                    </div>
                  )}
                />
                <Route
                  path="/Drugs"
                  render={() => (
                    <div className="row">
                      <div className="col-md-4">
                        <SearchDrug
                          dispatch={this.props.dispatch}
                          drugs={this.props.drugs}
                        />
                        <DrugForm
                          dispatch={this.props.dispatch}
                          editedDrug={this.props.editedDrug}
                        />
                      </div>
                      <div className="col-md-6" style={line}>
                        <DrugList
                          access_token={this.props.authenticate.access_token}
                          drugs={this.props.drugs}
                          dispatch={this.props.dispatch}
                        />
                      </div>
                    </div>
                  )}
                />
                <Route
                  path="/Diagnosis"
                  render={() => (
                    <div>
                      <div className="row">
                        <div className="col-md-4">
                          <SearchVisits dispatch={this.props.dispatch} />
                          <div>
                            {this.props.showingForm == "diagnoseForm" && (
                              <DiagnoseForm
                                dispatch={this.props.dispatch}
                                icds={this.props.icds}
                                diagnosingPatient={this.props.diagnosingPatient}
                              />
                            )}
                            {this.props.showingForm == "labtestForm" && (
                              <LabtestForm
                                dispatch={this.props.dispatch}
                                medicalServices={this.props.medicalServices}
                                orderingLabtest={this.props.orderingLabtest}
                              />
                            )}
                            {this.props.showingForm == "prescribeForm" && (
                              <PrescribeForm
                                dispatch={this.props.dispatch}
                                drugs={this.props.drugs}
                                prescribing={this.props.prescribing}
                              />
                            )}
                          </div>
                        </div>
                        <div className="col-md-8" style={line}>
                          <Diagnosis
                            access_token={this.props.authenticate.access_token}
                            visits={this.props.visits}
                            dispatch={this.props.dispatch}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                />
              </Switch>
            </div>
          ) : (
            <div>
              <Login dispatch={this.props.dispatch} />
            </div>
          )}
        </Router>
      </div>
    );
  }
}

function mapStateToProps(centralState) {
  return {
    patients: centralState.patients,
    editedPatient: centralState.editedPatient,
    authenticate: centralState.authenticate,
    visits: centralState.visits,
    icds: centralState.icds,
    medicalServices: centralState.medicalServices,
    drugs: centralState.drugs,
    diagnosingPatient: centralState.diagnosingPatient,
    orderingLabtest: centralState.orderingLabtest,
    prescribing: centralState.prescribing,
    editingVisit: centralState.editingVisit,
    showingForm: centralState.showingForm,
    editedDrug: centralState.editedDrug,
    prescriptions: centralState.prescriptions
  };
}

const body = {
  paddingTop: "65px"
};
const line = {
  "border-left": "4px solid #6874E8"
};
const icon = {
  height: "3%",
  width: "3%",
  // "margin-left":"0px",
  "margin-right": "10px"
};
const header = { "text-align": "center", color: "#6874E8" };
export default connect(mapStateToProps)(App);
