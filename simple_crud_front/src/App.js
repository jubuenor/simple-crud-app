import './App.css';
import Navbar from './components/Navbar/Navbar';
import Menu from './components/Menu/Menu';
import Login from './components/SignIn/SignIn';
import Register from './components/SignUp/SignUp';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <div className='main'>
        
        <Register></Register>

      </div>   
    </div>
  );
}

export default App;

