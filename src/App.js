import './App.css';
import { Routes, Route } from 'react-router-dom';
import UserLoginSignup from './Login-Signup/UserLoginSignup';
import HomePage from './Components/HomePage';
import AdminLoginSigup from './AdminSection/AdminLoginSignup';
import AdminHomePage from './AdminSection/AdminHomePage';
import AllProductsUI from './Components/AllProductsUI';
import AboutUs from './Components/AboutUs';
import ProfileDetails from './Components/ProfileDetails';
import CartSection from './Components/CartSection';
import SingleProductUI from './Components/SingleProductUI';
import OrderDetailsUserSide from './Components/OrderDetailUserSide';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<UserLoginSignup/>}></Route>
        <Route path='/homepage' element={<HomePage/>}></Route>
        <Route path='/allproductsui' element={<AllProductsUI/>}></Route>
        <Route path='/aboutUs' element={<AboutUs/>}></Route>
        <Route path='/profiledetails' element={<ProfileDetails/>}></Route>
        <Route path="/cartsection" element={<CartSection/>}></Route>
        <Route path='/singleproductsui' element={<SingleProductUI/>}></Route>
        <Route path='/orderdetailsuserside' element={<OrderDetailsUserSide/>}></Route>


        {/* Admin Section Routes */}
        <Route path='/adminloginsignup' element={<AdminLoginSigup/>}></Route>
        <Route path='/adminhomepage' element={<AdminHomePage/>}></Route>
      </Routes>
    </div>
  );
}

export default App;