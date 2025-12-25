import { useState } from 'react'
import './index.css'

export default function App() {
  return(
    <main>
      <Headers />
    </main>
  )
}

function Headers(){
  const [IPaddress, setIPaddress] = useState()
  function handleSubmit(e) {
    e.preventDefault();
    if(IPaddress === "" || !/^\d+\.\d+\.\d+\.\d+$/.test(IPaddress)) {
      alert("Please enter a valid IP address format");
      return;
    }
    alert(IPaddress)
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
          <p>123.123.12.123</p>
        </div>
        <div className='info'>
          <p>LOCATION</p>
          <p>Indonesia</p>
        </div>
        <div className='info'>
          <p>TIMEZONE</p>
          <p>+7 GMT</p>
        </div>
        <div className='info'>
          <p>ISP</p>
          <p>indiHome</p>
        </div>
      </div>
    </header>
  );
}