import React, { useState } from 'react';
import axios from 'axios';
import './DrugInteractionChecker.css'; // Optional: create this for styling

function DrugInteractionChecker() {
  const [drugList, setDrugList] = useState('');
  const [interactionResult, setInteractionResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCheckInteraction = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/onlinePharmacy/check-interaction', {
        drugs: drugList,
      });
      console.log("Backend Response: ", res);  // Log the response to check if it returns the expected result
      setInteractionResult(res.data.interactionDetails);
    } catch (err) {
      console.log("Error: ", err);  // Log error if request fails
      setInteractionResult("⚠️ Error checking interactions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="interaction-checker">
      <h2>💊 AI Drug Interaction Checker</h2>
      <textarea
        rows="4"
        placeholder="Enter drugs (e.g. Aspirin, Paracetamol)"
        value={drugList}
        onChange={(e) => setDrugList(e.target.value)}
      />
      <br />
      <button onClick={handleCheckInteraction} disabled={loading}>
        {loading ? 'Checking...' : 'Check Interactions'}
      </button>

      {interactionResult && (
        <div className="interaction-result">
          <h3>🧠 AI Explanation</h3>
          <p>{interactionResult}</p>
        </div>
      )}
    </div>
  );
}

export default DrugInteractionChecker;
