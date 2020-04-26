import React, {Component} from 'react';
import Transaction from '../Transaction/Transaction';
import PaymentCat from '../PaymentCat/PaymentCat';


class Items extends Component {

  constructor(props) {
    super(props);
    this.state = {
       
    };
  }

 

  render() {
    return (
      <div>
        
        <Transaction onFormSubmit={this.props.onFormSubmit}  />
        <PaymentCat />
      </div> 
      );
    }
  }
  
  export default Items;