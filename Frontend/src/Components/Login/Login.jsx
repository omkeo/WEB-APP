import React, { useState } from 'react'
import axios from 'axios'
import '../Login/index.css'


function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/login', {
        email: email,
        password: password
      })
      if (response.status == 200) {
        setError(' ')
        console.log(response.data)
        window.location.href = '/dashboard';

      }
    }catch(err){
      setError(err.response.data.message || 'Invalid email or password');
    }

  }
  return (
    <div className='mainDiv'>

      <div className='loginForm'>
        <form action="" onSubmit={handleLogin}>
          <label htmlFor="email">Email:</label><br />
          <input type="text" placeholder='Enter Email' value={email} onChange={(e) => (setEmail(e.target.value))} /><br /><br />
          <label htmlFor="password">Password:</label><br />
          <input type="password" placeholder='Enter Password' value={password} onChange={(e) => (setPassword(e.target.value))} /><br /><br />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button className='loginBtn' type='submit'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
