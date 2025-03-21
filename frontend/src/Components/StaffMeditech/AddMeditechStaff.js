import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
function AddMeditechStaff() {
  const staffHistory = useNavigate();


  const [inputs, setInputs] = useState({
      staffId: "",
      staffName: "",
      staffEmail: "",
      staffTempPw: "",
      staffContactNo: "",
      staffAddress: "",
      staffRole: "",
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
      staffHistory("/staffDetails");
    };

    const sendRequest = async () => {
        return await axios
          .post("http://Localhost:5000/meditechStaff", {
            staffId: String(inputs.staffId),
            name: String(inputs.staffName),
            email: String(inputs.staffEmail),
            password: String(inputs.staffTempPw),
            contactNo: String(inputs.staffContactNo),
            address: String(inputs.staffAddress),
            role: String(inputs.staffRole),
          })
          .then((res) => res.data);
      };



  return (
    <div>
      <div>
        <h1 className="text-center mb-4">Add Staff</h1>
        <div>
          <form onSubmit={handleSubmit} className="container mt-4">
            <div className="mb-3">
              <label htmlFor="staffId" className="form-label">
                Staff ID:
              </label>
              <input
                type="text"
                id="staffId"
                name="staffId"
                className="form-control"
                onChange={handleChange}
              value={inputs.staffId}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="staffName" className="form-label">
                Staff Name:
              </label>
              <input
                type="text"
                id="staffName"
                name="staffName"
                className="form-control"
                onChange={handleChange}
              value={inputs.staffName}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="staffEmail" className="form-label">
                Staff Email:
              </label>
              <input
                type="text"
                id="staffEmail"
                name="staffEmail"
                className="form-control"
                onChange={handleChange}
              value={inputs.staffEmail}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="staffTempPw" className="form-label">
                Staff Password:
              </label>
              <input
                type="text"
                id="staffTempPw"
                name="staffTempPw"
                className="form-control"
                onChange={handleChange}
              value={inputs.staffTempPw}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="staffContactNo" className="form-label">
                Contact No:
              </label>
              <input
                type="text"
                id="staffContactNo"
                name="staffContactNo"
                className="form-control"
                onChange={handleChange}
              value={inputs.staffContactNo}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="staffAddress" className="form-label">
                Address:
              </label>
              <input
                type="text"
                id="staffAddress"
                name="staffAddress"
                className="form-control"
                onChange={handleChange}
              value={inputs.staffAddress}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="staffRole" className="form-label">
                Role:
              </label>
              <input
                type="text"
                id="staffRole"
                name="staffRole"
                className="form-control"
                onChange={handleChange}
              value={inputs.staffRole}
                required
              />
            </div>

            <button type="submit" className="btn btn-success w-100">
              Submit
            </button>
          </form>
        </div>
      </div>
      
    </div>
  );
}

export default AddMeditechStaff;
