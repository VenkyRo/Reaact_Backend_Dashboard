import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct'
import WelcomPage from './WelcomPage'
import AllProduct from '../components/AllProduct'

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showFirm, setShowFirm] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [showWelcome, SetShowWelcome] = useState(false);
  const [showAllProducts, SetShowAllProducts] = useState(false);
  const [showLogout, SetShowLogout] = useState(false);
  const [showFirmTitle, setShowFirmTitle] = useState(true);


  useEffect(()=>{
    const loginToken = localStorage.getItem('loginToken')
    if(loginToken){
      SetShowLogout(true);

    }
  },[])

  useEffect(()=>{
    const firmName = localStorage.getItem('firmName');
    if(firmName){
      setShowFirmTitle(false);
    }
  },[])


  const logoutHandler =()=>{
    confirm('are you sure logout? ')
    localStorage.removeItem('loginToken')
    localStorage.removeItem('firmId');
    localStorage.removeItem("firmName");
    SetShowLogout(false)
    setShowFirmTitle(true);
    
  }

  const showLoginHandler =()=>{
    setShowLogin(true);
    setShowRegister(false);
    setShowFirm(false)
    setShowProduct(false);
    SetShowWelcome(false);
    SetShowAllProducts(false);
  }

  const showRegisterHandler = () => {
    setShowRegister(true);
    setShowLogin(false);
    setShowFirm(false);
    setShowProduct(false)
     SetShowWelcome(false);
     SetShowAllProducts(false);
  };

  const showFirmHandler = () => {
    if(showLogout){
      setShowRegister(false);
      setShowLogin(false);
      setShowProduct(false);
      setShowFirm(true);
      SetShowWelcome(false);
      SetShowAllProducts(false);
    } else{
      alert("please Login");
      setShowLogin(true);
    }
  };

  const showProductHandler = () => {
    if(showLogout){
      setShowRegister(false);
      setShowLogin(false);
      setShowFirm(false);
      setShowProduct(true);
      SetShowWelcome(false);
      SetShowAllProducts(false);
    }else{
       alert("please Login");
       setShowLogin(true);
    }
  };

  const showWelcomeHandler = () => {
    setShowRegister(false);
    setShowLogin(false);
    setShowFirm(false);
    setShowProduct(false);
    SetShowWelcome(true)
    SetShowAllProducts(false);
  };

  const showAllProductsHandler = () => {
    if (showLogout) {
      setShowRegister(false);
      setShowLogin(false);
      setShowFirm(false);
      setShowProduct(false);
      SetShowWelcome(false);
      SetShowAllProducts(true);
    } else {
      alert("please Login");
      setShowLogin(true);
    }
  };

  return (
    <>
      <div className="app">
        <NavBar
          showLoginHandler={showLoginHandler}
          showRegisterHandler={showRegisterHandler}
          showLogout={showLogout}
          logoutHandler={logoutHandler}
        />
        <div className="container">
          <SideBar
            showFirmHandler={showFirmHandler}
            showProductHandler={showProductHandler}
            showAllProductsHandler={showAllProductsHandler}
            showFirmTitle={showFirmTitle}
          />
          {showLogin && <Login showWelcomeHandler={showWelcomeHandler} />}
          {showRegister && <Register showLoginHandler={showLoginHandler} />}
          {showFirm && showLogout && <AddFirm />}
          {showProduct && showLogout && <AddProduct />}
          {showWelcome && <WelcomPage />}
          {showAllProducts && showLogout && <AllProduct></AllProduct>}
          {/** */}
        </div>
      </div>
    </>
  );
}

export default LandingPage