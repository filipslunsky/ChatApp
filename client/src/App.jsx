import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './features/general/Navbar';
import ProtectedRoute from './features/general/ProtectedRoute';
import Home from './features/general/Home';
import User from './features/user/User';
import Register from './features/user/Register';
import Login from './features/user/Login';
import UserEdit from './features/user/UserEdit';
import About from './features/general/About';
import Chats from './features/chat/Chats';
import ChatDetail from './features/chat/ChatDetail';
import ChatUsers from './features/chat/ChatUsers';
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
            <Route path='/chat' element={<Chats />} />
            <Route path='/chat/:chatId' element={<ChatDetail />} />
            <Route path='/chat-users/:chatId' element={<ChatUsers />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
