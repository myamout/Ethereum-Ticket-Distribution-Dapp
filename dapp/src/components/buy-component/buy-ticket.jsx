import React from 'react';

export default class BuyTicket extends React.Component {
  constructor() {
    super();
    this.state = {
      buyUrl:'/api/pay',
      address: '',
      key: '',
      paid: false
    };
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleKeyChange = this.handleKeyChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAddressChange(event) {
    this.setState({address: event.target.value.trim()});
  }

  handleKeyChange(event) {
    this.setState({key: event.target.value.trim()});
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      let response = await fetch(`${this.state.buyUrl}?address=${this.state.address}&key=${this.state.key}`);
      let responseData = await response.json();
      this.setState({
        address: '',
        key: '',
        paid: responseData.resp
      });
    } catch(error) {
      console.log(error);
    }
  }

  render() {
    const paidFor = this.state.paid;
    return(
       <div>
        <h3> Purchase Your Ticket </h3>
        <h5> You Won't Be Able To Buy Your Ticket Until The Venue Allows For Purchases </h5>
        <input type="text" value={this.state.address} onChange={this.handleAddressChange} placeholder="Enter Your Ether Wallet Address Here" />
        <input type="text" value={this.state.key} onChange={this.handleKeyChange} placeholder="Enter Your Ticket Key Here" />
        <button type="button" onClick={this.handleSubmit}> Purchase Ticket </button>
        {paidFor ? (
          <h3> Ticket Has Been Paid For! Enjoy The Show </h3>
        ) : (
          <h3> Ticket Has Not Been Paid For... </h3>
        )}
      </div>
    );
  }

}
