import { useState } from 'react'
import './index.css'
import { useEffect } from 'react';

export default function App() {
  return(
    <main>
      <Headers />
    </main>
  )
}

function Headers(){
  const [IPaddress, setIPaddress] = useState("");
  const [ipApi, setIpApi] = useState(null);

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        setIpApi(data);
        setIPaddress(data.ip);
      })
      .catch(err => console.error("Error fetching user IP:", err));
  }, []);
  
  
  function handleSubmit(e) {
    e.preventDefault();
    if(IPaddress === "" || !/^\d+\.\d+\.\d+\.\d+$/.test(IPaddress)) {
      alert("Please enter a valid IP address format");
      return;
    }
    fetch(`https://ipapi.co/${IPaddress}/json/`)
        .then(res => res.json())
        .then(data => setIpApi(data))
        .catch(err => console.error("Error fetching IP data:", err));
  }
  return(
    <header>
      <h1>IP Address Tracker</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={IPaddress} onChange={(e) => setIPaddress(e.target.value)} placeholder='Enter your IP Address here'/>
        <button type="submit">
          <img src="images/icon-arrow.svg" alt="arrow icon" />
        </button>
      </form>

      <div className='infoWrap'>
        <div className='info'>
          <p>IP ADDRESS</p>
          <p>{ipApi?.ip || 'N/A'}</p>
        </div>
        <div className='info'>
          <p>LOCATION</p>
          <p>{ipApi?.country_name || 'N/A'}, {ipApi?.city || 'N/A'}</p>
        </div>
        <div className='info'>
          <p>TIMEZONE</p>
          <p>UTC{ipApi?.utc_offset || ' +N/A'}</p>
        </div>
        <div className='info'>
          <p>ISP</p>
          <p>{ipApi?.org || 'N/A'}</p>
        </div>
      </div>
    </header>
  );
}