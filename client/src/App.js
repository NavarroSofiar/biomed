import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail';
import CreateJobForm from './components/CreateJobForm/CreateJobForm';
import Admin from './components/Admin/Admin';
import DetailAdmin from './components/Admin/DetailAdmin';
import EditJobForm from './components/Admin/EditForm';
import keycloak from "./Keycloak"
import NavBar from './components/NavBar/NavBar';
import NotAuthorized from './components/NotAuthorized/NotAuthorized';
import NotFound from './components/NotFound/NotFound';

function App() {
  const [userInfo, setUserInfo] = useState({});
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (!authenticated) {
      keycloak.init({ onLoad: 'check-sso' })
        .then(authenticated => { 
          if (authenticated) {
            setUserInfo({
              authenticated,
              roles: keycloak.realmAccess.roles
            });
            setAuthenticated(authenticated);
          }
         } )
        .catch(error => console.error(error));
     } 
  }, [authenticated]);
  
  


  return (
    <BrowserRouter>
    <NavBar keycloak={keycloak}  />
    <Routes>
      {userInfo.authenticated &&  userInfo.roles.includes('app-admin') ? (
        <>
      <Route path='/admin' element={<Admin/>} />
      <Route path='/' element={<Home keycloak={keycloak}/>} />
        <Route  path={"/api/jobs/:id"} element={<Detail/>} />
        <Route path='/admin/create-job' element={<CreateJobForm/>} />
        <Route path='/admin/editjobs/:id' element={<EditJobForm/>} />
        <Route path='/admin/jobs/:id' element = {<DetailAdmin/>} />
        <Route path="*" element={<NotFound />} />
        </>
      ) : (
      
      <>
        <Route path='/' element={<Home keycloak={keycloak}/>} />
        <Route  path={"/api/jobs/:id"} element={<Detail/>} />
        <Route path='/admin' element={<NotAuthorized/>} />
        <Route path='/admin/create-job' element={<NotAuthorized/>} />
        <Route path='/admin/editjobs/:id' element={<NotAuthorized/>} />
        <Route path='/admin/jobs/:id' element = {<NotAuthorized/>} />
        <Route path="*" element={<NotFound />} />
        </>
        
      ) }
      
     
    </Routes>
  </BrowserRouter>
  );
}

export default App;
