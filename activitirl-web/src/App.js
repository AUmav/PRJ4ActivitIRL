import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom"

import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar'
import HomePage from "./components/04-pages/homePage/HomePage";
import ActivityDetails from "./components/03-templates/ActivityDetails/ActivityDetails";
//import ActivityDetails from "./components/03-templates/ActivityDetails";
import LoginPage from "./components/04-pages/LoginPage";
import CreateUserPage from "./components/04-pages/CreateUserPage";
import CreateActivityForm from "./components/02-organisms/forms/createActivityForm/createActivityForm";
import CreateActivityPage from "./components/04-pages/CreateActivityPage";


function App() {
  return (
    <Router>
      <div className="App">
        <NavBar/>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/faq" element={<FAQ/>} />
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/join" element={<CreateUserPage/>}/>
            <Route path="/activity/:id" element={<ActivityDetails/>}/>
            <Route path="/logout" element={<LogOut/>}/>
            <Route path="/activity/create" element={<CreateActivityPage/>}/>
          </Routes>
      </div>
    </Router>
  );
}

const LogOut = () => {
  localStorage.removeItem("loginToken");
  window.location.replace("/");

}

const FAQ = () => {
  return <h2>FAQ</h2>
}
export default App;
