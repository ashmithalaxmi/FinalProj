import React, { useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

function Create() {
  const [emailID, setEmailID] = useState("");
  const [role, setrole] = useState("");
  const [fullName, setfullName] = useState("");
  const [username, setusername] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [department, setdepartment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios
                      .post('http://localhost:5000/create', 
                      {emailID, role, fullName, username, phoneNumber, department});
      if (response.status === 200) {
        alert('Created successful');
      } else {
        alert('Creation failed');
      }
    } catch (error) {
      console.error('Error Creatin:', error);
    }
  };

  return (
    <div className="App">
        <h1>Create New User</h1>
      <form onSubmit={handleSubmit} className="user-form">
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
          <td><label htmlFor="fullName">Full Name:</label></td>
          <td><input
            type="text"
            id="fullName"
            name="fullName"
            value={fullName}
            onChange={e => setfullName(e.target.value)}
            required
          /></td>
          </tr>
        </div>
        <div className="form-group">
          <tr>
          <td><label htmlFor="username">Username:</label></td>
          <td><input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={e=>setusername(e.target.value)}
            required
          /></td>
          </tr>
        </div>
        <div className="form-group">
          <tr>
          <td><label htmlFor="phoneNumber">Phone Number:</label></td>
          <td><input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            onChange={e=>setphoneNumber(e.target.value)}
            required
          /></td>
          </tr>
        </div>
        <div className="form-group">
          <tr>
          <td><label htmlFor="department">Department:</label></td>
          <td><input
            type="text"
            id="department"
            name="department"
            value={department}
            onChange={e=>setdepartment(e.target.value)}
            required
          /></td>
          </tr>
        </div>
        <div className="form-group">
          <tr>
          <td><label htmlFor="role">Role:</label></td>
          <td><input
            type="text"
            id="role"
            name="role"
            value={role}
            onChange={e => setrole(e.target.value)}
            required
          /></td>
          </tr>
        </div>
        <tr>
        <td><button type="submit">Create</button></td>
        </tr>
        </table>
        </center>
      </form>
    </div>
  );
}

export default Create;
