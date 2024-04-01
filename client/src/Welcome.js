import React from 'react';
import { Link } from 'react-router-dom';

function Welcome() {
  return (
    <div className="App">
        <h1>Admin Login is the First Step</h1>                                      
        <Link to="/login">
          <button>Login</button>
        </Link>
    </div>
  );
}

export default Welcome;
