import React from 'react';

const PrintBill = ({ billDetails }) => {
  const { items, paymentMode, customerName, contactNumber } = billDetails;

  return (
    <div>
      <h1>Bill Details</h1>
      <h2>Payment Mode: {paymentMode}</h2>
      {customerName && <h3>Customer Name: {customerName}</h3>}
      {contactNumber && <h3>Contact Number: {contactNumber}</h3>}
      <table border="1">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.price.toFixed(2)}</td>
              <td>{item.quantity}</td>
              <td>{(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="3"><strong>Total:</strong></td>
            <td>{items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PrintBill;
