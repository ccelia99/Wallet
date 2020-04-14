import React, {Component} from 'react';
import Header from '../Header/Header';
import Wallet from '../Wallet/Wallet';
import Transaction from '../Transaction/Transaction';
import PaymentCat from '../PaymentCat/PaymentCat';

function Items(props) {
    return (
      <div>
        <Header />
        <Wallet />
        <Transaction />
        <PaymentCat />
      </div> 
    );
  }
  
  export default Items;