/* Stats-funktio kasittelee App-luokasta tulevan data-taulukon
ja kutsuu ActionCardia kullekin alkiolle datan esittamiseksi.

*/

import React from 'react';


import ActionCard from '../ActionCard/ActionCard';
import Content from '../Content/Content';


import './Stats.css'


function Stats(props)   {

  
    let rows = props.data.map(action => {      //hakee ja tulostaa maksutapahtumat Appin data-muuttujasta
      return(
        <ActionCard data={action} key={action.id}  onDeleteItem={props.onDeleteItem} />
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
export default Stats; 