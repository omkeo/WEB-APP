import React, { useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './Billingtab.css';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import PrintBill from './Print';


const BillingTabs = ({ tabs, activeIndex, onSelect, handleDeleteTab, handleDeleteItemFromCart, handleQuantityChange }) => {
  const [paymentMode, setPaymentMode] = useState('Not Selected');
  const [customerName, setCustomerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const handlePayment = (tab) => {
    const billDetails = {
      tabId: tab.id,
      items: tab.items,
      paymentMode,
      customerName: customerName || '',
      contactNumber: contactNumber || '',
    };

    const printWindow = window.open('', '_blank');
    const printContent = ReactDOMServer.renderToString(<PrintBill billDetails={billDetails} />);

    printWindow.document.write(`
      <html>
        <head>
          <title>Bill Details</title>
          <style>
            /* Add your styles here */
          </style>
        </head>
        <body>${printContent}</body>
        <script>
          window.print();
          window.onafterprint = function() { window.close(); };
        </script>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <Tabs selectedIndex={activeIndex} onSelect={onSelect}>
      <TabList className='billingTabsList'>
        {tabs.map((tab) => (
          <Tab key={tab.id}>
            Bill {tab.id}
            <button className='tabCloseButton' onClick={(e) => { e.stopPropagation(); handleDeleteTab(tab.id); }}>x</button>
          </Tab>
        ))}
      </TabList>
      {tabs.map((tab) => (
        <TabPanel key={tab.id}>
          <div className="billing-cart">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Remove</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {tab.items.length > 0 ? (
                  <>
                    {tab.items.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.price.toFixed(2)}</td>
                        <td>
                          <IconButton onClick={() => handleDeleteItemFromCart(tab.id, item._id)}>
                            <DeleteIcon className="deleteIcon" />
                          </IconButton>
                        </td>
                        <td>
                          <IconButton className='quantityIncrDecrIcons' onClick={() => handleQuantityChange(tab.id, item._id, -1)} disabled={item.quantity === 0}>
                            <RemoveIcon />
                          </IconButton>
                          {item.quantity}
                          <IconButton className='quantityIncrDecrIcons' onClick={() => handleQuantityChange(tab.id, item._id, 1)}>
                            <AddIcon />
                          </IconButton>
                        </td>
                        <td>{(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={3}>
                        <h6>Total: {tab.items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</h6>
                      </td>
                    </tr>
                    <tr>
                  <td colSpan={3}>
                  <p>Select Payment Mode:{paymentMode}</p>
                  </td>
                </tr>
                  </>
                ) : (
                  <tr>
                    <td colSpan={5}><h5>No items in cart</h5></td>
                  </tr>
                )}
                
              </tbody>
            </table>

            {tab.items.length > 0 ? (
              <>
                <div>
                  <div>
                    
                    <button onClick={() => setPaymentMode('Cash')} className='paymentModeBtn'>Cash</button>
                    <button onClick={() => setPaymentMode('UPI')} className='paymentModeBtn'>UPI</button>
                  </div>
                  <h6>Customer Details (Optional)</h6>
                  <input
                  className='customerDetailsInput'
                    type="text"
                    placeholder="Customer Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                  <input
                  className='customerDetailsInput'
                    type="text"
                    placeholder="Contact Number"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                  />
                </div>
                <button className='paymentAndPrintBtn' onClick={() => handlePayment(tab)}>Print Bill</button>
              </>
            ) : (
              <p></p>
            )
            }

          </div>
        </TabPanel>
      ))}
    </Tabs>
  );
};

export default BillingTabs;