import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function AddPatient() {
  const patientHistory = useNavigate();

  const [inputs, setInputs] = useState({
    patientId: "",
    patientName: "",
    patientEmail: "",
    patientTempPw: "",
    patientContactNo: "",
    patientAddress: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    await sendRequest();
    patientHistory("/patientDetails");
  };

  const sendRequest = async () => {
    return await axios
      .post("http://Localhost:5000/patients", {
        patientId: String(inputs.patientId),
        name: String(inputs.patientName),
        email: String(inputs.patientEmail),
        password: String(inputs.patientTempPw),
        contactNo: String(inputs.patientContactNo),
        address: String(inputs.patientAddress),
      })
      .then((res) => res.data);
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
              />
            </div>

            <div className="mb-3">
              <label htmlFor="patientName" className="form-label">
                Patient Name:
              </label>
              <input
                type="text"
                id="patientName"
                name="patientName"
                className="form-control"
                onChange={handleChange}
              value={inputs.patientName}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="patientEmail" className="form-label">
                Patient Email:
              </label>
              <input
                type="text"
                id="patientEmail"
                name="patientEmail"
                className="form-control"
                onChange={handleChange}
              value={inputs.patientEmail}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="patientTempPw" className="form-label">
                Temporary Password:
              </label>
              <input
                type="text"
                id="patientTempPw"
                name="patientTempPw"
                className="form-control"
                onChange={handleChange}
              value={inputs.patientTempPw}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="patientContactNo" className="form-label">
                Contact No:
              </label>
              <input
                type="text"
                id="patientContactNo"
                name="patientContactNo"
                className="form-control"
                onChange={handleChange}
              value={inputs.patientContactNo}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="patientAddress" className="form-label">
                Address:
              </label>
              <input
                type="text"
                id="patientAddress"
                name="patientAddress"
                className="form-control"
                onChange={handleChange}
              value={inputs.patientAddress}
                required
              />
            </div>

            <button type="submit" className="btn btn-success w-100">
              Submit
            </button>
          <br/><br/>
          <Link to={`/patientDetails`}>
            <button type="submit" className="btn btn-primary w-100">
              Go back
            </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddPatient;
