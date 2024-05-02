import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    role: "",
    email: "",
    password: "",
    phone: ""
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
      const { data } = await axios.post("http://localhost:8080/register", {
        role: input.role,
        email: input.email,
        password: input.password,
        phone: input.phone
      });

      console.log("Server Response:", data);

      if (data.success !== undefined && data.success) {
        console.log("Successfully registered");
        alert("Registered successfully");
        if(input.role==='user'){
        navigate('/login');}
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error during registration", error);
      alert("please enter a valid  role");
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
            required
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
            required
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPhone">Phone Number</label>
          <input
            type="tel"
            className="form-control"
            id="exampleInputPhone"
            placeholder="Enter phone number"
            name="phone"
            value={input.phone}
            required
            onChange={handleChange}
          />
        </div>

        <button type="submit" style={{ marginRight: '20px' }} className="btn btn-primary">
          Submit
        </button>

          <button type="button" onClick={() => navigate('/login')} className="btn btn-primary">
             Login
          </button>
      </form>
    </div>
  );
};

export default Register;
