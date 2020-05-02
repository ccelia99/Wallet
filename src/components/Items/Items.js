import React, {Component, } from 'react';
import Transaction from '../Transaction/Transaction';
import'./Items.css';



class Items extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
      transferSum : 0.00       
    };
  }

  

  
  render() {
    return (
      <div>
        <Transaction onFormSubmit={this.props.onFormSubmit}  setWallet={this.props.setWallet} walletData={this.props.walletData} />     
         
      </div> 
      );
    }
  }
  
  export default Items;