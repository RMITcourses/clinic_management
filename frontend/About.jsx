import React from "react";

export default class About extends React.Component {
  render() {
    const header = { "text-align": "center", color: "#6874E8" };
    const container = { color: "#330080", "line-height": "30px" };
    const request = {
      color: "#6874E8",
      "line-height": "30px",
      border: "2px solid #6874E8",
      "padding-left": "4%",
      "padding-top": "3%",
      "padding-bottom": "3%",
      "padding-right": "3%"
    };
    const inpart = { "margin-left": "3%" };

    var access_token = "${access_token}";
    var id = "${id}";
    var add_visit_body = `
    {
      "patient": {
          "id": 11,
          "name": "6546465",
          "dateOfBirth": "2000-01-01",
          "gender": "MALE",
          "address": "42342343"
      },
      "date": "2019-11-11",
      "time": "11:11:11",
      "checkedOut": false
    }`;
    var update_visit_body = `
    {
      "id":"3"
      "patient": {
          "id": 3,
          "name": "6546465",
          "dateOfBirth": "2000-01-01",
          "gender": "MALE",
          "address": "42342343"
      },
      "date": "2019-11-11",
      "time": "11:11:11",
      "checkedOut": false
    }`;
    var add_patient_body = `
    {
      "name": "Suzy Jasque",
      "dateOfBirth": "2001-11-11",
      "gender": "FEMALE",
      "address": "21/43 Pham Van Dong District 6"
  }`;
    var update_patient_body = `
    {
      "id": 8,
      "name": "Suzy Jasque",
      "dateOfBirth": "1990-12-21",
      "gender": "FEMALE",
      "address": "21/43 Pham Van Dong District 6"
  }`;
  var add_drug_body = `
  {
    "name": "Suzy Jasque"
}`;
  var update_drug_body = `
  {
    "id": 8,
    "name": "Panacetamol"
}`;
    return (
      <div class="container" style={container}>
        <div class="page-header" style={header}>
          {/* ================= HEADER ===========*/}
          <h4>Software Architecture: Design and Implementation 2019A</h4>
          <p>
            <h6>
              <strong>Lecturer</strong>
            </h6>
            Nguyen Ngoc Thanh
          </p>
          <p>
            <h6>
              <strong>Team member</strong>
            </h6>
            Pham Ngoc Minh Hang - s3672206 <br />
            Tran Xuan Bach - s3640449
          </p>
          <hr />
        </div>
        <div className="body">
          {/* ================= ACCESS TOKEN ===========*/}
          <div id="part1">
            <h3>1. Access Token</h3>
            <article>
              To get access token, using basic HTTP Authorization <br />
              <strong>Username:</strong> client-secret <br />
              <strong> Password:</strong> 1 <br />
              So basic Authorization base64 after applied btoa() will be:
              <strong>Y2xpZW50LWlkOnNlY3JldA==</strong>
              <br />
              The request to get access token is: <br />
              <p style={request}>
                <strong>Method</strong> - Get <br />
                <strong>Header: </strong> <br />
                Authorization: Y2xpZW50LWlkOnNlY3JldA== <br />
                <strong>Params: </strong> <br />
                grant_type: password <br />
                username:doctor <br />
                password: 1 <br />
                <strong>API:</strong>{" "}
                <u>
                  {" "}
                  http://localhost:8080/oauth/token?grant_type=password&username=doctor&password=1{" "}
                </u>
                <br />
              </p>
              <br />
              The access token now is saved in local storage as access_token
            </article>
          </div>{" "}
          <br />
          {/* ================= VISIT ===========*/}
          <div id="part2">
            <h3>2. Visit</h3>
            <article>
              <p style={inpart}>
                <h5>a. Get Visits</h5>
                To fetch the list of visit, the request is: <br />
              </p>
              <p style={request}>
                <strong>Method</strong> - Get <br />
                <strong>Params: </strong> <br />
                access_token: {access_token} <br />
                <strong>API:</strong>{" "}
                <u>
                  {" "}
                  http://localhost:8080/visits?access_token=
                  {access_token}{" "}
                </u>
                <br />
              </p>
              <p style={inpart}>To get a specific visit:</p>
              <p style={request}>
                <strong>Method</strong> - Get <br />
                <strong>Params: </strong> <br />
                access_token: {access_token} <br />
                <strong>API:</strong>{" "}
                <u>
                  {" "}
                  http://localhost:8080/visits/{id}
                  ?access_token={access_token}{" "}
                </u>
                <br />
              </p>
              <br />
              {/* ADD NEW */}
              <p style={inpart}>
                <h5>b. Add a new visit</h5>
                To add new visit:
              </p>
              <p style={request}>
                <strong>Method</strong> - POST <br />
                <strong>Headers: </strong> <br />
                Accept: application/json <br />
                Content-type: application/json <br />
                <strong>Params: </strong> <br />
                access_token: {access_token} <br />
                <strong>API:</strong>
                <u>
                  {" "}
                  http://localhost:8080/visits/?access_token=
                  {access_token}
                </u>{" "}
                <br />
                <strong>Body:</strong>raw - application/json <br />
                {add_visit_body}
                <br />
              </p>
              <p style={inpart}>
                Notes: The date, time and checkout will be auto correct so you
                can add new with only define patient
              </p>
              <br />
              {/* UPDATE */}
              <p style={inpart}>
                <h5>c. Update a visit</h5>
                To update a specific visit:
              </p>
              <p style={request}>
                <strong>Method</strong> - PUT <br />
                <strong>Headers: </strong> <br />
                Accept: application/json <br />
                Content-type: application/json <br />
                <strong>Params: </strong> <br />
                access_token: {access_token} <br />
                <strong>API:</strong>
                <u>
                  {" "}
                  http://localhost:8080/visits/?access_token=
                  {access_token}
                </u>{" "}
                <br />
                <strong>Body:</strong>raw - application/json <br />
                {update_visit_body}
                <br />
              </p>
              <p style={inpart}>
                Notes: Need to define exsiting visit ID to update it
              </p>
              <br />
              {/* DELETE  */}
              <p style={inpart}>
                <h5>d. Delete a visit</h5>
                To delete a specific visit:
              </p>
              <p style={request}>
                <strong>Method</strong> - DELETE <br />
                <strong>Params: </strong> <br />
                access_token: {access_token} <br />
                <strong>API:</strong>
                <u>
                  {" "}
                  http://localhost:8080/visits/{id}
                  ?access_token={access_token}{" "}
                </u>
                <br />
              </p>
            </article>
          </div>
          <br />
          {/* ================= PATIENT ===========*/}
          <div id="part3">
            <h3>2. Patient</h3>
            <article>
              <p style={inpart}>
                <h5>a. Get Patients</h5>
                To fetch the list of patients, the request is: <br />
              </p>
              <p style={request}>
                <strong>Method</strong> - Get <br />
                <strong>Params: </strong> <br />
                access_token: {access_token} <br />
                <strong>API:</strong>{" "}
                <u>
                  {" "}
                  http://localhost:8080/patients?access_token=
                  {access_token}{" "}
                </u>
                <br />
              </p>
              <p style={inpart}>To get a specific visit:</p>
              <p style={request}>
                <strong>Method</strong> - Get <br />
                <strong>Params: </strong> <br />
                access_token: {access_token} <br />
                <strong>API:</strong>
                <u>
                  {" "}
                  http://localhost:8080/patients/{id}
                  ?access_token={access_token}
                </u>{" "}
                <br />
              </p>
              <br />
              {/* ADD NEW */}
              <p style={inpart}>
                <h5>b. Add a new patient</h5>
                To add new visit:
              </p>
              <p style={request}>
                <strong>Method</strong> - POST <br />
                <strong>Headers: </strong> <br />
                Accept: application/json <br />
                Content-type: application/json <br />
                <strong>Params: </strong> <br />
                access_token: {access_token} <br />
                <strong>API:</strong>
                <u>
                  {" "}
                  http://localhost:8080/patients/?access_token=
                  {access_token}{" "}
                </u>{" "}
                <br />
                <strong>Body:</strong>raw - application/json <br />
                {add_patient_body}
                <br />
              </p>
              <br />
              {/* UPDATE */}
              <p style={inpart}>
                <h5>c. Update a visit</h5>
                To update a specific visit:
              </p>
              <p style={request}>
                <strong>Method</strong> - PUT <br />
                <strong>Headers: </strong> <br />
                Accept: application/json <br />
                Content-type: application/json <br />
                <strong>Params: </strong> <br />
                access_token: {access_token} <br />
                <strong>API:</strong>{" "}
                <u>
                  {" "}
                  http://localhost:8080/patients/?access_token=
                  {access_token}{" "}
                </u>
                <br />
                <strong>Body:</strong>raw - application/json <br />
                {update_patient_body}
                <br />
              </p>
              <p style={inpart}>
                Notes: Need to define exsiting patient ID to update it
              </p>
              <br />
              {/* DELETE  */}
              <p style={inpart}>
                <h5>d. Delete a patient</h5>
                To delete a specific patient:
              </p>
              <p style={request}>
                <strong>Method</strong> - DELETE <br />
                <strong>Params: </strong> <br />
                access_token: {access_token} <br />
                <strong>API:</strong>
                <u>
                  {" "}
                  http://localhost:8080/patients/{id}
                  ?access_token={access_token}
                </u>{" "}
                <br />
              </p>
              <p style={inpart}>
                Notes: If patient is already exist in some visit, this patient{" "}
                <u> CANNOT</u> be deleted.
              </p>
            </article>
          </div>
          <br />
          {/* ================= DRUG ===========*/}
                    <div id="part4">
            <h3>3. Drug</h3>
            <article>
              <p style={inpart}>
                <h5>a. Get drugs</h5>
                To fetch the list of drugs, the request is: <br />
              </p>
              <p style={request}>
                <strong>Method</strong> - Get <br />
                <strong>Params: </strong> <br />
                access_token: {access_token} <br />
                <strong>API:</strong>{" "}
                <u>
                  {" "}
                  http://localhost:8080/drugs?access_token=
                  {access_token}{" "}
                </u>
                <br />
              </p>
              <p style={inpart}>To get a specific visit:</p>
              <p style={request}>
                <strong>Method</strong> - Get <br />
                <strong>Params: </strong> <br />
                access_token: {access_token} <br />
                <strong>API:</strong>
                <u>
                  {" "}
                  http://localhost:8080/drugs/{id}
                  ?access_token={access_token}
                </u>{" "}
                <br />
              </p>
              <br />
              {/* ADD NEW */}
              <p style={inpart}>
                <h5>b. Add a new drug</h5>
                To add new visit:
              </p>
              <p style={request}>
                <strong>Method</strong> - POST <br />
                <strong>Headers: </strong> <br />
                Accept: application/json <br />
                Content-type: application/json <br />
                <strong>Params: </strong> <br />
                access_token: {access_token} <br />
                <strong>API:</strong>
                <u>
                  {" "}
                  http://localhost:8080/drugs/?access_token=
                  {access_token}{" "}
                </u>{" "}
                <br />
                <strong>Body:</strong>raw - application/json <br />
                {add_drug_body}
                <br />
              </p>
              <br />
              {/* UPDATE */}
              <p style={inpart}>
                <h5>c. Update a visit</h5>
                To update a specific visit:
              </p>
              <p style={request}>
                <strong>Method</strong> - PUT <br />
                <strong>Headers: </strong> <br />
                Accept: application/json <br />
                Content-type: application/json <br />
                <strong>Params: </strong> <br />
                access_token: {access_token} <br />
                <strong>API:</strong>{" "}
                <u>
                  {" "}
                  http://localhost:8080/drugs/?access_token=
                  {access_token}{" "}
                </u>
                <br />
                <strong>Body:</strong>raw - application/json <br />
                {update_drug_body}
                <br />
              </p>
              <p style={inpart}>
                Notes: Need to define exsiting drug ID to update it
              </p>
              <br />
              {/* DELETE  */}
              <p style={inpart}>
                <h5>d. Delete a drug</h5>
                To delete a specific drug:
              </p>
              <p style={request}>
                <strong>Method</strong> - DELETE <br />
                <strong>Params: </strong> <br />
                access_token: {access_token} <br />
                <strong>API:</strong>
                <u>
                  {" "}
                  http://localhost:8080/drugs/{id}
                  ?access_token={access_token}
                </u>{" "}
                <br />
              </p>
              <p style={inpart}>
                Notes: If drug is already exist in some prescription, this drug{" "}
                <u> CANNOT</u> be deleted.
              </p>
            </article>
          </div>
          <br />
        </div>
      </div>
    );
  }
}
