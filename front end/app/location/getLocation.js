import fetch from 'node-fetch';
import AllContextProvider from '../(filter)/all-context';
export default async function getLocation() {
    const response = await fetch('http://127.0.0.1:5000/geolocation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    const location = data.r1 + data.r2;
    return <AllContextProvider location={location} />;
}