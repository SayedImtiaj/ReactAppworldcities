// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import CityList from './Components/CityListComponent';
import CountryList from './Components/CountryListComponent';

const App: React.FC = () => {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">World Cities</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/cities">Cities</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/countries">Countries</Link>
              </li>
            </ul>
          </div>
        </nav>
        
        <div>
          <Routes>
        <Route path="/cities" element={<CityList/>} />
          <Route path="/countries" element={<CountryList/>} />
          <Route path="/" element ={<CityList/>} />
          </Routes>
        </div>
        
      </div>
    </Router>
  );
};

export default App;