/*App-luokka sisaltaa state-muuttujat
 - data, johon tallennetaan maksutapahtuma taulukkoon edellisten jatkoksi
 - walletData, johon tallennetaan kukkaron ja eri maksutapahtumien kokonaissaldot
 - user kayttajatunnukselle, ja
 - error sisaankirjautumisen mahd. ongelmiin

 ComponentDidMount kay noutamassa kayttajan datan Firebasesta ja
 asettaa sen state-muuttujiin. Jos kayttajalla ei ole dataa olemassa
 walletSaldo-muuttuja alustetaan 0-arvoilla seka Appiin etta Firebaseen.

 handleFormSubmit(newdata)
 Funktio uuden maksutapahtuman tallentamiseksi Firebase-tietokantaan. 
 Saa parametrina Transactionista taulukon, jossa sum, date ja category.

setWalletandCat(catClass, catName, sum)
Funktio Walletin ja maksuluokan saldojen muuttamiseksi. 
Saa parametreina Transactionista 
 - catClass (onko tapatuman hyvaksynyt lompakko vai maksuluokka)
 - catName (maksuluokan nimi (jos on wallet, tuottaa wallet__img))
 - sum (siirrettava summa)
jos catClass on maksuluokka, niin vahentaa summan lompakosta ja lisaa maksuluokkaan,
muuten lisaa Transactionista tulevan summan lompakoon. 

handleDeleteItem(deldata)  
Funtio maksutapahtuman poistamiseksi.
Saa parametrina poistettavan datan tiedot Stats-funktion kautta ActionCard-luokasta.
Poistaa datasta maksutapahtuman id:n mukaisen rivin. 
Mikali category on wallet, vahentaa ko. summan walletista. Muuten lisaa summan walletiin ja 
vahentaa summan ko. maksuluokasta.

Login() ja logout() -funktiot kasittelemaan sisaan- ja uloskirjautmisia.

App-luokka renderoi Headerin, Contentin ja Menun. Contentin sisalle on sijoitettu
Transaction, Stats, Graph ja Settings.

*/

import React, {Component} from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css'
import firebase, {provider, auth}  from './firebase';

import Header from './components/Header/Header';
import Stats from './components/Stats/Stats';
import Graph from './components/Graph/Graph';
import Settings from './components/Settings/Settings';
import Menu from './components/Menu/Menu';
import Content from './components/Content/Content';
import Button from './components/buttons/';
import Transaction from './components/Transaction/Transaction';


class App extends Component {
  
  constructor(props) {    
    super(props);
    this.state = {
      data: [],
      walletData : [],
      user: null,
      error : null     
    }

    this.dbRef = firebase.firestore();
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.setWalletandCat = this.setWalletandCat.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);    
  }

  componentDidMount() {
    
    auth.onAuthStateChanged((user ) =>{
      if (user ) {
        this.setState({
          user : user
        });
        this.refData = this.dbRef.collection("users").doc(user.uid).collection('data');
        this.refData2 = this.dbRef.collection("users").doc(user.uid).collection('walletData');

        this.refData2.get().then(snapshot => { 
          
          
          if (snapshot.empty === false ) {
              snapshot.docs.forEach((doc) => {            
                this.setState({
                  walletData: {
                      ...this.state.walletData,
                      [doc.id]: doc.data().total
                  }
              });           
          });
        } 
        else {
          this.setState({
            walletData: {
              ...this.state.walletData, 
                walletSaldo : 0.00,
                meze :  0.00,
                food : 0.00,              
                varioussmall : 0.00,
                pharmacy : 0.00,
                animals : 0.00,
                gas : 0.00
            }
          });

          this.refData2.doc('walletSaldo').set({total : 0.00});
          this.refData2.doc('meze').set({total : 0.00});
          this.refData2.doc('food').set({total : 0.00});
          this.refData2.doc('varioussmall').set({total : 0.00});
          this.refData2.doc('pharmacy').set({total : 0.00});
          this.refData2.doc('animals').set({total : 0.00});
          this.refData2.doc('gas').set({total : 0.00});
        }
      });      
          
        this.refData.onSnapshot((docs) => {  //hakee datan DBsta
          let data = [];
          docs.forEach((doc) => {
            let docdata = doc.data();
            data.push(docdata);            
          });
          this.setState({
            data: data
          });
        });
      }
    });
  }
  
  
  handleFormSubmit(newdata) {
    
    this.refData.doc(newdata.id).set(newdata);  //tallentaa uuden tapahtuman Firebase-tietokantaan
  }

  setWalletandCat(catClass, catName, sum) { 
    
    let walletSaldo__old = parseFloat(this.state.walletData.walletSaldo);
    let catNameSaldo__old = parseFloat(this.state.walletData[catName]);
    
    if (catClass === "paymentcat__button" ) {       //onko tapahutma maksuluokka
      
      let total = parseFloat(catNameSaldo__old + sum);
      this.refData2.doc(catName).set({total});  //paivittaa ko. maksuluokan total-kentan Firebase-tietokantaan

      total =  parseFloat( walletSaldo__old - sum);
      this.refData2.doc('walletSaldo').set({total});  //paivittaa lompakon uuden summan Firebase-tietokantaan
                    
      this.setState({                     // paivittaa state-muuttujat 
        walletData: {
          ...this.state.walletData, 
            walletSaldo : walletSaldo__old - sum,   
            [catName] :  catNameSaldo__old + sum
        }
      });   
    }
    else {
      let total = parseFloat( walletSaldo__old + sum);  //maksuluokka on wallet
      this.refData2.doc('walletSaldo').set({total});  //paivittaa walletin uuden summan Firebase-tietokantaan 
      
      this.setState({                         // paivittaa state-muuttujat 
        walletData: {
          ...this.state.walletData, 
            walletSaldo : walletSaldo__old + sum 
        }
      });                   
    }
    
  }

  handleDeleteItem(deldata) {
    let walletSaldo__old = parseFloat(this.state.walletData.walletSaldo);
    let catNameSaldo__old = parseFloat(this.state.walletData[deldata.category]);
    
    if (deldata.category === "wallet" ) {       //maksuluokka on wallet
           
      let total =  parseFloat( walletSaldo__old - deldata.sum);
      this.refData2.doc('walletSaldo').set({total});  //paivittaa walletin total-kentan Firebase-tietokantaan
    }

    else {
      let total = parseFloat(catNameSaldo__old - deldata.sum);
      this.refData2.doc(deldata.category).set({total});  //paivittaa ko. maksuluokan total-kentan Firebase-tietokantaan

      total = parseFloat( walletSaldo__old + deldata.sum);
      this.refData2.doc('walletSaldo').set({total});  //paivittaa walletin total-kentan Firebase-tietokantaan      
    }
    this.refData.doc(deldata.id).delete().then().catch(error => {console.error("Virhe tietoa pistettaessa: ", error)});   
  }
  
  login() {
    auth.signInWithPopup(provider).then((result) => {
      const user = result.user;
      this.setState({
        user : user,
        error : null
      });
    }).catch((error) => {
      // Handle Errors here.
       const errorMessage = error.message;
       this.setState({
         error: errorMessage
       })
    });
  }

  logout() {
    auth.signOut().then(() =>  {
      this.setState({
        user : null
      });
      this.refData = null;
      this.refData2 = null;
      // Sign-out successful.
   });
  }
 
  render() {
   
    if (!this.state.user) {
      return (
        <Router>
          <div className="App" >   
          <Header /> 
            <Content>
              <p>You have not sign in yet!</p>
              <p><Button primary onClick={this.login} >Sign in</Button></p>
              {this.state.error?<p>{this.state.error}</p>:null}
            </Content>
            <Menu />
          </div>
        </Router>

      );
    }


    return (
         
      <div>      
        <Router>       
          <div className="App" >   
          <Header />    
          <Content>    
            <Route path="/" exact render={() => 
              <Transaction onFormSubmit={this.handleFormSubmit} setWallet={this.setWalletandCat} walletData={this.state.walletData}  />} />              
            <Route path="/stats" render={() => <Stats data={this.state.data} onDeleteItem={this.handleDeleteItem} />} />
            <Route path="/graph" render={() => <Graph data={this.state.data} />} />
            <Route path="/settings" render={() => <Settings onLogout = {this.logout}
                                                user={this.state.user} /> } /> 
            </Content> 
            <Menu /> 
          </div>
        </Router>             
      </div>
    );
  }
}


export default App;