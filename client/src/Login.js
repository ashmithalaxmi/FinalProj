import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const [emailID, setEmailID] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/login', {emailID, password});
      if (response.status === 200) {
        alert('Login successful');
        navigate('/create');
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const onForgetClicked = async () => {
    axios
      .get('http://localhost:5000/sendmail', {params: {requestingUser: emailID}})
      .then((res) => {
        if(res.status === 200)
          alert('Mail Sent!');
      }).catch(err => {
        console.log(err);
      });
  }

  return (
    <div className="App">
        <h1>Admin  Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
      <center>
        <table>
        <div className="form-group">
          <tr>
          <td><label htmlFor="email">Email:</label></td>
          <td><input
            type="email"
            id="email"
            name="email"
            value={emailID}
            onChange={e => setEmailID(e.target.value)}
            required
          /></td>
          </tr>
        </div>
        <div className="form-group">
          <tr>
          <td><label htmlFor="password">Password:</label></td>
          <td><input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          /></td>
          </tr>
        </div>
        <tr>
        <td><button type="submit">Login</button></td>
        </tr>
        <tr>
        <td><button onClick={() => {
          onForgetClicked();
        }}>Forget pw</button></td>
        </tr>
        </table>
        </center>
      </form>

      
    </div>
  );
}

export default Login;
