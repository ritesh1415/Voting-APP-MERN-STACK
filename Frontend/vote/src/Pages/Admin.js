import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/get-vote");
        if (response.data.success) {
          setVotes(response.data.vote);
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const getCandidateVotes = (candidate) => {
    const candidateVotes = votes.filter((vote) => vote.candidate === candidate);
    return candidateVotes.length;
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate('/login');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Vote List</h1>
      {votes.length === 0 ? (
        <p>No votes available</p>
      ) : (
        <table className="table" style={{ fontSize: '14px' }}>
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Votes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Candidate1</td>
              <td>{getCandidateVotes('candidate1')}</td>
            </tr>
            <tr>
              <td>Candidate2</td>
              <td>{getCandidateVotes('candidate2')}</td>
            </tr>
            <tr>
              <td>Candidate3</td>
              <td>{getCandidateVotes('candidate3')}</td>
            </tr>
            <tr>
              <td>Candidate4</td>
              <td>{getCandidateVotes('candidate4')}</td>
            </tr>
          </tbody>
        </table>
      )}
      <button type="button" className="btn btn-primary" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Admin;
