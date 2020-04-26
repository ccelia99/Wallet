import React from 'react';
import './Transaction.css';
import euro from '../icons/icon-euro.svg';

import wallet from '../icons/icon-wallet.png';





class Transaction extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        data: {
          sum : 0.00,
          wallet__saldo : 0.00                      
        }
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
    
   
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
  handleSubmit(event) {
    event.preventDefault();
    console.log("laheta lomake");
    let data = Object.assign({}, this.state.data); //kopio datasta tyhjaan javascript olioon
    data.sum = parseFloat(data.sum);
    this.props.onFormSubmit(data);
    
    this.setState( {
      ...this.state.data,
      data,wallet__saldo: data.sum
      });
    }

  
    
    render () {
      return (
        
        <form id='transaction' onSubmit={this.handleSubmit}>
           
        <div  className="wallet--saldo"> {parseFloat(this.state.data.saldo).toFixed(2) } </div>
          <input type="image" src={wallet} alt="" name="wallet__img" onClick={this.handleSubmit} /> 
           
          <div className="transaction" >
              <input type="number" name="sum" id="sum" step="0.01" value={this.state.data.sum} onChange={this.handleInputChange} />
              <img src={euro} alt="" className="euro" />
          </div>
        </form>  
         
       
       );
    }
  }
  
  export default Transaction;