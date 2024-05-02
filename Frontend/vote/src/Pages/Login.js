import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    role: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:8080/login", {
        role: input.role,
        email: input.email,
        password: input.password
      });
      console.log(data);
      if (data.success) {
        localStorage.setItem('userId', data?.user._id);
        alert("Logged in successfully");

        if (input.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/vote');
        }
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error(error.message);
      alert("user not found");
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form style={{ width: '300px' }} onSubmit={handleSubmit}>
        <div className="form-group">
        <label htmlFor="role">Role</label>
          <select
            className="form-control"
            id="role"
            name="role"
            value={input.role}
            onChange={handleChange}
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>

        </div>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            value={input.email}
            onChange={handleChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            name="password"
            value={input.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>

        
          <button type="button" onClick={() => navigate('/')} style={{ marginLeft: '10px' }} className="btn btn-primary">
             Register
          </button>
        
      </form>
    </div>
  );
};

export default Login;
