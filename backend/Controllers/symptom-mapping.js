// backend/Controllers/symptom-mapping.js
const Doctor = require("../Models/doctor-model");
const mongoose = require("mongoose");

// Helper to get current day name (e.g. "Monday")
const getDayName = () => {
  const date = new Date();
  return date.toLocaleDateString('en-US', { weekday: 'long' });
};

// Enhanced mapping with age and gender considerations
const symptomToSpecialization = {
  "Abdominal Pain": ["Gastroenterology", "General Practice"],
  "Back Pain": ["Orthopedics", "Neurology", "General Practice"],
  "Bleeding": ["General Practice", "Hematology"],
  "Blisters": ["Dermatology", "General Practice"],
  "Bloating": ["Gastroenterology", "General Practice"],
  "Blurred Vision": ["Ophthalmology", "Neurology"],
  "Breathlessness": ["Pulmonology", "Cardiology", "General Practice"],
  "Chest Pain": ["Cardiology", "General Practice"],
  "Chills": ["General Practice", "Infectious Disease"],
  "Cough": ["Pulmonology", "General Practice", "ENT"],
  "Constipation": ["Gastroenterology", "General Practice"],
  "Diarrhea": ["Gastroenterology", "General Practice"],
  "Dizziness": ["Neurology", "ENT", "General Practice"],
  "Dry Mouth": ["ENT", "General Practice"],
  "Earache": ["ENT", "General Practice"],
  "Excessive Sweating": ["Endocrinology", "General Practice"],
  "Fainting": ["Cardiology", "Neurology", "General Practice"],
  "Fatigue": ["General Practice", "Endocrinology"],
  "Fever": ["General Practice", "Infectious Disease"],
  "Hair Loss": ["Dermatology", "Endocrinology"],
  "Headache": ["Neurology", "General Practice"],
  "Heartburn": ["Gastroenterology", "General Practice"],
  "Hoarseness": ["ENT", "General Practice"],
  "Indigestion": ["Gastroenterology", "General Practice"],
  "Itching": ["Dermatology", "General Practice"],
  "Joint Pain": ["Orthopedics", "Rheumatology", "General Practice"],
  "Loss of Appetite": ["Gastroenterology", "General Practice"],
  "Loss of Taste or Smell": ["ENT", "Neurology", "General Practice"],
  "Lumps": ["General Practice", "Oncology"],
  "Muscle Cramps": ["Neurology", "General Practice"],
  "Muscle Pain": ["Orthopedics", "Rheumatology", "General Practice"],
  "Nausea": ["Gastroenterology", "General Practice"],
  "Neck Pain": ["Orthopedics", "Neurology", "General Practice"],
  "Night Sweats": ["General Practice", "Infectious Disease"],
  "Nosebleed": ["ENT", "General Practice"],
  "Palpitations": ["Cardiology", "General Practice"],
  "Rash": ["Dermatology", "General Practice"],
  "Shortness of Breath": ["Pulmonology", "Cardiology", "General Practice"],
  "Skin Redness": ["Dermatology", "General Practice"],
  "Sore Throat": ["ENT", "General Practice"],
  "Sweating (excessive)": ["Endocrinology", "General Practice"],
  "Swelling": ["Cardiology", "General Practice"],
  "Tingling": ["Neurology", "General Practice"],
  "Toothache": ["Dentistry", "General Practice"],
  "Vomiting": ["Gastroenterology", "General Practice"],
  "Weakness": ["Neurology", "General Practice"]
};

// New: Age-specific specialization mapping
const ageBasedSpecialization = (symptoms, age) => {
  // Children should see pediatricians
  if (age < 18) {
    return ["Pediatrics"];
  }
  
  // Elderly with certain symptoms
  if (age > 65 && ["Joint Pain", "Memory Loss", "Frequent Falls"].some(s => symptoms.includes(s))) {
    return ["Geriatrics"];
  }
  
  // Standard mapping for adults
  return [...new Set(symptoms.flatMap(s => symptomToSpecialization[s] || []))];
};

// New: Gender-specific specialization mapping
const genderBasedSpecialization = (symptoms, gender) => {
  const femaleSpecificSymptoms = ["Menstrual Pain", "Vaginal Discharge", "Breast Pain"];
  const maleSpecificSymptoms = ["Testicular Pain", "Prostate Issues"];
  
  // Female-specific conditions
  if (gender === "F" && symptoms.some(s => femaleSpecificSymptoms.includes(s))) {
    return ["Obstetrics & Gynecology"];
  }
  
  // Male-specific conditions
  if (gender === "M" && symptoms.some(s => maleSpecificSymptoms.includes(s))) {
    return ["Urology"];
  }
  
  return null; // No gender-specific specialization needed
};

const matchDoctors = async (symptoms, severity, duration, age, gender) => {
  try {
    // Validate input
    if (!Array.isArray(symptoms) || symptoms.length === 0) {
      throw new Error("At least one symptom is required");
    }

    // Get specializations based on multiple factors
    let specializations = [];
    
    // First check gender-specific conditions
    const genderSpecializations = genderBasedSpecialization(symptoms, gender);
    if (genderSpecializations) {
      specializations = genderSpecializations;
    } else {
      // Then check age-specific conditions
      specializations = ageBasedSpecialization(symptoms, age);
    }

    // Build query
    const query = {
      doctorSpecialization: { $in: specializations },
      doctorAvailableDays: { $regex: getDayName(), $options: 'i' }
    };

    // Severity-based experience requirements
    if (severity === 'mild') {
      // No specific experience requirement
    } else if (severity === 'moderate') {
      query.doctorExperience = { $gte: 3 };
    } else if (severity === 'severe') {
      query.doctorExperience = { $gte: 5 };
    }

    // Duration-based matching (chronic vs acute)
    if (duration && parseInt(duration) > 30) {
      // For chronic conditions, prioritize specialists over GPs
      specializations = specializations.filter(s => s !== "General Practice");
      if (specializations.length === 0) {
        specializations = ["General Practice"]; // Fallback if no specialists
      }
      query.doctorSpecialization = { $in: specializations };
    }

    // Execute query
    const doctors = await Doctor.find(query)
      .sort({
        doctorExperience: -1,
        doctorConsultationFees: 1
      })
      .lean();

    return doctors;
    
  } catch (err) {
    throw new Error(`Doctor matching failed: ${err.message}`);
  }
};

module.exports = { 
  symptomToSpecialization, 
  matchDoctors,
  ageBasedSpecialization,
  genderBasedSpecialization
};
