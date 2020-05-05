import React, {Component} from 'react';

import ActionCard from '../ActionCard/ActionCard';
import Content from '../Content/Content';

import './Stats.css'


class Stats extends Component {

  constructor(props) {
    super(props);    
    this.state = {
          
    };
   
  }

 
  


  render() {
    let rows = this.props.data.map(action => {      //hakee ja tulostaa maksutapahtumat Appin data-muuttujasta
      return(
        <ActionCard data={action} key={action.id}  onDeleteItem={this.props.onDeleteItem} />
    )
    });

  return (

    <div className="stats" >
      <h2> Transactions</h2>
      <Content>
          {rows}
      </Content>
    </div>   
         
  );
}

}

export default Stats; 