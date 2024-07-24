import React from 'react'
import './navbar.css'
import logo from '../../assets/logo.png'

function Navbar({setActiveComponent}) {
  return (
    <div>
      <div className="navBox">
        <div className="navBoxLeft">
            <div><img src={logo} alt="" className='logo' /></div>
            <div className="navBtn" onClick={()=>{setActiveComponent('Component1')}} >Home</div>
            <div className="navBtn" onClick={()=>{setActiveComponent('Component2')}}>Category</div>
            <div className="navBtn" onClick={()=>{setActiveComponent('Component3')}}>Products</div>
            <div className="navBtn" onClick={()=>{setActiveComponent('Component4')}}>About</div>
            
        </div>
      </div>
    </div>
  )
}

export default Navbar
