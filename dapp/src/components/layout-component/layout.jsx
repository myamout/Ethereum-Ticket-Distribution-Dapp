import React from 'react';
import Title from '../title-component/title.jsx';
import PendTicket from '../pend-component/pend-ticket.jsx';
import BuyTicket from '../buy-component/buy-ticket.jsx';

export const Layout = () => (
  <div>
    <div className="row">
      <div className="col-12">
        <div className="center">
          <Title />
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-4">
        <div className="center">
          <PendTicket />
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-4">
        <div className="center">
          <BuyTicket />
        </div>
      </div>
    </div>
  </div>
)
