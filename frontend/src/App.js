import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
//import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import Register from './components/Register';
import SearchPeople from './components/Search';
import EditUser from './components/Edit';
import UpdateAddress from './components/EditAddress';
import AddNewAddress from './components/AddAddress'

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register/>}  />
          <Route path="/search" element={<SearchPeople />}/>
          <Route path="/editpeople/:id" element={<EditUser />} />
          <Route path="/editaddress/:userId/:addressId" element={<UpdateAddress />} />  
          <Route path="/addnewaddress/:userId" element={<AddNewAddress />} />
          
          {/* Se der tempo fazer as rotas privadas */}
          {/* <PrivateRoute path="/dashboard" element={<Dashboard />} requiresAuth={true} /> */}
          
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
