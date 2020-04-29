import React, {Component} from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css'
import testdata from './testdata';

import Header from './components/Header/Header';
import Items from './components/Items/Items';
import Stats from './components/Stats/Stats';
import Graph from './components/Graph/Graph';
import Settings from './components/Settings/Settings';
import Menu from './components/Menu/Menu';


class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: testdata,
      walletSaldo : 0.00,
      meze :  0.00,
      food : 0.00,
      varioussmall : 0.00,
      pharmacy : 0.00,
      animals : 0.00,
      gas : 0.00

    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.setWalletandCat = this.setWalletandCat.bind(this);
  }

   

  handleFormSubmit(newdata) {
    let storedata =  this.state.data.slice();
    storedata.push(newdata);  //tallentaa uuden datan listaan

    storedata.sort((a,b) => {   //jarjestaa listan uusin ensin jarjestykseen
      const aDate = new Date(a.date);
      const bDate = new Date(b.date);
      return bDate.getTime() - aDate.getTime();     
    });


    this.setState({
        data: storedata
    });
  }

  setWalletandCat(sum, eId) {
    // funktio Walletin saldon muuttamiseksi
    //lisaa Transactionista tulevan summan lompakoon
    //PaymentCatin napeista tuleva summa on negatiivinen
    
        
        let walletSaldo__old = this.state.walletSaldo;
        this.setState({ walletSaldo: (sum + walletSaldo__old) });
        this.setState({mezeSaldo: sum});
        
    
        console.log("lompakkosaldo; edellinen ja uusi ");
        console.log(walletSaldo__old);
        console.log(sum);  
    
    
    // siirtaa summan ko. maksuluokan state muuttujaan , jos summa on 
    // negatiivinen eli tulee PaymentCatin napeista
      if (sum<0) {
        let oldSaldo = this.state[eId];
        let paySum = ((sum*(-1)) + oldSaldo);
        this.setState( {[eId] : paySum} )
       }     
  }
  
 


  render() {


    return (

      

      <>
        <Router>          
          <div className="App" >   
          <Header />         
            <Route path="/" exact render={() => 
              <Items onFormSubmit={this.handleFormSubmit} setWallet={this.setWalletandCat} walletSaldo={this.state.walletSaldo} meze={this.state.meze} food={this.state.food} varioussmall={this.state.varioussmall} pharmacy={this.state.pharmacy} animals={this.state.animals} gas={this.state.gas}/>} />
            <Route path="/stats" render={() => <Stats data={this.state.data} />} />
            <Route path="/graph" component={Graph} />
            <Route path="/settings" component={Settings} />
            <Menu /> 
          </div>
        </Router>             
      </>
    );
  }
}


export default App;