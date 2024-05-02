import axios from 'axios';
import Swal from 'sweetalert2';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
const Vote = () => {
  const navigate=useNavigate();
  const id=localStorage.getItem("userId");
  const [vote, setVote] = useState({
    candidate: ""
  });

  const handleChange = (e) => {
    setVote({
      candidate: e.target.value,
    });
  };

  const submitData = async (e) => {
    e.preventDefault();
    console.log("Vote state:", vote); 

    try {
      const { data } = await axios.post(`http://localhost:8080/voting`, {
       candidate:vote.candidate,
       user:id,
      });
      console.log(data);
      if (data.success) {
        Swal.fire({
          title: 'Voted successfully',
          icon: 'success',
        });
      }else  {Swal.fire({
        title: 'Already voted',
        icon: 'error',
      });
     
    }
    } catch (error) {
      console.error(error);
      console.log("Full Error Response:", error.response); 
      Swal.fire({
        title: 'User Already voted',
        icon: 'error',
      });    }
  };
  const handleLogout = () => {
    localStorage.removeItem("userId");

        navigate('/login');
  };

  return (
    <form onSubmit={submitData}>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            id="radio1"
            name="candidate"
            value="candidate1"
            checked={vote.candidate === "candidate1"}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="radio1">Candidate1</label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            id="radio2"
            name="candidate"
            value="candidate2"
            checked={vote.candidate === "candidate2"}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="radio2">Candidate2</label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            id="radio3"
            name="candidate"
            value="candidate3"
            checked={vote.candidate === "candidate3"}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="radio3">Candidate3</label>
        </div>

        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            id="radio3"
            name="candidate"
            value="candidate4"
            checked={vote.candidate === "candidate4"}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="radio3">Candidate4</label>
        </div>


        <div className="text-center mt-3">
        <button type="submit" style={{ marginRight: '8px' }} className="btn btn-primary">Vote</button>
        <button type="button" className="btn btn-primary" onClick={handleLogout}>Logout</button>

        </div>
      </div>
    </form>
  );
};

export default Vote;
