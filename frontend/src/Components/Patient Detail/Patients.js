import React, {useState} from 'react';
import React1, { useEffect } from 'react';
import Nav from "../Nav/Nav";
import axios from "axios";
import Patient from '../Patient/Patient';

const URL="http://Localhost:5000/patients";

const fetchHandler =async() =>{

  return await axios.get(URL).then((res => res.data));

}

function Patients() {

const [patients,setPatients] =useState();//Import usestate
useEffect(() => {
  fetchHandler().then((data) => setPatients(data.patients));
},[])


  return (
    <div>
        <Nav/>
      
      <div>
        {patients && patients.map((patient ,i) => (
          <div key ={i}>

            <Patient patient ={patient}/>

            </div>
        ))}
      </div>
    </div>
  )
}

export default Patients
 