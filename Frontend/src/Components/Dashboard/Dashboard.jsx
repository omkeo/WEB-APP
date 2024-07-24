import React, { useState } from 'react'
import Navbar from './Navbar'
import Home from './Home/Home'
import './dashboard.css'
import AddCategory from './AddCategory';
import AddProduct from './Products/AddProduct';
import AllCategoryList from './AllCategoryList';
import MessageBox from '../MessageBox';
import AllProductList from './Products/AllProductList';

function Dashboard() {
  const [activeComponent, setActiveComponent] = useState('Component1');
  const [messageData, setMessageData] = useState({ message: '', severity: 'success', timestamp: Date.now() });

  const triggerMessage = (msg, sev) => {
    setMessageData({ message: msg, severity: sev, timestamp: Date.now() });
  }

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Component1':
        return <Home  triggerMessage={triggerMessage}/>;
      case 'Component2':
        return <AllCategoryList  triggerMessage={triggerMessage}/>;
      case 'Component3':
        return <AllProductList  triggerMessage={triggerMessage}/>;

      default:
        return <Home  triggerMessage={triggerMessage}/>;
    }
  };
  return (
    <div className='screen'>
      <MessageBox message={messageData.message} severity={messageData.severity} timestamp={messageData.timestamp} />
      <div className='dashboardNav'>
        <Navbar setActiveComponent={setActiveComponent} />
      </div>
      <div className='dashboardScreen'>
        {renderComponent()}

      </div>
    </div>
  )
}

export default Dashboard
