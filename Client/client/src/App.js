import './App.css';
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import HomeDash from './components/HomeDash';
import Register from './components/Register';
import ItemDetail from './components/ItemDetail';
import MyCloset from './components/MyCloset';
import LoginPage from './components/LoginPage';

function App() {
  const [authenticated, setAuthenticated] = useState(true);
  const [searchToggle, setSearchToggle] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  
  //fetch login password compare

  //fetch clothes

  //Handle searchbar:
  const handleEvent = (e) => {
    setSearchValue(e.target.value);
    setSearchToggle(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSearchValue('')
    // search for items and persons and pass it to search component
  }

  //LogIn and registration flow:
  if (!authenticated) return (
    <Router>
      <Switch>
      <Route path="/" exact>
          <LoginPage></LoginPage>
        </Route>
      <Route path="/register" exact>
          <Register setAuthenticated={setAuthenticated}></Register>
        </Route>
      </Switch>
    </Router>
  );
  
  //Logged In flow
  return (
    <Router>
    {/* NavBar   */}
    <div className="navbar">
      <Link to='/'>
      <h1>Clothier</h1>
      </Link>
      <h1>For you</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="🔍 Search" value={searchValue} onChange={handleEvent}/>
      </form>
      <Link to='/MyCloset'>
      <button className="button" type='click'> MyCloset </button>
      </Link>
      <button className="button" type='click' onClick={() => {setAuthenticated(false)}} > Log Out </button>
    </div>

    {/* Router routes */}
      <Switch>
        <Route path="/" exact>
          <HomeDash searchToggle={searchToggle} setSearchToggle={setSearchToggle}></HomeDash>
        </Route>
        <Route path="/itemDetail" exact>
          <ItemDetail searchToggle={searchToggle} setSearchToggle={setSearchToggle}></ItemDetail>
        </Route>
        <Route path="/MyCloset" exact>
          <MyCloset searchToggle={searchToggle} setSearchToggle={setSearchToggle}></MyCloset>
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
