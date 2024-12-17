import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './features/general/Navbar';
import ProtectedRoute from './features/general/ProtectedRoute';
import Home from './features/general/Home';
import User from './features/user/User';
import Register from './features/user/Register';
import Login from './features/user/Login';
import UserEdit from './features/user/UserEdit';
import Dashboard from './features/chat/Dashboard';
import About from './features/general/About';
import Chat from './features/chat/Chat';
import './App.css';

function App() {
  const isLoggedIn = useSelector(state => state.user.loggedIn);

  return (
    <>
      <BrowserRouter>
      {isLoggedIn && <Navbar />}
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/user/register' element={<Register />} />
          <Route path='/user/login' element={<Login />} />
          <Route path='/about' element={<About />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/user/info' element={<User />} />
            <Route path='/user/edit' element={<UserEdit />} />
            <Route path='/chat' element={<Chat />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
