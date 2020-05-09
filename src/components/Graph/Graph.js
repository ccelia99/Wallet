/*Graph-funtio laskee kunkin maksuluokan wallet mukaan luettuna yhteissumman
data-taulukosta ja piirtaa summista taulukon.

*/

import React from 'react';
import Content from '../Content/Content';

import {HorizontalBar} from 'react-chartjs-2';



function Graph(props) {
    
  const reducer = (groupedData, currentItem) => {
    const index = groupedData.findIndex(item => item.category === currentItem.category);

    if (index >= 0 ) {
      groupedData[index].sum = groupedData[index].sum + currentItem.sum;
    }
    else {
      groupedData.push({category: currentItem.category, sum: currentItem.sum});
    }    
  return groupedData;
  }

  let groupedData = props.data.reduce(reducer, []);
    
  const Horizontaldata = {
    labels: groupedData.map( item => item.category),
    datasets: [
      {
          label: "Money in various categories", 
          backgroundColor: [
          'rgb(59, 234, 56)',
          'rgb(219, 35, 38)',
          'rgb(35, 130, 219)',
          'rgb(137, 16, 177)',
          'rgb(58, 127, 150)',
          'rgb(234, 231, 56)',
          'rgb(47, 184, 44)'
        ],
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: groupedData.map(item => item.sum) 
      }
    ]
  }; 

      return (
        <Content>
          <div>
            <h1> Graph</h1>
            <div className='stats__graph'>
                <h2>Money set in wallet and spent in various categories</h2>
                <HorizontalBar data = {Horizontaldata}  />
              </div>
            </div>
        </Content>  
    ); 
    
 } 
  export default Graph; 