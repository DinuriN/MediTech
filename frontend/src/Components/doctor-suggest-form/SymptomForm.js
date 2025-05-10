import React, { useState } from 'react';
import { Form, Input, Button, Select, InputNumber } from 'antd';
import 'antd/dist/reset.css';
import './SymptomForm.css'
import { Modal } from 'antd';

// SymptomForm Component
const SymptomForm = ({ onSubmit }) => {
  const [form] = Form.useForm();

  const symptomOptions = [
    "Abdominal Pain", "Back Pain", "Bleeding", "Blisters", "Bloating",
    "Blurred Vision", "Breathlessness", "Chest Pain", "Chills", "Cough",
    "Constipation", "Diarrhea", "Dizziness", "Dry Mouth", "Earache",
    "Excessive Sweating", "Fainting", "Fatigue", "Fever", "Hair Loss",
    "Headache", "Heartburn", "Hoarseness", "Indigestion", "Itching",
    "Joint Pain", "Loss of Appetite", "Loss of Taste or Smell", "Lumps",
    "Muscle Cramps", "Muscle Pain", "Nausea", "Neck Pain", "Night Sweats",
    "Nosebleed", "Palpitations", "Rash", "Shortness of Breath", "Skin Redness",
    "Sore Throat", "Sweating (excessive)", "Swelling", "Tingling", "Toothache",
    "Vomiting", "Weakness", "Menstrual Pain", "Vaginal Discharge"
  ];

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={(values) => {
        console.log('Form submitted:', values);
        if (typeof onSubmit === "function") {
          onSubmit(values);
        } else {
          console.error('onSubmit is not a function!');
        }
      }}
      onFinishFailed={errorInfo => { console.log('Validation Failed:', errorInfo); }}
    >
      <Form.Item
        name="symptoms"
        label="Symptoms"
        rules={[{ required: true, message: 'Please select at least one symptom' }]}
      >
        <Select
          mode="tags"
          placeholder="Select or type symptoms"
          options={symptomOptions.map(s => ({ label: s, value: s }))}
        />
      </Form.Item>

      <Form.Item
        name="severity"
        label="Severity"
        rules={[{ required: true, message: 'Please select severity level' }]}
      >
        <Select placeholder="Select severity level">
          <Select.Option value="mild">Mild</Select.Option>
          <Select.Option value="moderate">Moderate</Select.Option>
          <Select.Option value="severe">Severe</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="duration_days"
        label="Duration (days)"
        rules={[{ required: true, message: 'Please input duration' }]}
      >
        <InputNumber min={1} max={365} style={{ width: '100%' }} placeholder="e.g., 3" />
    </Form.Item>

      <Form.Item
        name="age"
        label="Age"
        rules={[
          { required: true, message: 'Please input your age', type: 'number', min: 0, max: 120 }
        ]}
      >
        <InputNumber min={0} max={120} style={{ width: '100%' }} placeholder="Enter your age" />
      </Form.Item>

      <Form.Item
        name="gender"
        label="Gender"
        rules={[{ required: true, message: 'Please select gender' }]}
      >
        <Select placeholder="Select gender">
          <Select.Option value="F">Female</Select.Option>
          <Select.Option value="M">Male</Select.Option>
        </Select>
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Find Suitable Doctors
      </Button>
    </Form>
  );
};

// DoctorRecommendation Component
const DoctorRecommendation = () => {
  const [specialtyResult, setSpecialtyResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    setError(null);
    setSpecialtyResult(null);
    setDoctors([]);

    try {
        const response = await fetch('http://localhost:5001/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              symptoms: values.symptoms,
              age: values.age,
              gender: values.gender,
              severity: values.severity, // Added
              duration_days: parseInt(values.duration) // Added + renamed
            })
      });

      if (!response.ok) throw new Error('Failed to get prediction');
    const result = await response.json();
    setSpecialtyResult(result);
    setIsModalVisible(true);

    // 2. Fetch doctors from Node backend
    if (result.predicted_specialty) {
        const docRes = await fetch('http://localhost:5000/doctors/search', {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ specialty: result.predicted_specialty })
          });
          
      if (!docRes.ok) throw new Error('Failed to fetch doctors');
      const docData = await docRes.json();
      setDoctors(docData.doctors || docData); // support both array and {doctors: []}
    }
  } catch (err) {
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="doctor-reco-container">
  <h2>Symptom-Based Doctor Finder</h2>
  <div className="doctor-reco-form-card">
    <SymptomForm onSubmit={handleSubmit} />
  </div>

  {isLoading && <div className="doctor-reco-loading-message">Finding suitable specialty...</div>}
  {error && <div className="doctor-reco-error-message">Error: {error}</div>}

  <Modal
    title="Doctor Recommendation"
    open={isModalVisible}
    onCancel={() => setIsModalVisible(false)}
    footer={null}
    width={800}
  >
    {specialtyResult?.predicted_specialty && (
      <div className="doctor-reco-specialty-result">
        <h3>Recommended Specialty:{" "}
          <span style={{ color: "#1890ff" }}>
            {specialtyResult.predicted_specialty}
          </span>
        </h3>
        <div>
          <strong>Confidence:</strong> {(specialtyResult.confidence * 100).toFixed(1)}%
        </div>
        <div style={{ marginTop: 8 }}>
          <strong>All Probabilities:</strong>
          <ul>
            {Object.entries(specialtyResult.probabilities || {}).map(([spec, prob]) => (
              <li key={spec}>
                {spec}: {(prob * 100).toFixed(1)}%
              </li>
            ))}
          </ul>
        </div>
      </div>
    )}

    {doctors.length > 0 ? (
      <div className="doctor-reco-doctor-results" style={{ marginTop: '1.5rem' }}>
        <h3>Available Doctors:</h3>
        <table border={1} style={{ width: '100%', marginTop: '1rem' }}>
          <thead>
            <tr>
              <th>Profile</th>
              <th>Name</th>
              <th>Specialization</th>
              <th>Experience</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doc, idx) => (
              <tr key={doc._id || idx}>
                <td>
                  {doc.doctorProfilePicture ? (
                    <img
                      className="doctor-reco-doctor-profile-pic"
                      src={`http://localhost:5000${doc.doctorProfilePicture}`}
                      alt={doc.doctorName}
                    />
                  ) : (
                    <img
                      className="doctor-reco-doctor-profile-pic"
                      src={`http://localhost:5000/uploads/doc-prof-profile-pictures/default-profile.jpg`}
                      alt={doc.doctorName}
                    />
                  )}
                </td>
                <td>{doc.doctorName}</td>
                <td>{doc.doctorSpecialization || doc.specialty}</td>
                <td>{doc.doctorExperience} years</td>
                <td>{doc.doctorPhoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <p style={{ marginTop: '1rem' }}>No doctors found for this specialty.</p>
    )}
  </Modal>
</div>

  );
};

export default DoctorRecommendation;
