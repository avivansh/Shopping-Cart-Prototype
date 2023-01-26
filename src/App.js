import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { toast, ToastContainer } from "react-toastify";
import { Container, Row, Col } from "reactstrap";
import BuySection from "./Components/BuySection";
import Cart from "./Components/Cart";

const App = () => {
  const [cartItem, setCartItem] = useState([]);

  const addInCart = (item) => {
    const isAlreadyAdded = cartItem.findIndex(function (array) {
      return array.id === item.id;
    });

    if (isAlreadyAdded !== -1) {
      toast("already added in cart", {
        type: "error",
      });
    } else setCartItem([...cartItem, item]);
  };

  const buyNow = () => {
    setCartItem([]);

    toast("Purchase Complete", {
      type: "success",
    });
  };

  const removeItem = (itemToRemove) => {
    setCartItem(cartItem.filter((item) => item.id !== itemToRemove.id));
  };

  return (
    <Container fluid>
      <ToastContainer />
      <Row>
        <Col md="8">
          <BuySection addInCart={addInCart} />
        </Col>
        <Col md="4">
          <Cart cartItem={cartItem} removeItem={removeItem} buyNow={buyNow} />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
