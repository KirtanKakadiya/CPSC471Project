import './App.css';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import ExploreRoom from './pages/ExploreRoom';
import DiscoverClasses from './pages/DiscoverClasses';
import RegisterPage from './pages/Register';
import RoomReservations from './pages/RoomReservations';
import UserInfo from './pages/UserInfo';
import {BrowserRouter, Route,Routes } from "react-router-dom";
import Layout from './Layout';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route index element = {<LoginPage />} />
        <Route path = "/register" element = {<RegisterPage />} />
      </Routes>
      <Routes>
        <Route path = "/" element = {<Layout />}>
          <Route path = "/home" element = {<HomePage />} />
          <Route path = "/exploreclass" element = {<ExploreRoom />} />
          <Route path = "/discoverclass" element = {<DiscoverClasses />} />
          <Route path = "/roomreservations" element = {<RoomReservations />} />
          <Route path = "/userinfo" element = {<UserInfo />} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
