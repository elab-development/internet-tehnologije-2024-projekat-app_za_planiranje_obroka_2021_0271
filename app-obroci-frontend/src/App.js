import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './Components/LoginPage';
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage';
import RegisterPage from './Components/RegisterPage';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';
import ReceptiPage from './Components/ReceptiPage';
import NavBar from './Components/NavBar';
import ReceptiDetaljnijePage from './Components/ReceptiDetaljnijePage';
import DodajReceptPage from './Components/DodajReceptPage';
import Layout from './Components/Layout';
import ProfilPage from './Components/ProfilPage';
import DodajObrokPage from './Components/DodajObrokPage';
import AdminPage from './Components/AdminPage';

import ObrociDetaljnijePage from './Components/ObrociDetaljnijePage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
   
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/recepti" element={<ReceptiPage />} />
        <Route path="/recepti/:id" element={<ReceptiDetaljnijePage />} />
        {/*LINIJA ISPOD JE DODATA */}
        <Route path="/obroci/:id" element={<ObrociDetaljnijePage />} />
        <Route path="/dodajRecept" element={<DodajReceptPage />} />
        <Route path="/dodajObrok" element={<DodajObrokPage />} />
        <Route path="/obroci" element={<h1>Obroci Page</h1>} />
        <Route path="/profil" element={<ProfilPage/>} />
        <Route path="/admin" element={<AdminPage/>} />

      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot_password" element={<ForgotPassword />} />
      <Route path="/reset_password" element={<ResetPassword />} />
      
    </Routes>
  </BrowserRouter>
  );
}

export default App;

