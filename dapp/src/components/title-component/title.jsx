import React from 'react';

export default class Title extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      price: '',
      titleUrl: '/api/name',
      priceUrl: '/api/price'
    };
    this.getTitle = this.getTitle.bind(this);
    this.getPrice = this.getPrice.bind(this);
  }

  componentDidMount() {
    this.getTitle();
    this.getPrice();
  }

  async getTitle() {
    try {
      let response = await fetch(this.state.titleUrl);
      let responseData = await response.json();
      this.setState({
        title: responseData.resp
      });
    } catch(error) {
      console.log(error);
    }
  }

  async getPrice() {
    try {
      let response = await fetch(this.state.priceUrl);
      let responseData = await response.json();
      this.setState({
        price: responseData.resp
      });
    } catch(error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <h1> {this.state.title} </h1>
        <h4> Event Price In Ether: {this.state.price} ETH </h4>
      </div>
    );
  }

}
