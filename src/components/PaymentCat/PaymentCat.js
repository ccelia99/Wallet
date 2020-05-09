import React, {useState} from 'react';

import euro from '../icons/icon-euro.svg';
import wallet from '../icons/icon-wallet.png';
import food from '../icons/icon-food.svg';
import varioussmall from '../icons/icon-varioussmall.svg';
import pharmacy from '../icons/icon-pharmacy.svg';
import meze from '../icons/icon-meze.svg';
import animals from '../icons/icon-animals.svg';
import gas from '../icons/icon-gas.svg';

function PaymentCat(props){
    const [pressed, setPressed] = useState(false);
    const classValue = pressed ? "paymentCat__img paymentCat__img--pressed" : "paymentCat__img";
    return(
        <div className="wallet">
            <img 
                src={wallet} 
                alt="" 
                className={classValue}
                onClick={props.onClick}
                onPointerDown={() => setPressed(true)}
                onPointerUp={() => setPressed(false)}
            />
        </div>
    );
}

export default PaymentCat;