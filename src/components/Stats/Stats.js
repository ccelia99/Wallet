import React, {Component} from 'react';

import ActionCard from '../ActionCard/ActionCard';
import Content from '../Content/Content';

import './Stats.css'


function Stats(props) {

  let rows = props.data.map(action => {
    return(
     <ActionCard data={action} key={action.id} />
    );
  }
);

  return (
    
      <div className="stats" >
        <h1> Transactions</h1>
          <Content>
            {rows}
          </Content>
         
        </div>
         
          
  );
}

 export default Stats; 