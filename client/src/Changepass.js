import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Changepass = () => {
    const emailID = new URLSearchParams(useLocation().search).get('emailID');
    const [password, setPassword] = useState("");

    const handleSubmit = () => {
        axios.post('http://localhost:5000/update', {emailID, newpassword: password})
            .then((res) => {
                if(res.status === 200) alert('Updated Password');
            })
            .catch(err => {
                console.log(err);
            })
    }

  return (
    <div>
      <center>
        <h1>Reset Password</h1>
        </center>
      <form className="login-form" onSubmit={handleSubmit}>
        <center>
          <table>
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
        <td><button type="submit">Update Password</button></td>
        </tr>
        </table>
        </center>
      </form>
    </div>
  )
}

export default Changepass