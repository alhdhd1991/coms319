import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import items from "./selected_products_SHORT.json";
const Shop = () => {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [showCart, setShowCart] = useState(false); // Add this line
  const [showPayment, setShowPayment] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);
  const [customer, setCustomer] = useState({
    fN: "",
    e: "",
    cN: "",
    ad: "",
    ad2: "",
    ci: "",
    st: "",
    zc: "",
  });
  const addToCart = (el) => {
    setCart([...cart, el]);
  };

  const removeFromCart = (el) => {
    let itemFound = false;
    const updatedCart = cart.filter((cartItem) => {
      if (cartItem.id === el.id && !itemFound) {
        itemFound = true;
        return false;
      }
      return true;
    });
    if (itemFound) {
      setCart(updatedCart);
    }
  };

  const cartItems = cart.map((el) => (
    <div key={el.id}>
      <img className="img-fluid" src={el.image} width={30} />
      {el.title}${el.price}
    </div>
  ));

  useEffect(() => {
    total();
  }, [cart]);

  const total = () => {
    let subTotal = 0;
    for (let i = 0; i < cart.length; i++) {
      subTotal += cart[i].price;
    }
    const taxRate = 0.1; // 10% tax rate
    const tax = subTotal * taxRate;
    const totalVal = subTotal + tax;
    setCartTotal(totalVal);
  };

  function howManyofThis(id) {
    let hmot = cart.filter((cartItem) => cartItem.id === id);
    return hmot.length;
  }

  function handleCheckout() {
    setShowCart(!showCart);
    setShowPayment(!showPayment);
  }
  useEffect(() => {
    setFilteredItems(
      items.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery]);

  const listItems = filteredItems.map((el) => (
    // PRODUCT
    <div className="row border-top border-bottom" key={el.id}>
      <div className="row main align-items-center">
        <div className="col-2">
          <img className="img-fluid" src={el.image} />
        </div>
        <div className="col">
          <div className="row text-muted">{el.title}</div>
          <div className="row">{el.category}</div>
        </div>
        <div className="col">
          <button
            type="button"
            variant="light"
            onClick={() => removeFromCart(el)}
          >
            {" "}
            -{" "}
          </button>{" "}
          <button type="button" variant="light" onClick={() => addToCart(el)}>
            {" "}
            +{" "}
          </button>
        </div>
        <div className="col">
          ${el.price} <span className="close">&#10005;</span>
          {howManyofThis(el.id)}
        </div>
      </div>
    </div>
  ));

  function ConfirmationView(props) {
    // Redact first 12 digits of credit card number
    const redactedCardNumber = "************" + props.setCustomer.cN.slice(12);
    return (
      <div>
        <h2>Thank you for your purchase!</h2>

        <h3>Order Details:</h3>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <img src={item.image} alt={item.title} height={50} />
              {item.title} - ${item.price}
            </li>
          ))}
        </ul>
        <p>Total: ${cartTotal}</p>
        <h3>User Information:</h3>
        <ul>
          <li>Name: {props.setCustomer.fN}</li>
          <li>Email: {props.setCustomer.e}</li>
          <li>Card Number: {redactedCardNumber}</li>
          <li>Address: {props.setCustomer.ad}</li>
          <li>address2: {props.setCustomer.ad2}</li>
          <li>State: {props.setCustomer.st}</li>
          <li>City: {props.setCustomer.ci}</li>
          <li>zipCode: {props.setCustomer.zc}</li>
        </ul>
        <button onClick={() => window.location.reload()}>Back to Browse</button>
      </div>
    );
  }
  const PaymentForm = () => {
    const usStates = [
      { name: "Alabama", code: "AL" },
      { name: "Alaska", code: "AK" },
      { name: "Arizona", code: "AZ" },
      { name: "Arkansas", code: "AR" },
      { name: "California", code: "CA" },
      { name: "Colorado", code: "CO" },
      { name: "Connecticut", code: "CT" },
      { name: "Delaware", code: "DE" },
      { name: "Florida", code: "FL" },
      { name: "Georgia", code: "GA" },
      { name: "Hawaii", code: "HI" },
      { name: "Idaho", code: "ID" },
      { name: "Illinois", code: "IL" },
      { name: "Indiana", code: "IN" },
      { name: "Iowa", code: "IA" },
      { name: "Kansas", code: "KS" },
      { name: "Kentucky", code: "KY" },
      { name: "Louisiana", code: "LA" },
      { name: "Maine", code: "ME" },
      { name: "Maryland", code: "MD" },
      { name: "Massachusetts", code: "MA" },
      { name: "Michigan", code: "MI" },
      { name: "Minnesota", code: "MN" },
      { name: "Mississippi", code: "MS" },
      { name: "Missouri", code: "MO" },
      { name: "Montana", code: "MT" },
      { name: "Nebraska", code: "NE" },
      { name: "Nevada", code: "NV" },
      { name: "New Hampshire", code: "NH" },
      { name: "New Jersey", code: "NJ" },
      { name: "New Mexico", code: "NM" },
      { name: "New York", code: "NY" },
      { name: "North Carolina", code: "NC" },
      { name: "North Dakota", code: "ND" },
      { name: "Ohio", code: "OH" },
      { name: "Oklahoma", code: "OK" },
      { name: "Oregon", code: "OR" },
      { name: "Pennsylvania", code: "PA" },
      { name: "Rhode Island", code: "RI" },
      { name: "South Carolina", code: "SC" },
      { name: "South Dakota", code: "SD" },
      { name: "Tennessee", code: "TN" },
      { name: "Texas", code: "TX" },
      { name: "Utah", code: "UT" },
      { name: "Vermont", code: "VT" },
      { name: "Virginia", code: "VA" },
      { name: "Washington", code: "WA" },
      { name: "West Virginia", code: "WV" },
      { name: "Wisconsin", code: "WI" },
      { name: "Wyoming", code: "WY" },
    ];
    const checkValidity = (form) => {
      let isValid = true;
      for (let i = 0; i < form.elements.length; i++) {
        const element = form.elements[i];
        if (
          element.tagName.toLowerCase() === "input" ||
          element.tagName.toLowerCase() === "select"
        ) {
          if (!element.validity.valid) {
            // updated to use the validity property
            isValid = false;
            break;
          }
        }
      }
      return isValid;
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const form = e.target;
      if (checkValidity(form)) {
        setCustomer({
          fN: form.fullname.value,
          e: form.email.value,
          cN: form.cardNumber.value,
          ad: form.address.value,
          ad2: form.address2.value,
          ci: form.city.value,
          st: form.state.value,
          zc: form.zipCode.value,
        });

        const root = document.getElementById("root");
        // If all fields are valid, render the confirmation view
        const element = (
          <ConfirmationView
            setCustomer={{
              fN: form.fullname.value,
              e: form.email.value,
              cN: form.cardNumber.value,
              ad: form.address.value,
              ad2: form.address2.value,
              ci: form.city.value,
              st: form.state.value,
              zc: form.zipCode.value,
            }}
          />
        );
        ReactDOM.render(element, root);
      } else {
        alert("Invalid form data");
      }
    };
    return (
      <div className="payment-form">
        <h3>Payment Information</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              name="fullname"
              className="form-control fullname"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              className="form-control"
              name="cardNumber"
              id="cardNumber"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
            />
          </div>
          <div className="form-group">
            <label htmlFor="address2">Address 2</label>
            <input
              type="text"
              className="form-control"
              id="address2"
              name="address2"
            />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="city">City</label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="state">State</label>
              <select id="state" className="form-control" name="state" required>
                <option value="">Choose...</option>
                {usStates.map((state, index) => (
                  <option key={index} value={state.code}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="zipCode">Zip Code</label>
              <input
                type="text"
                className="form-control"
                id="zipCode"
                name="zipCode"
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Order
          </button>
        </form>
      </div>
    );
  };
  return (
    <div>
      STORE SE/ComS319
      <div className="card">
        <div className="row">
          {/* HERE, IT IS THE SHOPING CART */}
          <div className="col-md-8 cart">
            <div className="title">
              <div className="row">
                <div className="col">
                  <div>
                    <div>
                      <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        style={{ display: "inline-block", marginRight: "10px" }}
                      />
                      <button
                        onClick={() =>
                          console.log("Search query:", searchQuery)
                        }
                        style={{
                          display: "inline-block",
                          marginRight: "100px",
                        }}
                      >
                        Search
                      </button>{" "}
                      <button
                        onClick={handleCheckout}
                        style={{ display: "inline-block" }}
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                  <h4>
                    <b>319 Shopping Cart</b>
                  </h4>
                </div>
                <div className="col align-self-center text-right text-muted">
                  Products selected {cart.length}
                </div>
              </div>
            </div>
            <div>{listItems}</div>
          </div>
          <div className="float-end">
            {showCart && (
              <div>
                <h2>Cart Items:</h2>
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      borderBottom: "1px solid black",
                      paddingBottom: "10px",
                    }}
                  >
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            )}
            <p className="mb-0 me-5 d-flex align-items-center">
              <span className="small text-muted me-2 fw-bold">
                <strong>Order total (including tax):</strong>
              </span>
              <span className="lead fw-normal">${cartTotal}</span>
            </p>
          </div>
          <div>{showPayment && <PaymentForm />}</div>
        </div>
      </div>
    </div>
  );
};
export default Shop;
