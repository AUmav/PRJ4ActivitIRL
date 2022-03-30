import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar'
import InfoElement from './components/InfoElement';
import PostContainer from './components/PostContainer';

function App() {
  return (
    <div className="App">
    <NavBar/>
    <InfoElement/>
    <PostContainer/>
    </div>
  );
}

export default App;
