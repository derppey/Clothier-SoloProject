import './styles/app.css';
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

function App({getItems, getUser, user, setSearchVal, searchVal}) {
  const [authenticated, setAuthenticated] = useState(false);
  
  //UseEffect:
  useEffect(() => {
    async function fetchData() {
      const itemArr = await apiService.fetchItems();
      getItems(actions.getItems(itemArr));
    }
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setAuthenticated(true);
      fetchData();
      getProfile(accessToken);
    }
  }, [authenticated]);

  //getProfile
  const getProfile = async (accessToken) => {
    const userInfo = await apiService.profile(accessToken);
    if (userInfo.error) console.log('No user info found');
    else getUser(actions.getUser(userInfo));
  };
    
  //Handle searchbar:
  const handleEvent = (e) => {
    setSearchVal(actions.setSearchVal(e.target.value));
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
    <div className="body">
      <Router>
      {/* NavBar   */}
      <nav className="top-menu navbar pt-4">
        <div className="navbar-brand">
          <Link to='/'>
            <img src="utils/ClothierWideRed.png" alt="Clothier" />
          </Link>
        </div>
        <h1 className='title '>Hi {user.firstName}! </h1>
        <input className='input is-rounded search-bar' type="text" placeholder="🔍 Search" value={searchVal} onChange={handleEvent}/>
        <Link to='/MyCloset'>
        <button className="button is-info is-rounded" type='click'> MyCloset </button>
        </Link>
        <Link to='/'>
        <button className="button is-warning is-rounded" type='click' onClick={() => logOut()} > Log Out </button>
        </Link>
      </nav>

      {/* Router routes */}
      <div className='content'>
        <Switch>
          <Route path="/" exact>
            <HomeDash></HomeDash>
          </Route>
          <Route path="/itemDetail" exact>
            <ItemDetail></ItemDetail>
          </Route>
          <Route path="/MyCloset" exact>
            <MyCloset></MyCloset>
          </Route>
        </Switch>
      </div>
      </Router>
    </div>
  )
}

const mapStateToProps = ({store}) => {
  return {
    user: store.user,
    searchVal: store.searchVal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getItems: (action) => dispatch(action),
    getUser: (action) => dispatch(action),
    setSearchVal: (action) => dispatch(action),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

