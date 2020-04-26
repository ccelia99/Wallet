import React from 'react';

import './Wallet.css';


class Wallet extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
        
            data : 0.00
        
    };
    // setChanged = setChanged.bind(this);
  }

  
  render() {
    return (
      <>
      <div className="wallet">         
        
        <div  className="wallet--saldo"> {parseFloat(this.state.data).toFixed(2) } </div>
        <p>Wallet : {this.props.data}</p>
        
      </div>
      
     
      </>
    );
  }
}
  export default Wallet;