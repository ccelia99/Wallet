import React, {Component, createRef} from 'react';
import Transaction from '../Transaction/Transaction';
import'./Items.css';
import PaymentCat from '../PaymentCat/PaymentCat';


class Items extends Component {

  constructor(props) {
    super(props);
    this.paymentcat = React.createRef()
    this.state = {
      walletSaldo : 0.00,
      transferSum : 0.00       
    };
    this.setWallet = this.setWallet.bind(this);
    
  }

  setWallet(sum) {
// funktio Walletin saldon muuttamiseksi
//Vahentaa Transactionista tulevan summan lompakosta

    
    let walletSaldo__old = this.state.walletSaldo;
    this.setState({ walletSaldo: (sum + walletSaldo__old) });
    this.setState({transferSum: sum});

    console.log("lompakkos vanha, uusi ja siirtosumma");
    console.log(walletSaldo__old);
    console.log(sum);  


    //  siirtaa summan PaymentCat-luokan funktion kasiteltavaksi, jos summa on 
    // negatiivinen
    if (sum<0) {
    this.paymentcat.current.setTransActTotal(-sum);
    }

   
  } 

  render() {
    return (
      <div>
        <div  className="walletSaldo">{parseFloat(this.state.walletSaldo).toFixed(2) }</div>
        <Transaction onFormSubmit={this.props.onFormSubmit}  setWallet={this.setWallet} />
        <PaymentCat transferValue={this.props.sum}  ref={this.paymentcat} onFormSubmit={this.props.onFormSubmit.bind(this)} />
        
      </div> 
      );
    }
  }
  
  export default Items;