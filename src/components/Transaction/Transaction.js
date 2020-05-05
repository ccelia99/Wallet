import React from 'react';
import { v4 as uuidv4 } from 'uuid';

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
          sum : 0.00,
          date : ""
      }
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);     
  }
 

  
  handleInputChange(event) {
// tallennetaan transaction-kentasta tuleva tapahtuma state-muuttujaan

    event.preventDefault(); 
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    

    if ( value>0 )  { //tarkistetaan, ettei kayttaja syota negatiivisia lukuja tai o:aa

    //luodaan timestap ko. paivalle ja tallennetaan se state-muuttujaan date
    let todayDate = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(new Date())

    this.setState( {
      data: {
          ...this.state.data,
          sum : parseFloat(value),
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
    const target = event.target;  
    let paymenCatType = target.id;              //paymentCategoryn tyyppi eventista; maksuluokka vai wallet__img
    let targetClassName = target.className;     //maksuluokan nimi

    let data = Object.assign({}, this.state.data,  {category: paymenCatType } ); //kopio datasta tyhjaan javascript olioon & tyyppi mukaan
    data.id = data.id ? data.id : uuidv4();     //lisataan yksilollinen key-tunniste jokaiselle uudelle tapahtumalle
    this.props.onFormSubmit(data);              //siirretaan data Items-tason kautta App:iin 

    this.props.setWallet(targetClassName, paymenCatType, this.state.data.sum); //siirretaan maksuluokka, luokan nimen ja maksetun summa App:iin
   
  }

  // render sisaltaa transaction-lomakkeen ja sen image-buttonit sen hyvaksymiseen; wallet saldoineen ylhaalla ja 
  // maksuluokat alapuolella
    render () {

      
      
      return (        
        <>
          <form id='transaction' onSubmit={this.handleSubmit}>
           
            <input type="image" id="wallet" src={wallet} alt="" className="wallet__img"  value={this.state.sum} onClick={this.handleSubmit} />  
      <label htmlFor="wallet__img" className="wallet__saldo">{parseFloat(this.props.walletData.walletSaldo).toFixed(2)}</label>

            <div className="transaction" >
                <input type="number" name="sum" required id="sum" step="0.01"  min="0.01" onChange={this.handleInputChange} />
                <img src={euro} alt="" className="euro" />
            </div>
            

          <div className="paymentcat">
            <div className="paymentcat__row">
              <div className="paymentcat__item">
                <label htmlFor="paymentcat__button" className="payment__name">Food</label>
                <input type="image" id="food" className="paymentcat__button" src={food} alt="" value={this.state.sum} onClick={this.handleSubmit} onMouseOver={e => console.log(e)} />
                <label htmlFor="paymentcat__button" className="payment__saldo">{parseFloat(this.props.walletData.food).toFixed(2) }</label>
              </div>

              <div className="paymentcat__item">
                <label htmlFor="paymentcat__button" className="payment__name">Various Small</label>
                <input type="image" id="varioussmall" className="paymentcat__button" src={varioussmall} alt="" value={this.state.sum} onClick={this.handleSubmit} />
                <label htmlFor="paymentcat__button" className="payment__saldo">{parseFloat(this.props.walletData.varioussmall).toFixed(2) }</label>
              </div>
            </div>

            <div className="paymentcat__row">
              <div className="paymentcat__item">
                <label htmlFor="paymentcat__button" className="payment__name">Pharmacy</label>
                <input type="image" id="pharmacy" className="paymentcat__button" src={pharmacy} alt=""  value={this.state.sum} onClick={this.handleSubmit} />
                <label htmlFor="paymentcat__button" className="payment__saldo">{parseFloat(this.props.walletData.pharmacy).toFixed(2) }</label>
              </div>

              <div className="paymentcat__item">
                <label htmlFor="paymentcat__button" className="payment__name">Meze</label>
                <input type="image" id="meze" className="paymentcat__button" src={meze} alt="" value={this.state.sum} onClick={this.handleSubmit} />
                <label htmlFor="paymentcat__button" className="payment__saldo">{parseFloat(this.props.walletData.meze).toFixed(2) }</label>
              </div>
            </div>

            <div className="paymentcat__row"> 
              <div className="paymentcat__item">
                <label htmlFor="paymentcat__button" className="payment__name">Animals</label>
                <input type="image" id="animals" className="paymentcat__button" src={animals} alt="" value={this.state.sum} onClick={this.handleSubmit} />
                <label htmlFor="paymentcat__button" className="payment__saldo">{parseFloat(this.props.walletData.animals).toFixed(2) }</label>
              </div>

              <div className="paymentcat__item">
                <label htmlFor="paymentcat__button" className="payment__name">Gas</label>
                <input type="image" id="gas" className="paymentcat__button" src={gas} alt="" value={this.state.sum} onClick={this.handleSubmit} />
                <label htmlFor="paymentcat__button" className="payment__saldo">{parseFloat(this.props.walletData.gas).toFixed(2) }</label>
              </div>
              </div>
          </div>
			           
        </form>  
        </> 
       
       );
    }
  }
  
  export default Transaction;