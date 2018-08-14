import React, { Component } from 'react';
import { Carousel, Jumbotron, Grid, Row, Col, Image, Button } from 'react-bootstrap'

class Home extends React.Component {
  render() {
    return (
      <div>
        <Carousel>
          <Carousel.Item>
            <img src="/assets/peddle.png" width={900} height={500} alt="Loading page image" />
            <Carousel.Caption>
              <h1>Welcome to Peddle!</h1>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}

export default Home;