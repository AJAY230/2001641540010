import React, { useState } from 'react';

function NumberManagementService() {
  const [numbers, setNumbers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNumbers = async (urls) => {
  setLoading(true);

  const uniqueNumbers = new Set();

  try {
    const responses = await Promise.all(
      urls.map(async (url) => {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          data.numbers.forEach((number) => uniqueNumbers.add(number));
        } else {
          throw new Error(`Failed to fetch data from ${url}`);
        }
      })
    );
    setLoading(false);
    setNumbers(Array.from(uniqueNumbers).sort((a, b) => a - b));
  } catch (error) {
    console.error("Error fetching data:", error);
    setLoading(false);
  }
};


  const handleFetchNumbers = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const urls = queryParams.getAll('url');

    fetchNumbers(urls);
  };

  return (
    <div>
      <h1>Number Management</h1>
      <button onClick={handleFetchNumbers}>Get numbers</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
  <h2>Result:</h2>
  <ul>
    {numbers.map((number) => (
      <li key={number}>{number}</li>
    ))}
    </ul>
    </div>
      )}
    </div>
  );
}

export default NumberManagementService;