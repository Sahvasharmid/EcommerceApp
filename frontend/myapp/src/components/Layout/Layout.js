import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import {Helmet} from "react-helmet";


       const Layout = ({children,description,keywords,author,title}) => {
        return(
            <>
              <Helmet>
                <meta charSet="utf-8" />
             
  <meta name="description" content={description}/>
  <meta name="keywords" content={keywords}/>
  <meta name="author" content={author}/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <title>{title}</title>
               
            </Helmet>
      <Navbar /> 
      <main  style={{ minHeight: "70vh" }}>
      {children}
      </main>
     
      <Footer />
    </>
  );
        }
            Layout.defaultProps={
              title:"Ecommerce App-shop now",
              keywords:"products,lease",
              author:"sahva"
            }

export default Layout;