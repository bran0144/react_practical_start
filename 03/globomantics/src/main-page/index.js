import logo from './logo.svg';
import './main-page.css';
import Header from './header';
import { useEffect, useMemo, useState } from 'react';

function App() {
  const userName = "Roland";
  const [allHouses, setAllHouses] = useState([]);
  useEffect(() => {
    const fetchHouses = async () => {
      const rsp = await fetch("/houses.json");
      const houses = await rsp.json();
      setAllHouses(houses);
    };
    fetchHouses();
  }, []);

  const featuredHouse = useMemo(() => {
    if (allHouses.length) {
      const randomIndex = Math.floor(Math.random() * allHouses.length);
      return allHouses[randomIndex];
    }
  }, [allHouses]);
 
  return (
    <div className='container'>
      <Header subtitle={userName}
        title="Some title"
      />
    </div>
  );
}

export default App;
