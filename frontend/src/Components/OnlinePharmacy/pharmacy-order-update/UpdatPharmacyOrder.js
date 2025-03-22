import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "./UpdatePharmacyOrder.css";

function UpdatePharmacyOrder() {
    const [inputs, setInputs] = useState({
        patientName: "",
        patientAge: "",
        gender: "",
        patientEmail: "",
        patientContact: "",
        prescriptionFile: null,
        paymentMethod: "",
        deliveryAddress: "",
        uploadedDate: "",
        comments: "",
    });

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/onlinePharmacy/${id}`);
                setInputs(res.data.order);
            } catch (error) {
                console.error("Error fetching order data:", error);
            }
        };
        fetchHandler();
    }, [id]);

    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setInputs({ ...inputs, prescriptionFile: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await sendRequest();
        navigate("/order-details");
    };

    const sendRequest = async () => {
        const formData = new FormData();
        formData.append("patientName", inputs.patientName);
        formData.append("patientAge", inputs.patientAge);
        formData.append("gender", inputs.gender);
        formData.append("patientEmail", inputs.patientEmail);
        formData.append("patientContact", inputs.patientContact);
        formData.append("prescriptionFile", inputs.prescriptionFile);
        formData.append("paymentMethod", inputs.paymentMethod);
        formData.append("deliveryAddress", inputs.deliveryAddress);
        formData.append("uploadedDate", inputs.uploadedDate);
        formData.append("comments", inputs.comments);

        try {
            await axios.put(`http://localhost:5000/onlinePharmacy/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
        } catch (error) {
            console.error("Error updating order:", error);
        }
    };

    return (
        <div className="form-container">
            <div className="form-box">
                <h1 className="form-title">Update Pharmacy Order</h1>
                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <label>Patient Name</label>
                        <input type="text" name="patientName" value={inputs.patientName} onChange={handleChange} required maxLength={50} />
                    </div>

                    <div className="form-group">
                        <label>Patient Age</label>
                        <input type="number" name="patientAge" value={inputs.patientAge} onChange={handleChange} required min={0} max={120} />
                    </div>

                    <div className="form-group">
                        <label>Gender</label>
                        <select name="gender" value={inputs.gender} onChange={handleChange} required>
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="patientEmail" value={inputs.patientEmail} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Contact</label>
                        <input type="text" name="patientContact" value={inputs.patientContact} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Prescription File</label>
                        <input type="file" name="prescriptionFile" onChange={handleFileChange} />
                    </div>

                    <div className="form-group">
                        <label>Payment Method</label>
                        <select name="paymentMethod" value={inputs.paymentMethod} onChange={handleChange} required>
                            <option value="">Select</option>
                            <option value="cash_on_delivery">Cash on Delivery</option>
                            <option value="online_payment">Online Payment</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Delivery Address</label>
                        <textarea name="deliveryAddress" value={inputs.deliveryAddress} onChange={handleChange} required maxLength={200} />
                    </div>

                    <div className="form-group">
                        <label>Comments</label>
                        <textarea name="comments" value={inputs.comments} onChange={handleChange} maxLength={500} />
                    </div>

                    <button type="submit" className="submit-btn">Update Order</button>
                </form>
            </div>
        </div>
    );
}

export default UpdatePharmacyOrder;
