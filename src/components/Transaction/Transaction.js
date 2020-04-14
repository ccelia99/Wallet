import React from 'react';
import './Transaction.css';
import euro from '../icons/icon-euro.svg';

class Transaction extends React.Component {
    render () {
      return (
        <div >
          <form className="transaction">
            <input type="number" name="transbox" step="0.01" />
            <img src={euro} alt="" className="euro" />
          </form>
          
        </div>
       );
    }
  }
  export default Transaction;