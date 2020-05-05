import React, {Component, } from 'react';
import Transaction from '../Transaction/Transaction';
import'./Items.css';



function Items(props) {
 
  
  return (
    <div>
    <Transaction setWallet={props.setWallet} onFormSubmit={props.onFormSubmit} walletData={props.walletData}  />           
    </div> 
  );
    
}
  
  export default Items;