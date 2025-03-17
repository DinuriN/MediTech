import React, {useState} from 'react';
import React1, { useEffect } from 'react';
import axios from "axios";
import Payment from '../Payment/Payment';

const URL="http://Localhost:5000/payments";

const fetchHandler =async() =>{

  return await axios.get(URL).then((res => res.data));

}

function Payments() {

const [payments,setPayments] =useState();//Import usestate
useEffect(() => {
  fetchHandler().then((data) => setPayments(data.payments));
},[])


  return (
    <div>
        
      
      <div>
        {payments && payments.map((payment ,i) => (
          <div key ={i}>

            <Payment payment ={payment}/>

            </div>
        ))}
      </div>
    </div>
  )
}

export default Payments;
 