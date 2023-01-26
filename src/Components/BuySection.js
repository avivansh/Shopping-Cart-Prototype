import React, { useEffect, useState } from "react";
import Axios from "axios";
import { faker } from "@faker-js/faker";
import { Container, Col, Row } from "reactstrap";
import { v4 } from "uuid";
import CartItem from "./CartItem";

const API_KEY = "rsRRkPFSLVnxyjUEimu2U22LjN5WXCZaoGUo2jXorebaTTu664w12OMM";
const URI = "https://api.pexels.com/v1/search?query=bottles&per_page=6&page=1";

const BuySection = ({ addInCart }) => {
  const [product, setProduct] = useState([]);

  const fetchPhotos = async () => {
    const { data } = await Axios.get(URI, {
      headers: {
        Authorization: API_KEY,
      },
    });

    const { photos } = data;

    const allProduct = photos.map((photo) => ({
      smallImage: photo.src.medium,
      tinyImage: photo.src.tiny,
      productName: faker.commerce.productName(),
      productPrice: faker.commerce.price(),
      id: v4(),
    }));

    console.log(allProduct);

    setProduct(allProduct);
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <Container fluid>
      <h1 className="text-success text-center"> Buy Page</h1>
      <Row>
        {product.map((product) => (
          <Col md={4} key={product.id}>
            <CartItem addInCart={addInCart} product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BuySection;
