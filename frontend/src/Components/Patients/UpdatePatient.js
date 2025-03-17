import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
function UpdatePatient() {
    const [inputs, setInputs] = useState({});
  const patientHistory = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:5000/patients/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.patients)); //patients = postman...
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:5000/patients/${id}`, {
        patientId: String(inputs.patientId),
        name: String(inputs.name),
        email: String(inputs.email),
        password: String(inputs.password),
        contactNo: String(inputs.contactNo),
        address: String(inputs.address),
      })
      .then((res) => res.data);
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => patientHistory("/patientDetails"));
  };




  return (
    <div>
      <div>
        <h1 className="text-center mb-4">Add Patient</h1>
        <div>
          <form onSubmit={handleSubmit} className="container mt-4">
            <div className="mb-3">
              <label htmlFor="patientId" className="form-label">
                Patient ID:
              </label>
              <input
                type="text"
                id="patientId"
                name="patientId"
                className="form-control"
                onChange={handleChange}
              value={inputs.patientId}
                required
                disabled
              />
            </div>

            <div className="mb-3">
              <label htmlFor="patientName" className="form-label">
                Patient Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                onChange={handleChange}
              value={inputs.name}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="patientEmail" className="form-label">
                Patient Email:
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className="form-control"
                onChange={handleChange}
              value={inputs.email}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="patientTempPw" className="form-label">
                Temporary Password:
              </label>
              <input
                type="text"
                id="password"
                name="password"
                className="form-control"
                onChange={handleChange}
              value={inputs.password}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="patientContactNo" className="form-label">
                Contact No:
              </label>
              <input
                type="text"
                id="contactNo"
                name="contactNo"
                className="form-control"
                onChange={handleChange}
              value={inputs.contactNo}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="patientAddress" className="form-label">
                Address:
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className="form-control"
                onChange={handleChange}
              value={inputs.address}
                required
              />
            </div>

            <button type="submit" className="btn btn-success w-100">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdatePatient;
