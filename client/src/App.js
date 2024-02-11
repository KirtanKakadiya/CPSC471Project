import './App.css';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import {BrowserRouter, Route,Routes } from "react-router-dom";
import Layout from './Layout';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<LoginPage />} />
      </Routes>
      <Routes>
        <Route path = "/" element = {<Layout />}>
          <Route path = "/home" element = {<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
