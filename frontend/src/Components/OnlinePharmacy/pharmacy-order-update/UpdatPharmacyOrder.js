import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import "./UpdatePharmacyOrder.css";

function UpdatePharmacyOrder() {
    const [inputs, setInputs] = useState({});
    const [prescriptionImg, setPrescriptionImg] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();
    //     orderId: "",
    //     patientName: "",
    //     patientAge: "",
    //     gender: "",
    //     patientEmail: "",
    //     patientContact: "",
    //     prescriptionFile: "",
    //     paymentMethod: "",
    //     deliveryAddress: "",
    //     uploadedDate: "",
    //     comments: "",
    // });

  
    
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                console.log("Fetching order with ID:", id);
                const res = await axios.get(`http://localhost:5000/onlinePharmacy/${id}`);
                const orderDta = res.data.order;
                
    
                // Check if API response structure is correct
                if (res.data) {
                    if (res.data.order) {
                        setInputs(res.data.order); // If response is { order: { ... } }
                    } else {
                        setInputs(res.data); // If response is { ... } directly
                    }
                } else {
                    throw new Error("Order data not found");
                }
            } catch (err) {
                setError("Failed to fetch order details. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [id]);

    const handleFileChange = (e) => {
        setPrescriptionImg(e.target.files[0]);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let updatedOrder = { ...inputs };

            // If a new prescription image is selected, upload it first
            if (prescriptionImg) {
                const formData = new FormData();
                formData.append("prescriptionImg", prescriptionImg);
                
                const uploadRes = await axios.post("http://localhost:5000/onlinePharmacy/uploadPrescriptionFile", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                if (uploadRes.status === 200) {
                    updatedOrder.prescriptionFile = uploadRes.data.filePath;
                } else {
                    throw new Error("Image upload failed");
                }
            }

            // Send updated order data
            await axios.put(`http://localhost:5000/onlinePharmacy/${id}`, updatedOrder);
            navigate("/order-details");
        } catch (err) {
            setError("Failed to update order details. Please try again.");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="update-body">
            <div className="order-form-header">
                <hr />
                <h1>Update Order</h1>
                <hr />
            </div>
            <div className="form-container">
                <Link to="/order-details">
                    <button className="btn-back">Back</button>
                </Link>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Order ID</label>
                        <input type="text" name="orderId" value={inputs.orderId || ''} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Patient Name</label>
                        <input type="text" name="patientName" value={inputs.patientName || ''} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Patient Age</label>
                        <input type="number" name="patientAge" value={inputs.patientAge || ''} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Gender</label>
                        <select name="gender" value={inputs.gender || ''} onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="patientEmail" value={inputs.patientEmail || ''} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Phone Number</label>
                        <input type="text" name="patientContact" value={inputs.patientContact || ''} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Prescription File</label>
                        {inputs.prescriptionFile && (
                            <div>
                                <img 
                                    src={`http://localhost:5000/uploads/${inputs.prescriptionFile}`} 
                                    alt="Current image" 
                                    width="100"
/>

                            </div>
                        )}
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                    </div>

                    <div className="form-group">
                        <label>Payment Method</label>
                        <select name="paymentMethod" value={inputs.paymentMethod} onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="Online">Online Payment</option>
                            <option value="Delivery">Cash on delivery</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Delivery Address</label>
                        <textarea name="deliveryAddress" value={inputs.deliveryAddress} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Uploaded Date</label>
                        <input type="date" name="uploadedDate" value={inputs.uploadedDate} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Comments</label>
                        <textarea name="comments" value={inputs.comments} onChange={handleChange} />
                    </div>

                    <button type="submit" className="btn-submit">Update Order</button>
                </form>
            </div>
        </div>
    );
}

export default UpdatePharmacyOrder;
