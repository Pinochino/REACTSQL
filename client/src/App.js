import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateUser from './pages/CreateUser';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/create' element={<CreateUser />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
