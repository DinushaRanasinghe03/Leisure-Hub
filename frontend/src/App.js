import logo from './logo.svg';
import './App.css';
import Header1 from './components/Layout/Header1/Header1.js'
import personalDetails from './pages/paymentDetails/personalDetails.js'
import { Route, Router } from 'react-router-dom';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
       <div className="App">
      <Header1/>
      <Route path="/personaldetails" exact component={personalDetails}/>
     
    </div>

    </Router>
   
  );
}

export default App;
