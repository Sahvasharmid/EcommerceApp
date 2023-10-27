import React, { useContext } from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../utils/CartContext'
import { useNavigate } from 'react-router-dom'
import { AuthContextProvider } from '../utils/Authcontext'

const Cart = () => {
  const[cart,setCart]=useCart()
  const [auth, setAuth] = useContext(AuthContextProvider)

  const navigate=useNavigate()
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
        <Layout>
            <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.username}`}
            </h2>
            <h4 className="text-center">
              {cart?.length
                ? `You Have ${cart.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : " Your Cart Is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
          <div className='d-flex flex-wrap'>
{cart.map((item)=><>

  <div key={item._id} class="card m-2" style={{width:"18rem"}}>
  <img src={`http://localhost:8000/getproductphoto/${item._id}`} class="card-img-top border"   style={{ width: "100%", height: "300px", objectFit: "contain" }}  alt={item.name}></img>
  <div class="card-body">
    <h5 class="card-title">{item.name}</h5>
    <p class="card-text">{item.description.substring(0, 30)}...
    </p>
    <p class="card-text">shipping:{item.shipping?"yes":"no"}</p>
    <p class="card-text">price:${item.price}</p>
    <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(item._id)}
                  >
                    Remove
                  </button>
    </div>
    </div>
   </>
    )}
    </div>
    </div>
      <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total : {totalPrice()} </h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Plase Login to checkout
                  </button>
                )}
              </div>
            )}
            </div>
          </div>
        </div>
        </Layout>
    </div>
  )
}

export default Cart