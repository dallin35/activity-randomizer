import logo from './logo.svg';
import './App.css';
import Home from './home';
import HeaderContainer from './header-container'
import LeftContainer from './left-container'
import FooterContainer from './footer-container'

function App() {
  return (
    <body>
      <div className="header-container">
        <HeaderContainer />
      </div>
      <div id="content">
        <div className="left-container">
          <LeftContainer />
        </div>
        <div className="home">
          <Home />
        </div>
      </div>
      <div className="footer-container">
        <FooterContainer />
      </div>
    </body>

  );
}

export default App;
