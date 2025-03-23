import React from 'react';
import './OrderTable.css';
import SingleOrderDetails from '../pharmacy-singleorder-details/SingleOrderDetails';

function OrderTable({ orders }) {  
    return (
      <div>
        <div className="table-res">
          <table className="tableOfOrders">
            <thead className="tableHeading">
              <tr className='headerRow'>
                <th>#</th>
                <th>Order ID</th>
                <th>Patient name</th>
                <th>Patient Age</th>
                <th>Gender</th>
                <th>Patient Email</th>
                <th>Patient Contact</th>
                <th>Payment Method</th>
                <th>Delivery address</th>
                <th>Uploaded Date</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="11">No orders found</td>
                </tr>
              ) : (
                orders.map((order, index) => (
                  <SingleOrderDetails key={order._id} order={order} index={index} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  

export default OrderTable;