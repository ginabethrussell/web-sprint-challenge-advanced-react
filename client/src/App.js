import React, { useState } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import PlantList from "./components/PlantList";
import ShoppingCart from "./components/ShoppingCart";
import CheckoutForm from "./components/CheckoutForm";
import useForm from './hooks/useForm';
import useLightMode from './hooks/useLightMode';
import sun from './sun.png';
import moon from './moon.png';

import "./App.css";

const initialSearchTerm = {searchTerm: ''};
function App() {
  // array of plants that have been added to the cart
  const [cart, setCart] = useState([]);
  const [searchTerm, handleChange] = useForm(initialSearchTerm);
  const [lightMode, toggleMode] = useLightMode();

  // add a plant to the cart
  const addToCart = (plant) => {
    setCart([...cart, plant]);
  };

  // remove a plant from the cart
  const removeFromCart = (plant) => {
    setCart(cart.filter((p) => p.id !== plant.id));
  };

  return (
    <div className={lightMode? "light-mode App-wrapper": 'App-wrapper'}>
      <Router>
        <nav className="container">
          <h1>
            React Plants <span role="img">🌿</span>
          </h1>
          
          <input className='search-input' type='text'
            name='searchTerm'
            placeholder='...search'
            value={searchTerm.searchTerm} 
            onChange={(e) => handleChange('searchTerm', e.target.value )}/>
          <ul className="steps">
            <li>
              <NavLink exact to="/">
                Plants
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart">
                Cart
                <span className="cart-badge">
                  {cart.length > 0 && cart.length}
                </span>
              </NavLink>
            </li>
            <li className='toggle'>
              <div className='light-mode_toggle'>
                <div onClick={(e) => {
                  e.preventDefault();
                  toggleMode();
                }}
                className={lightMode? 'toggle toggled': 'toggle'}>
                  <span id='icon'><img width='25px' src={
                    lightMode? sun: moon}/></span>
              </div>
              </div>
            </li>
          
          </ul>
        </nav>
        <Route
          exact
          path="/"
          render={() => <PlantList searchTerm={searchTerm.searchTerm} addToCart={addToCart} />}
        />
        <Route
          path="/cart"
          render={(props) => (
            <ShoppingCart
              {...props}
              cart={cart}
              removeFromCart={removeFromCart}
            />
          )}
        />
        <Route path="/checkout" component={CheckoutForm} />
      </Router>
    </div>
  );
}

export default App;
