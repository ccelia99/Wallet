import React, {Component} from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css'
import testdata from './testdata';
import firebase from './firebase';

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
      walletData : {
        walletSaldo : 0.00,
        meze :  0.00,
        food : 0.00,
        varioussmall : 0.00,
        pharmacy : 0.00,
        animals : 0.00,
        gas : 0.0
      }
    }
    this.dbRef = firebase.firestore();
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.setWalletandCat = this.setWalletandCat.bind(this);
  }

  componentDidMount() {
    this.refData = this.dbRef.collection('data');
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

    this.refData.doc(newdata.id).set({newdata});  //tallentaa uuden tapahtuman Firebase-tietokantaan

   }

  setWalletandCat(catClass, catName, trsum) {
    // funktio Walletin saldon muuttamiseksi ja maksuluokan saldojen muuttamiseksi. 
    // Saa parametreina Treansactionista 
        //catClass (onko tapatuman hyvaksynyt lompakko vai maksuluokka)
        //catName (maksuluokan nimi (jos on wallet, tuottaa wallet__img))
        //trsum (siirrettava summa)

    //jos catClass on maksuluokka, niin vahentaa summan lompakosta ja lisaa maksuluokkaan
    //muuten lisaa Transactionista tulevan summan lompakoon
    
        
    let walletSaldo__old = parseFloat(this.state.walletData.walletSaldo);
    let catNameSaldo__old = parseFloat(this.state.walletData[catName]);

   
    if (catClass === "paymentcat__button" ) {
      this.setState({ 
        walletData: {
          ...this.state.walletData,
          walletSaldo : parseFloat( walletSaldo__old - trsum),
          [catName] : parseFloat(catNameSaldo__old + trsum)
        }
      });
    }
    else {
      this.setState({ 
        walletData: {
          ...this.state.walletData,
          walletSaldo : parseFloat( walletSaldo__old = trsum)
        }
      });
    }
  }
 
  render() {

    return (
      <>
        <Router>          
          <div className="App" >   
          <Header />         
            <Route path="/" exact render={() => 
              <Items onFormSubmit={this.handleFormSubmit} setWallet={this.setWalletandCat} walletData={this.state.walletData} />} />
              
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