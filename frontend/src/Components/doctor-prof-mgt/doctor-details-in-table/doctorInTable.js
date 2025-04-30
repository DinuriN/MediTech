import React from 'react';
import './doctorInTable.css';
import SingleDoctorDetails from '../doc-prof-details-of-single-doctor/SingleDoctorDetails';

function DoctorInTable({ doctors }) {  // Accept 'doctors' as a prop
  return (
    <div>
      <div className="table-resUnique">
        <table className="tableOfDoctorsUnique">
          <thead className="tableHeadingUnique">
            <tr className='headerRowUnique'>
              <th>#</th>
              <th>Doctor ID</th>
              <th>Name</th>
              <th>Specialization</th>
              <th>Contact No.</th>
              <th>Available Days</th>
              <th>Available Time Start</th>
              <th>Available Time End</th>
              <th>Consultation Fees</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors.length === 0 ? (
              <tr>
                <td colSpan="10">No doctors found</td>
              </tr>
            ) : (
              doctors.map((doctor, index) => (
                <SingleDoctorDetails key={doctor._id} doctor={doctor} index={index} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DoctorInTable;
