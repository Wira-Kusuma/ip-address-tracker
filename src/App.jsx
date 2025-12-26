import { useState } from 'react'
import './index.css'
import { useEffect } from 'react';

export default function App() {
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
    <main>
      <Headers ipApi={ipApi}
      handleSubmit={handleSubmit}
      IPaddress={IPaddress}
      setIPaddress={setIPaddress}/>
      <Map ipApi={ipApi}/>
      <Footer />
    </main>
  )
}

function Headers({ipApi, handleSubmit, IPaddress, setIPaddress}){
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

function Map({ipApi}){
  return(
    <>
    {ipApi && (
        <div className='map'>
          <iframe
            src={`https://www.google.com/maps?q=${ipApi.latitude},${ipApi.longitude}&z=15&output=embed`}
            allowFullScreen
          />
        </div>
      )}
    </>
    
  )
}

function Footer(){
  return(
    <footer>
      Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
      Coded by <a href="https://github.com/Wira-Kusuma/ip-address-tracker">Wira Kusuma Phandawa</a>.
    </footer>
  )
}