import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [skips, setSkips] = useState([]);
  const [selectedSkip, setSelectedSkip] = useState(null);

  useEffect(() => {
    axios.get('https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft')
      .then(response => setSkips(response.data.skips));
  }, []);

  return (
    <div className="skip-selector">
      <h1>Choose Your Skip Size</h1>
      <p>Select the skip size that best suits your needs</p>
      
      <div className="skip-grid">
        {skips.map(skip => (
          <div 
            key={skip.id} 
            className={`skip-card ${selectedSkip === skip.id ? 'selected' : ''}`}
            onClick={() => setSelectedSkip(skip.id)}
          >
            <h3>{skip.size}</h3>
            <p>{skip.duration} hire</p>
            <div className="price">£{skip.price}</div>
            <button>{selectedSkip === skip.id ? 'Selected' : 'Select This Skip'}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;