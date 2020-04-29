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
          };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); 
    
  }
  
  
  handleInputChange(event) {
// tallennetaan summa ja paivamaara Stats-sivulla esitettavaan listaan

    event.preventDefault();  //estaa kentan hyvaksymisen enterilla
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;  

    if(value>0) {

      let timestamp = new Date(); //luodaan timestap ko. paivalle
      let todayDate = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(timestamp)

      this.setState( {
          data: {
              ...this.state.data,
              [name]: value,
              date : todayDate
          }
      }); 
    }
    else {
      alert();
    }
  }
    
 
  handleSubmit(event) {
    
    event.preventDefault();
    console.log("laheta lomake");

    let paymenCatType = event.target.id; //paymentCategoryn tyyppi eventista
    console.log(paymenCatType);

    let data = Object.assign({}, this.state.data,  {category: paymenCatType } ); //kopio datasta tyhjaan javascript olioon & tyyppi mukaan
    this.props.onFormSubmit(data); //siirretaan data Items-tasolle

    data.sum = parseFloat(data.sum);

    if(data.sum>0) {
      let eName = event.target.className;     
        if (eName === 'paymentcat__button') {
          this.props.setWallet(-data.sum, paymenCatType);
        }
        else {    
          this.props.setWallet(data.sum, paymenCatType ); 
        }
      }
      else {
        alert();
      }
    }

  

  // render sisaltaa transaction-lomakkeen ja sen image-buttonit sen hyvaksymiseen; wallet saldoineen ylhaalla ja 
  // maksuluokat alapuolella
    render () {
      
      return (        
        <>
          <form id='transaction' onSubmit={this.handleSubmit}>
            <input type="image" id="wallet" src={wallet} alt="" className="wallet__img"  value={this.state.sum} onClick={this.handleSubmit} />  
            <label for="wallet__img" className="wallet__saldo">{parseFloat(this.props.walletSaldo).toFixed(2) }</label>

          <div className="transaction" >
              <input type="number" name="sum" required id="sum" step="0.01"  min="0.01" onChange={this.handleInputChange} />
              <img src={euro} alt="" className="euro" />
          </div>

          <div className="paymentcat">
            <div className="paymentcat__row">
              <input type="image" id="food" className="paymentcat__button" src={food} alt="" value={this.state.sum} onClick={this.handleSubmit} />
              <label for="paymentcat__button" className="payment__saldo">{parseFloat(this.props.food).toFixed(2) }</label>
              
              <input type="image" id="varioussmall" className="paymentcat__button" src={varioussmall} alt="" value={this.state.sum} onClick={this.handleSubmit} />
              <label for="paymentcat__button" className="payment__saldo">{parseFloat(this.props.varioussmall).toFixed(2) }</label>
            </div>
            <div className="paymentcat__row">
              <input type="image" id="pharmacy" className="paymentcat__button" src={pharmacy} alt=""  value={this.state.sum} onClick={this.handleSubmit} />
              <label for="paymentcat__button" className="payment__saldo">{parseFloat(this.props.pharmacy).toFixed(2) }</label>

              <input type="image" id="meze" className="paymentcat__button" src={meze} alt="" value={this.state.sum} onClick={this.handleSubmit} />
              <label for="paymentcat__button" className="payment__saldo">{parseFloat(this.props.meze).toFixed(2) }</label>
            </div>
            <div className="paymentcat__row"> 
              <input type="image" id="animals" className="paymentcat__button" src={animals} alt="" value={this.state.sum} onClick={this.handleSubmit} />
              <label for="paymentcat__button" className="payment__saldo">{parseFloat(this.props.animals).toFixed(2) }</label>

              <input type="image" id="gas" className="paymentcat__button" src={gas} alt="" value={this.state.sum} onClick={this.handleSubmit} />
              <label for="paymentcat__button" className="payment__saldo">{parseFloat(this.props.gas).toFixed(2) }</label>
            </div>
			    </div>
        
        </form>  
        </> 
       
       );
    }
  }
  
  export default Transaction;