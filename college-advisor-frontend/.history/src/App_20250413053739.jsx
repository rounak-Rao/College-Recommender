import React, { useState } from 'react';

function CollegeRecommender() {
  const [schools, setSchools] = useState('');
  const [income, setIncome] = useState('');
  const [major, setMajor] = useState('');
  const [state, setState] = useState('');
  const [parentLoan, setParentLoan] = useState(false);
  const [preference, setPreference] = useState(50); // 0 = QoL, 100 = ROI
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      schools: schools.split(',').map(s => s.trim()),
      income: parseInt(income),
      major,
      state,
      parentLoan,
      preference
    };

    try {
      const response = await fetch('http://localhost:8000/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const resData = await response.json();
      setResult(resData.explanation);
    } catch (error) {
      console.error('Error fetching recommendation:', error);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Smart College Recommender</h1>
      <p>
        Enter your preferences below. Adjust the slider to prioritize between Return on Investment (ROI) and Quality of Life (QoL).
      </p>
      <form onSubmit={handleSubmit}>
        <label>
          List of Colleges (comma-separated):
          <input type="text" value={schools} onChange={e => setSchools(e.target.value)} required />
        </label>
        <br />
        <label>
          Household Income:
          <input type="number" value={income} onChange={e => setIncome(e.target.value)} required />
        </label>
        <br />
        <label>
          Intended Major:
          <input type="text" value={major} onChange={e => setMajor(e.target.value)} required />
        </label>
        <br />
        <label>
          State of Residence:
          <input type="text" value={state} onChange={e => setState(e.target.value)} required />
        </label>
        <br />
        <label>
          Will you take out parent loans?
          <input type="checkbox" checked={parentLoan} onChange={e => setParentLoan(e.target.checked)} />
        </label>
        <br />
        <label>
          Preference (QoL vs ROI):
          <input type="range" min="0" max="100" value={preference} onChange={e => setPreference(e.target.value)} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>QoL</span>
            <span>ROI</span>
          </div>
        </label>
        <br />
        <button type="submit">Get Recommendation</button>
      </form>
      {result && (
        <div>
          <h2>Recommendation:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}

export default CollegeRecommender;
