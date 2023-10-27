import React from 'react'
import Signup from './pages/Auth/Signup'
import {Routes,Route} from 'react-router-dom'
import Signin from './pages/Auth/Signin'

import Cart from './pages/Cart'
import Forgotpassword from './pages/Auth/Forgotpswd'
import Home from './pages/Home'
import PagenotFound from './pages/PagenotFound'
import PrivateRouter from './Router/PrivateRouter'
import AdminRouter from './Router/AdminRouter'
import AdminDashboard from './pages/Admin/AdminDashboard'

import CreateCategory from "./pages/Admin/CreateCategory"
import CreateProducts from './pages/Admin/CreateProducts'

import UserDashboard from './pages/User/Dashboard'

import Profile from './pages/User/Profile'
import ProductList from './pages/Admin/ProductList'
import UpdateProduct from './pages/Admin/UpdateProduct'
import Search from './pages/Search'
import './App.css'
import ProductDetails from './pages/ProductDetails'
import CategoryList from './pages/CategoryList'
const App = () => {
  
  return (
    <div>

      <Routes>
      <Route path="/product/:slug" element={<ProductDetails />} />
      <Route path="/search" element={<Search />} />
        <Route path='/register' element={ <Signup
              
            /> }></Route>
        <Route path='/login' element={<Signin></Signin>}
        >  {console.log('Rendering for /login')}</Route>
        <Route path='/dashboard' element={<PrivateRouter></PrivateRouter>}>
                 <Route path="user" element={<UserDashboard></UserDashboard>}></Route>
    
<Route path="user/profile" element={<Profile></Profile>}></Route>
          </Route>
          <Route path='/dashboard' element={<AdminRouter></AdminRouter>}>
          <Route path="admin" element={<AdminDashboard></AdminDashboard>}></Route> 
          <Route path="admin/create-category" element={<CreateCategory></CreateCategory>}></Route> 
          <Route path="admin/create-products" element={<CreateProducts></CreateProducts>}></Route> 
          <Route path="admin/productlist" element={<ProductList></ProductList>}></Route>
<Route path="admin/productlist/:slug" element={<UpdateProduct></UpdateProduct>}></Route>
        
          </Route>   
     
      <Route path='/categories/:slug' element={<CategoryList></CategoryList>}></Route>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/cart' element={<Cart></Cart>}></Route>
      <Route path='/forgotpassword' element={<Forgotpassword></Forgotpassword>}></Route>
      <Route path='*' element={<PagenotFound></PagenotFound>}></Route>
      </Routes>
      <div>
  
   
    </div>
    </div>
  )
}

export default App