import React from 'react';
import './Transaction.css';
import euro from '../icons/icon-euro.svg';
import wallet from '../icons/icon-wallet.png';

import food from '../icons/icon-food.svg';
import varioussmall from '../icons/icon-varioussmall.svg';
import pharmacy from '../icons/icon-pharmacy.svg';
import meze from '../icons/icon-meze.svg';
import animals from '../icons/icon-animals.svg';
import gas from '../icons/icon-gas.svg';


class Transaction extends React.Component {

  

  constructor(props) {
    super(props);
    this.state = {
        data: {
          sum : 0.00
                       
        }
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitWallet = this.handleSubmitWallet.bind(this); 
    
  }

  

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    

    this.setState( {
        data: {
            ...this.state.data,
            [name]: value
        }
    });
    
  }

  handleSubmitWallet(event) {
    event.preventDefault();
    console.log("laheta lomake");
    let data = Object.assign({}, this.state.data); //kopio datasta tyhjaan javascript olioon
    data.sum = parseFloat(data.sum);
    this.props.onFormSubmit(data);
    
    if (event.target.className === 'paymentcat__button') {
      this.props.setWallet(-data.sum);
      console.log("trans valittu")  ;
    }
    else {    
      this.props.setWallet(data.sum); 
    }
      }

  

  // render sisaltaa transaction-lomakkeen ja sen image-buttonit sen hyvaksymiseen; wallet saldoineen ylhaalla ja 
  // maksuluokat alapuolella
    render () {
      return (
        <>
        
        <form id='transaction' onSubmit={this.handleSubmitWallet}>
            <input type="image" src={wallet} alt="" className="wallet__img"  value={this.state.sum} onClick={this.handleSubmitWallet} />  
         
          <div className="transaction" >
              <input type="number" name="sum" id="sum" step="0.01"  onChange={this.handleInputChange} />
              <img src={euro} alt="" className="euro" />
          </div>

          <div className="paymentcat">
            <div className="paymentcat__row">
              <input type="image" id="food" className="paymentcat__button" src={food} alt="" value={this.state.sum} onClick={this.handleSubmitWallet} />
              <input type="image" id="varioussmall" className="paymentcat__button" src={varioussmall} alt="" value={this.state.sum} onClick={this.handleSubmitWallet} />
            </div>
            <div className="paymentcat__row">
              <input type="image" id="pharmacy" className="paymentcat__button" src={pharmacy} alt=""  value={this.state.sum} onClick={this.handleSubmitWallet} />
              <input type="image" id="meze" className="paymentcat__button" src={meze} alt="" value={this.state.sum} onClick={this.handleSubmitWallet} />
            </div>
            <div className="paymentcat__row"> 
              <input type="image" id="animals" className="paymentcat__button" src={animals} alt="" value={this.state.sum} onClick={this.handleSubmitWallet} />
              <input type="image" id="gas" className="paymentcat__button" src={gas} alt="" value={this.state.sum} onClick={this.handleSubmitWallet} />
            </div>
			    </div>
        
        </form>  
        </> 
       
       );
    }
  }
  
  export default Transaction;