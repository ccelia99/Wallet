import React from 'react';
import wallet from '../icons/icon-wallet.png';
import './Wallet.css';


class Wallet extends React.Component {
    render() {
      return (
        <div className="wallet">
          <img src={wallet} alt="" className="wallet__img" />
          <div className="wallet--total" >175.20</div>
        </div>
      );
    }
  }

  export default Wallet;