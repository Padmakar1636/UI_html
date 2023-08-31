import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AddUser from './components/AddUser';
import DisplayUsers from './components/DisplayUsers';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/adduser' element={<AddUser />} />
        <Route path='/userlist' element={<DisplayUsers />} />
        <Route path='/' element={<AddUser />} />
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
