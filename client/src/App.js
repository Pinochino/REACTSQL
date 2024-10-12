import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserDetail from './pages/UserDetail';
import Register from './pages/Register';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/create' element={<Register />}></Route>
        <Route path='/read/:id' element={<UserDetail />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
