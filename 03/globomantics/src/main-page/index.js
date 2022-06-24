import logo from './logo.svg';
import './main-page.css';
import Header from './header';
import { useEffect, useMemo, useState } from 'react';
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FeaturedHouse from './featured-house';
import SearchResults from './search-results/search-results-row';
import HouseFilter from './house-filter';
import HouseFromQuery from './house/HouseFromQuery';

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
    <Router>
      <div className='container'>
        <Header subtitle="Providing houses all over the world." />
        <HouseFilter allHouses={allHouses} />
        <Switch>
          <Route path="/searchresult/:country">
            <SearchResults allHouses={allHouses} />
          </Route>

          <Route path="/house/:id">
            <HouseFromQuery allHouses={allHouses} />
          </Route>

          <Rouse path="/">
            <FeaturedHouse house={featuredHouse}></FeaturedHouse>
          </Rouse>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
