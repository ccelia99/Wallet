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
      data: testdata
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(newdata) {
    let storedata =  this.state.data.slice();
    storedata.push(newdata);
    this.setState({
        data: storedata
    });
  }

  render() {
    return (
      <>
        <Router>          
          <div className="App" >   
          <Header />         
            <Route path="/" exact render={() => <Items onFormSubmit={this.handleFormSubmit} />} />
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