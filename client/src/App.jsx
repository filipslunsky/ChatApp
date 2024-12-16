import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './features/general/Home';
import User from './features/user/User';
import Register from './features/user/Register';
import Login from './features/user/Login';
import UserEdit from './features/user/UserEdit';
import './App.css';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/user/register' element={<Register />} />
          <Route path='/user/login' element={<Login />} />
          <Route path='/user/info' element={<User />} />
          <Route path='/user/edit' element={<UserEdit />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
