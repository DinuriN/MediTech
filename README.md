# MediTech Healthcare Centre Management System
Main Components
    1. Consultation and Scan Scheduling
    2. Online Pharmacy
    3. Patient Medical History Management
    4. Doctor Profile and Schedule Management
    5. Lab Inventory Tracking System

----------------------------------------------------------------
How to Conftribute
    **Do not push changes or merge branches into the main branch.
    **Always open a pull request after pushing your changes to the relevant branch.
    1. Create a new branch 
    2. Make changes and commit them (git commit -m 'Add feature').
    3. Push to your branch (git push origin branch-name).
    4. Open a Pull Request.

----------------------------------------------------------------
Variable Naming Conventions

*Do not use common names for variables and functions:
    Example: user, addUser()

*CamelCase for variables and function names:
    Example: patientRecord, calculateTotal, isEligibleForAppointment

*Use descriptive names that indicate the role of the variable or function:
    Example: patientList (for a list of patients), calculateTotalBill (for a function calculating the total bill), appointmentDate (for the date of an appointment).
    Avoid abbreviations unless they are widely accepted or well-understood (e.g., num, count).

*Constants should be in UPPER_SNAKE_CASE:
    Example: MAX_PATIENTS, API_URL

*Avoid generic names like data, temp, info. These don’t tell anyone what the variable holds.
    Example: Instead of data, use patientData, appointmentInfo, etc.

----------------------------------------------------------------
Function Naming Conventions

*Use action-oriented names for functions (usually verbs):
    Example: addPatient(), deleteRecord(), fetchAppointmentDetails()

*Functions that return a boolean should be named with is, can, or has 
    (e.g., isPatientEligible(), canScheduleAppointment()).

----------------------------------------------------------------
File and Folder Naming

*Use kebab-case for file and folder names:
    Example: patient-record.js, appointment-form.js, components/appointment-list/

*Keep file names descriptive of their contents:
    Example: patientList.js, appointmentDetails.js

----------------------------------------------------------------
