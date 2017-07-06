import React from 'react';

export default class PendTicket extends React.Component {
  constructor() {
    super();
    this.state = {
      address: '',
      price: '',
      key: '',
      createTicketUrl: '/api/pendTicket'
    };
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAddressChange(event) {
    this.setState({address: event.target.value.trim()});
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      let response = await fetch(`${this.state.createTicketUrl}?address=${this.state.address}`);
      let responseData = await response.json();
      this.setState({
        address: '',
        price: '',
        key: responseData.resp
      });
    } catch(error) {
      console.log(error);
    }
  }

  render() {
    const haveKey = this.state.key;
    return(
      <div>
        <h3> Reserve Your Ticket </h3>
        <input type="text" value={this.state.address} onChange={this.handleAddressChange} placeholder="Enter Your Ether Wallet Here" />
        <button type="button" onClick={this.handleSubmit}> Reserve Ticket </button>
        {haveKey != '' &&
          <h3> Your Ticket's Key Is: {haveKey} </h3>
        }
      </div>
    );
  }

}
