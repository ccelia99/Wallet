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
        this.props.onDeleteItem(this.state.data);     //siirretaan poistettava data Stats-tason kautta App:iin        
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
