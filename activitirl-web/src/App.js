import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom"

import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar'
import InfoElement from './components/InfoElement';
import PostContainer from './components/PostContainer';



function App() {
  return (
    <Router>
      <div className="App">
        <NavBar/>
        <InfoElement/>
          <Routes>
            <Route path="/" element={<PostContainer/>} />
            <Route path="/faq" element={<FAQ/>} />
          </Routes>
      </div>
    </Router>
  );
}

const FAQ = () => {
  return <h2>hahah</h2>
}
export default App;
