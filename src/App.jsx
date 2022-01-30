// styles
import './App.css';
// react
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// components
import Home from './components/home';
import Login from './components/login';
import Admin from './components/admin';
import Menu from './components/menu';

function App() {
  return (
    <div className="App container">
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
