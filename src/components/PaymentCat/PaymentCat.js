import React from 'react';
import './PaymentCat.css';
import food from '../icons/icon-food.svg';
import varioussmall from '../icons/icon-varioussmall.svg';
import pharmacy from '../icons/icon-pharmacy.svg';
import meze from '../icons/icon-meze.svg';
import animals from '../icons/icon-animals.svg';
import gas from '../icons/icon-gas.svg';

class PaymentCat extends React.Component {
    render() {
        return (
        <div className="paymentcat">
            <div className="paymentcat__row">
            <div className="Food"> <img src={food} alt=""/></div>
            <div className="Varioussmall"> <img src={varioussmall} alt="" /></div>
            </div>
            <div className="paymentcat__row">
            <div className="Pharmacy"> <img src={pharmacy} alt="" /></div>
            <div className="Meze"> <img src={meze} alt="" /></div>
            </div>
            <div className="paymentcat__row">
            <div className="Animals"><img src={animals} alt="" /></div>
            <div className="Gas"><img src={gas} alt="" /></div>
            </div>
        </div>
        );
    }
}
export default PaymentCat;
  
    
  