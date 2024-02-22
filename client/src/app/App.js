import './App.css';
import LoginPage from '../pages/Login';
import HomePage from '../pages/Home';
import ExploreRoom from '../pages/ExploreRoom';
import DiscoverClasses from '../pages/DiscoverClasses';
import RegisterPage from '../pages/Register';
import RoomReservations from '../pages/RoomReservations';
import AdminModifyRooms from '../pages/AdminModifyRooms';
import Protected from './Protected';
import {BrowserRouter, Route,Routes,ProtectedRoute } from "react-router-dom";
import Layout from "../Layout"
import { useSelector } from 'react-redux'


function App() {

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (

    <BrowserRouter>
      <Routes>
        <Route index element = {<LoginPage />} />
        <Route path = "/register" element = {<RegisterPage />} />
      </Routes>
      <Protected isLoggedIn = {isLoggedIn}>
        <Routes>
          <Route path = "/" element = {<Layout />}>
            <Route path = "/home" element = {<HomePage />} />
            <Route path = "/exploreclass" element = {<ExploreRoom />} />
            <Route path = "/discoverclass" element = {<DiscoverClasses />} />
            <Route path = "/roomreservations" element = {<RoomReservations />} />
            <Route path='/admin' element = {<AdminModifyRooms />} />  
          </Route>
        </Routes>
      </Protected>
    </BrowserRouter>

  );
}

export default App;
