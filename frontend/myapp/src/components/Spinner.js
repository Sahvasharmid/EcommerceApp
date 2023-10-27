import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Spinner = () => {
  const [counter, setCounter] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      // Store the current counter value in a separate variable
      const currentCounter = counter - 1;

      // Update the state with the new counter value
      setCounter(currentCounter);

      // Check if the current counter value is 0 and navigate accordingly
      if (currentCounter === 0) {
        navigate("/login")
      }
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [counter, navigate]);

  return (
    <div>
      <h1>redirecting in {counter}</h1>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
