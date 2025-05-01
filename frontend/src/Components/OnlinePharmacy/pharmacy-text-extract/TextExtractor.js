import React, { useState } from "react";
import axios from "axios";
import "./TextExtractor.css";

function TextExtractor() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
  
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
        setText(""); // Reset extracted text
      }

      const handleUpload = async () => {
        if (!image) return;
    
        const formData = new FormData();
        formData.append("image", image);
    
        try {
            setLoading(true);
            const res = await axios.post("http://localhost:5000/onlinePharmacy/upload-image", formData);
            setText(res.data.text);
          } catch (err) {
            alert("Failed to extract text: " + err.message);
          } finally {
            setLoading(false);
          }
        };

        return (
            <div className="extractor-container">
              <h2>Upload Image to Extract Text</h2>
        
              <input type="file" accept="image/*" onChange={handleImageChange} />
        
              {preview && (
                <div className="preview-container">
                  <img src={preview} alt="Preview" className="image-preview" />
                </div>
              )}

<button className="upload-btn" onClick={handleUpload} disabled={loading}>
        {loading ? "Extracting..." : "Extract Text"}
      </button>

      {text && (
        <div className="result-box">
          <h3>Extracted Text:</h3>
          <pre>{text}</pre>
        </div>
      )}
    </div>
  );
}

export default TextExtractor;