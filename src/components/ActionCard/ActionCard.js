/*ActionCard esittaa Stats-luokasta tulevan alkion
riveina summa, paivamaara ja maksuluokka.

handleDeleteItem(event) 
lahettaa poistettavan data-alkion tidot Stats-tason kautta App:iin
*/

import React, { Component } from 'react';
import './ActionCard.css';


class ActionCard extends Component {
    constructor(props) {
        super(props);    
        this.state = {
            data: props.data               
        };
        this.handleDeleteItem = this.handleDeleteItem.bind(this);          
      }     
    
    handleDeleteItem(event) {
        event.preventDefault();
        this.props.onDeleteItem(this.state.data);             
    }

    render() {
        return(
            <div className="actionCard" >
                <div className="actionCard__row">
                    <div className="actionCard__sum" >{this.state.data.sum.toFixed(2)}</div>
                    <div className="actionCard__date" >{this.state.data.date}</div>
                    <div className="actionCard__category" >{this.state.data.category}</div>
                    <button className="actionCard__delete" onClick={this.handleDeleteItem}>X</button>                   
                </div>
        </div>
        );
    }
}

export default ActionCard;
