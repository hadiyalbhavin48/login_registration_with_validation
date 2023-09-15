
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import './style.css';
import Login from './Login/Login'
import Home from './Registration/Home'
import Register from './Registration/Register'
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <ToastContainer theme='colored' position='top-center'></ToastContainer>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          {/* {/* <Route path='/customer' element={<Customer/>}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
