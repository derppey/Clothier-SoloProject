import './App.css';
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import HomeDash from './components/HomeDash';
import Register from './components/Register';
import ItemDetail from './components/ItemDetail';
import MyCloset from './components/MyCloset';
import LoginPage from './components/LoginPage';
import actions from './redux/actions';
import { connect } from 'react-redux';
import apiService from './apiServices';

function App({getItems}) {
  const [authenticated, setAuthenticated] = useState(false);
  const [searchToggle, setSearchToggle] = useState(false);
  const [searchValue, setSearchValue] = useState('');
    
    //UseEffect:
    useEffect(() => {
      async function fetchData() {
        const itemArr = await apiService.fetchItems();
        getItems(actions.getItems(itemArr));
      }
      fetchData();
    }, [getItems]);
    
  //Handle searchbar:
  const handleEvent = (e) => {
    setSearchValue(e.target.value);
    setSearchToggle(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSearchValue('');
    // search for items and persons and pass it to search component
  }

  const logOut = () => {
    localStorage.removeItem('accessToken');
    setAuthenticated(false);
  }

  //LogIn and registration flow:
  if (!authenticated) return (
    <Router>
      <Switch>
      <Route path="/" exact>
          <LoginPage setAuthenticated={setAuthenticated}></LoginPage>
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
      <button className="button" type='click' onClick={() => logOut()} > Log Out </button>
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

const mapStateToProps = ({items}) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getItems: (action) => dispatch(action)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

