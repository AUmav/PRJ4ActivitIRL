import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom"

import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar'
import LoginForm from "./components/02-organisms/forms/loginForm/LoginForm";
import CreateUserForm from "./components/02-organisms/forms/createUserForm/CreateUserForm";
import HomePage from "./components/04-pages/homePage/HomePage";
import ActivityDetails from "./components/03-templates/ActivityDetails";


function App() {
  return (
    <Router>
      <div className="App">
        <NavBar/>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/faq" element={<FAQ/>} />
            <Route path="/login" element={<LoginForm/>}/>
            <Route path="/join" element={<CreateUserForm/>}/>
            <Route path="/activity/:id" element={<ActivityDetails/>}/>
          </Routes>
      </div>
    </Router>
  );
}

const FAQ = () => {
  return <h2>FAQ</h2>
}
export default App;
