import React, {Component} from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css'
import firebase, {provider, auth}  from './firebase';

import Header from './components/Header/Header';
import Items from './components/Items/Items';
import Stats from './components/Stats/Stats';
import Graph from './components/Graph/Graph';
import Settings from './components/Settings/Settings';
import Menu from './components/Menu/Menu';
import Content from './components/Content/Content';
import Button from './components/buttons/';


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
    
        this.refData.orderBy("date", "desc").onSnapshot((docs) => {  //hakee datan DBsta ja jarjestaa sen uusin ensin
          let data = [];
          docs.forEach((doc) => {
            let docdata = doc.data();
            data.push(docdata);
          });
          this.setState({
            data: data
          });
        });
         
        this.refData2.get().then(snapshot => {
          snapshot.docs.forEach((doc) => {
            this.setState({
              walletData: {
                  ...this.state.walletData,
                  [doc.id]: doc.data().total
              }
            });
          });
        });
      }
    });
  }

  
  handleFormSubmit(newdata) {
    
    this.refData.doc(newdata.id).set(newdata);  //tallentaa uuden tapahtuman Firebase-tietokantaan

   }

  setWalletandCat(catClass, catName, sum) {

 /* funktio Walletin saldon muuttamiseksi ja maksuluokan saldojen muuttamiseksi. 
Saa parametreina Treansactionista 
 - catClass (onko tapatuman hyvaksynyt lompakko vai maksuluokka)
 - catName (maksuluokan nimi (jos on wallet, tuottaa wallet__img))
 - sum (siirrettava summa)
jos catClass on maksuluokka, niin vahentaa summan lompakosta ja lisaa maksuluokkaan,
muuten lisaa Transactionista tulevan summan lompakoon */

  
    
    let walletSaldo__old = parseFloat(this.state.walletData.walletSaldo);
    let catNameSaldo__old = parseFloat(this.state.walletData[catName]);
    
    if (catClass === "paymentcat__button" ) {       //onko tapahutma maksuluokka
      
      let total = parseFloat(catNameSaldo__old + sum);
      this.refData2.doc(catName).update({total});  //paivittaa ko. maksuluokan total-kentan Firebase-tietokantaan

      total =  parseFloat( walletSaldo__old - sum);
      this.refData2.doc('walletSaldo').update({total});  //paivittaa lompakon uuden summan total-kenttaan Firebase-tietokantaan

      this.setState({    
        walletData: {
            ...this.state.walletData,
            walletSaldo : parseFloat( total),
            [catName]: parseFloat(catNameSaldo__old + sum)
        }
      });

    }
    else {
      let total = parseFloat( walletSaldo__old + sum);
      this.refData2.doc('walletSaldo').update({total});  //paivittaa lompakon uuden summan total-kenttaan Firebase-tietokantaan   
      
      this.setState({    
        walletData: {
            ...this.state.walletData,
            walletSaldo : parseFloat( total)            
        }
      });
    }
  }

  handleDeleteItem(deldata) {
    let walletSaldo__old = parseFloat(this.state.walletData.walletSaldo);
    let catNameSaldo__old = parseFloat(this.state.walletData[deldata.category]);
    
    if (deldata.category === "wallet" ) {       //onko tapahutma maksuluokka
           
      let total =  parseFloat( walletSaldo__old - deldata.sum);
      this.refData2.doc('walletSaldo').update({total});  //paivittaa lompakon uuden summan total-kenttaan Firebase-tietokantaan

      this.setState({    
        walletData: {
            ...this.state.walletData,
            walletSaldo : parseFloat( total),
        }
      }); 

    }
    else {
      let total = parseFloat(catNameSaldo__old - deldata.sum);
      this.refData2.doc(deldata.category).update({total});  //paivittaa ko. maksuluokan total-kentan Firebase-tietokantaan

      let catSumNew = total;

      total = parseFloat( walletSaldo__old + deldata.sum);
      this.refData2.doc('walletSaldo').update({total});  //paivittaa lompakon uuden summan total-kenttaan Firebase-tietokantaan   
      
      this.setState({    
        walletData: {
            ...this.state.walletData,
            walletSaldo : parseFloat( total),
            [deldata.category] : parseFloat(catSumNew) 
        }
      });
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
         
      <>      
        <Router>       
          <div className="App" >   
          <Header />         
            <Route path="/" exact render={() => 
               <Items onFormSubmit={this.handleFormSubmit} setWallet={this.setWalletandCat} walletData={this.state.walletData}  />} />
              
            <Route path="/stats" render={() => <Stats data={this.state.data} onDeleteItem={this.handleDeleteItem} />} />
            <Route path="/graph" component={Graph} />
            <Route path="/settings" render={() => <Settings onLogout = {this.logout}
                                                user={this.state.user} /> } /> 
            <Menu /> 
          </div>
        </Router>             
      </>
    );
  }
}


export default App;