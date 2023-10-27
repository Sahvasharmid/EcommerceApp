import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";

import {BsFillCartCheckFill} from 'react-icons/bs'
import { AuthContextProvider } from "../../utils/Authcontext";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { Badge } from "antd";
import { useCart } from "../../utils/CartContext";
const Navbar = () => {
  const [auth,setAuth]=useContext(AuthContextProvider)
  const[cart,setCart]=useCart()
  const categories = useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  
  };
  return (
    <>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
  <Link to="/" className="navbar-brand">
              🛒 Ecommerce App
            </Link>
   
     
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
         
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
           
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <NavLink to="/" className="nav-link underline-animation">
                  Home
                </NavLink>
              </li>
              {!auth?.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link underline-animation">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link underline-animation">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle underline-animation"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none" }}
                    >
                      {auth?.user?.username}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin": "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item "
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
           
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle underline-animation"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                 
                
                  
                  {categories?.map((c) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/categories/${c.slug}`}
                      >
                        {c.categoryname}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

            
           
              <SearchInput />
              <li className="nav-item">
           <Badge count={cart?.length} showZero>
           <NavLink to="/cart" className="nav-link underline-animation">
        
                 <BsFillCartCheckFill></BsFillCartCheckFill>
                </NavLink>
                </Badge>

              
              </li>
            </ul>
          </div>
        </div>
      
      </nav>
    </>
  );
};

export default Navbar;