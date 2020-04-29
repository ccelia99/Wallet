import React, {Component, createRef} from 'react';
import Transaction from '../Transaction/Transaction';
import'./Items.css';
import PaymentCat from '../PaymentCat/PaymentCat';


class Items extends Component {

  constructor(props) {
    super(props);
    this.paymentcat = React.createRef()
    this.state = {
      
      transferSum : 0.00       
    };
  }

  

  
  render() {
    return (
      <div>
        <Transaction onFormSubmit={this.props.onFormSubmit}  setWallet={this.props.setWallet} walletSaldo={this.props.walletSaldo} meze={this.props.meze} food={this.props.food} varioussmall={this.props.varioussmall} pharmacy={this.props.pharmacy} animals={this.props.animals} gas={this.props.gas}  />
        <PaymentCat mezeSaldo={this.state.mezeSaldo} onFormSubmit={this.props.onFormSubmit.bind(this)} />
         
      </div> 
      );
    }
  }
  
  export default Items;