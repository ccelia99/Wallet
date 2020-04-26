function PaymentCat(props) {
    return (
        <div className="paymentcat">
          <div className="paymentcat__row">
            <div className="food"> <img src={food} alt=""/>FOOD </div>
            <div className="varioussmall"> <img src={varioussmall} alt="" />varioussmall</div>
          </div>
          <div className="paymentcat__row">
            <div className="pharmacy"> <img src={pharmacy} alt="" />pharmacy</div>
            <div className="meze"> <img src={meze} alt="" />meze</div>
          </div>
          <div className="paymentcat__row">
            <div className="animals"><img src={animals} alt="" />animals</div>
            <div className="gas"><img src={gas} alt="" />gas</div>
          </div>
        </div>
      );
    }
  }

  <HighlightOffIcon><div className="actionCard__delete"><HighlightOffIcon style={{ color: "#fff"}} /></div></HighlightOffIcon>

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

  //  
  <button type="submit" style={background-color: #rgba(255,255,255,0.0) border: "none" } id="wallet__img" onclick="jep"><img src={wallet} /></button>
  
  <button type="submit" onClick={this.myFunction} ><img src={wallet}/>{parseFloat(this.state.data.saldo).toFixed(2) }</button>

  handleSubmit(event) {
    event.preventDefault();
    console.log("laheta lomake");
    let data = Object.assign({}, this.state.data);
    data.sum = parseFloat(data.sum);
    this.props.onFormSubmit(data);
  }
  this.handleSubmit = this.handleSubmit.bind(this);
  onSubmit={this.handleSubmit}

  <input type="image" src={wallet} alt="" name="wallet__img" onClick={SubmitForm} />  
  <button name="wallet__img" value='wallet'> <img src={wallet} alt="" > </button>

// Parent.jsx

import React, { Component } from 'react';
import Child from './Child';

class Parent extends Component {
  constructor(props) {
    super(props);
    this.setChanged = this.setChanged.bind(this);
    this.state = {
      changed: false
    }
  }

  // Function to set the parent's state
  setChanged() {
    this.setState({ changed: true });
  }

  render() {
    return <Child setChanged={this.setChanged} />
  }
}

// Child.js

import React from 'react';

function Child(props) {
  return (
    // When clicked, parent's setChanged function is called
    <div onClick={() => props.setChanged()} />
  )
}